import { getSiteStats } from '$lib/server/status';

// Feeds the footer stats on every page. Both sources are cached in
// $lib/server/status, so this costs nothing on most requests.
export const load = async () => ({ stats: await getSiteStats() });
