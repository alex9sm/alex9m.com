<script lang="ts">
	import { page } from '$app/stores';
	import { SITE_URL, SITE_NAME, OG_IMAGE, metaFor } from '$lib/seo';

	/** Override the title from src/lib/seo.ts. Leave unset to use the route's entry. */
	export let title: string | undefined = undefined;
	export let description: string | undefined = undefined;
	/** 'article' for project writeups, 'website' for everything else. */
	export let type: 'website' | 'article' = 'website';
	export let image: string = OG_IMAGE;
	/** Dimensions of `image`. Crawlers render the card faster when these are declared. */
	export let imageWidth: number = 1200;
	export let imageHeight: number = 630;
	/** Set on 404s so search engines drop the page instead of indexing an error. */
	export let noindex = false;

	$: fallback = metaFor($page.url.pathname);
	$: resolvedTitle = title ?? fallback.title;
	$: resolvedDescription = description ?? fallback.description;

	// Canonical URLs are built from the site constant rather than $page.url so
	// that requests arriving on an IP, a preview host, or with tracking params
	// all collapse to one indexable address.
	$: canonical = new URL($page.url.pathname, SITE_URL).href;
</script>

<svelte:head>
	<title>{resolvedTitle}</title>
	<meta name="description" content={resolvedDescription} />
	<link rel="canonical" href={canonical} />
	{#if noindex}
		<meta name="robots" content="noindex, follow" />
	{/if}

	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:title" content={resolvedTitle} />
	<meta property="og:description" content={resolvedDescription} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content={String(imageWidth)} />
	<meta property="og:image:height" content={String(imageHeight)} />
	<meta property="og:image:alt" content="alex9m.com — {SITE_NAME}" />
	<meta property="og:locale" content="en_US" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={resolvedTitle} />
	<meta name="twitter:description" content={resolvedDescription} />
	<meta name="twitter:image" content={image} />
</svelte:head>
