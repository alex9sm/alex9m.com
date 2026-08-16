<script>
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import { PAGES } from '$lib/seo';

  let visible = false;
  onMount(() => { visible = true; });

  $: status = $page.status;
  $: isNotFound = status === 404;
  $: heading = isNotFound ? 'Page not found' : 'Something broke';
  $: blurb = isNotFound
    ? "That URL doesn't point anywhere on this site. It may have moved, or it may never have existed."
    : ($page.error?.message ?? 'An unexpected error occurred on the server.');

  // Offer the real routes as a way out, minus the home link already in the CTA.
  $: suggestions = PAGES.filter((p) => p.path !== '/');
</script>

<Seo title="{status} — {heading}" description={blurb} noindex />

{#if visible}
  <div class="max-w-3xl mx-auto px-5 md:px-8 min-h-[70vh] flex flex-col justify-center py-20" transition:fade={{ duration: 500 }}>

    <p class="eyebrow mb-4">Error {status}</p>

    <h1 class="text-5xl md:text-6xl font-bold tracking-tight text-zinc-900">
      {heading}
    </h1>

    <p class="mt-6 text-lg leading-relaxed text-zinc-600 max-w-xl">
      {blurb}
    </p>

    <a
      href="/"
      class="inline-flex items-center gap-2 mt-10 text-sm text-zinc-600 hover:text-zinc-900 transition-colors self-start"
    >
      <Icon name="arrow-left" size={14} />
      Back to home
    </a>

    {#if isNotFound && suggestions.length}
      <hr class="hairline my-12" />
      <p class="eyebrow mb-5">Try one of these</p>
      <div class="grid sm:grid-cols-2 gap-3">
        {#each suggestions as item}
          <a href={item.path} class="glass glass-hover group rounded-xl p-4 flex items-center justify-between gap-4">
            <span class="text-sm text-zinc-900">{item.title}</span>
            <span class="text-zinc-500 group-hover:text-accent-soft transition-colors">
              <Icon name="arrow-right" size={14} class="transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </a>
        {/each}
      </div>
    {/if}
  </div>
{/if}
