import { PAGES, SITE_URL } from '$lib/seo';
import type { RequestHandler } from './$types';

// Generated from the PAGES list rather than hand-maintained, so adding a route
// to src/lib/seo.ts is all it takes to get it indexed.
export const prerender = true;

export const GET: RequestHandler = async () => {
	const lastmod = new Date().toISOString().split('T')[0];

	const urls = PAGES.map(
		(p) => `	<url>
		<loc>${SITE_URL}${p.path === '/' ? '/' : p.path}</loc>
		<lastmod>${lastmod}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>${p.priority.toFixed(1)}</priority>
	</url>`
	).join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
