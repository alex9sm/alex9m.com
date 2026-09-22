// Single source of truth for site-wide metadata. Consumed by <Seo>, the
// sitemap endpoint, and robots.txt so they can never drift out of sync.

export const SITE_URL = 'https://alex9m.com';
export const SITE_NAME = 'Alex';
export const SITE_TAGLINE = 'My website';

// 1200x630 social card. Absolute URLs are required here — crawlers do not
// resolve relative paths in og:image / twitter:image.
export const OG_IMAGE = `${SITE_URL}/og.png`;

export const EMAIL = 'work@alex9m.com';

/** Shared by the TopBar and Footer so the two link sets can't drift apart. */
export const SOCIALS = [
	{ href: 'https://github.com/alex9sm', icon: 'github', label: 'GitHub' }
] as const;

export type PageMeta = {
	path: string;
	title: string;
	description: string;
	/** Sitemap priority, 0.0–1.0. Home is the entry point, writeups sit below it. */
	priority: number;
};

export const PAGES: PageMeta[] = [
	{
		path: '/',
		title: 'Alex',
		description:
			'I like systems software and reverse engineering',
		priority: 1.0
	},
	{
		path: '/stats-server',
		title: 'Stats Server',
		description:
			'A C++ monitoring daemon for Proxmox nodes.',
		priority: 0.8
	},
	{
		path: '/tradingbot',
		title: 'Arbitrage Trading Bot',
		description:
			'A reverse split arbitrage trading bot.',
		priority: 0.8
	},
	{
		path: '/vulkan',
		title: 'Vulkan Renderer',
		description:
			'A real-time renderer built from scratch on the Vulkan SDK in C++.',
		priority: 0.8
	},
	{
		path: '/cs2-esp',
		title: 'CS2 Kernel Driver ESP',
		description:
			'CS2 kernel driver ESP',
		priority: 0.8
	}
];

/** Look up metadata for a route, falling back to site defaults for unknown paths. */
export function metaFor(pathname: string): Omit<PageMeta, 'priority'> {
	const match = PAGES.find((p) => p.path === pathname);
	if (match) return match;
	return {
		path: pathname,
		title: SITE_NAME,
		description: SITE_TAGLINE
	};
}
