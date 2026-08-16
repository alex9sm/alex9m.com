<script>
    import Main from "$lib/components/Main.svelte";
    import Seo from "$lib/components/Seo.svelte";
    import { SITE_URL, SITE_NAME, SOCIALS, metaFor } from "$lib/seo";

    // Person schema so search engines can associate the site with a real
    // identity and link the profiles together.
    const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: SITE_NAME,
        url: SITE_URL,
        description: metaFor('/').description,
        sameAs: SOCIALS.map((s) => s.href),
    };
</script>

<Seo />

<svelte:head>
    {@html `<script type="application/ld+json">${JSON.stringify(personSchema)}<\/script>`}
</svelte:head>

<Main/>
