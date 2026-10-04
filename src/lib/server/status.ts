// Footer stats. Runs only on the server: the Cloudflare token and the LAN
// address of stats-server never reach the browser, only the three numbers do.

import { env } from '$env/dynamic/private';

export type SiteStats = {
	/** Seconds since the node booted, or null if stats-server is unreachable. */
	uptime: number | null;
	/** Sum of daily uniques over 30 days, so a visitor on two days counts twice. */
	visitors: number | null;
	requests: number | null;
};

type Traffic = { visitors: number; requests: number };
type Slot<T> = { at: number; value: T | null } | null;

const TRAFFIC_TTL_MS = 5 * 60 * 1000;
const UPTIME_TTL_MS = 30 * 1000;

let trafficCache: Slot<Traffic> = null;
let uptimeCache: Slot<number> = null;

const TRAFFIC_QUERY = `
query ($zone: string!, $since: Date!, $until: Date!) {
  viewer {
    zones(filter: { zoneTag: $zone }) {
      httpRequests1dGroups(limit: 31, filter: { date_geq: $since, date_leq: $until }) {
        sum { requests }
        uniq { uniques }
      }
    }
  }
}`;

const isoDate = (d: Date) => d.toISOString().slice(0, 10);

async function fetchTraffic(): Promise<Traffic | null> {
	const token = env.CF_API_TOKEN;
	const zone = env.CF_ZONE_ID;
	if (!token || !zone) return null;

	const until = new Date();
	const since = new Date(until.getTime() - 29 * 24 * 60 * 60 * 1000);

	const res = await fetch('https://api.cloudflare.com/client/v4/graphql', {
		method: 'POST',
		headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: TRAFFIC_QUERY,
			variables: { zone, since: isoDate(since), until: isoDate(until) }
		}),
		signal: AbortSignal.timeout(5000)
	});
	if (!res.ok) throw new Error(`cloudflare ${res.status}`);

	const json = await res.json();
	if (json.errors?.length) throw new Error(`cloudflare: ${json.errors[0].message}`);

	const days: { sum: { requests: number }; uniq: { uniques: number } }[] =
		json.data?.viewer?.zones?.[0]?.httpRequests1dGroups ?? [];

	return {
		visitors: days.reduce((n, d) => n + d.uniq.uniques, 0),
		requests: days.reduce((n, d) => n + d.sum.requests, 0)
	};
}

async function fetchUptime(): Promise<number | null> {
	const base = env.STATS_SERVER_URL;
	if (!base) return null;

	// stats-server ticks every 5s and leaves the newest sample out of the range,
	// so a one-minute window always has a recent row in it.
	const to = Date.now();
	const from = to - 60_000;
	const res = await fetch(`${base}/query_range?from=${from}&to=${to}&step=0`, {
		signal: AbortSignal.timeout(2000)
	});
	if (!res.ok) throw new Error(`stats-server ${res.status}`);

	const rows: { time: number; uptime: number }[] = await res.json();
	const last = rows.at(-1);
	if (!last) return null;

	// Account for the time between that sample and now.
	return last.uptime + (to - last.time) / 1000;
}

async function cached<T>(
	slot: Slot<T>,
	ttl: number,
	load: () => Promise<T | null>,
	save: (s: Slot<T>) => void
): Promise<T | null> {
	if (slot && Date.now() - slot.at < ttl) return slot.value;
	try {
		const value = await load();
		save({ at: Date.now(), value });
		return value;
	} catch (err) {
		console.error('[stats]', err);
		// Keep the last good value, but stamp it so a dead source isn't retried
		// on every request.
		save({ at: Date.now(), value: slot?.value ?? null });
		return slot?.value ?? null;
	}
}

export async function getSiteStats(): Promise<SiteStats> {
	const [traffic, uptime] = await Promise.all([
		cached(trafficCache, TRAFFIC_TTL_MS, fetchTraffic, (s) => (trafficCache = s)),
		cached(uptimeCache, UPTIME_TTL_MS, fetchUptime, (s) => (uptimeCache = s))
	]);
	return {
		uptime,
		visitors: traffic?.visitors ?? null,
		requests: traffic?.requests ?? null
	};
}
