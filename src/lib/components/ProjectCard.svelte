<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';

  export let href: string;
  export let title: string;
  export let description: string;
  export let tags: string[] = [];
  export let status: string = '';
  export let repo: string = '';
</script>

<!-- The card is a <div> rather than an <a> so the repo link can live inside it;
     an anchor stretched over the card carries the click for everything else. -->
<div
  class="glass glass-hover group relative flex flex-col rounded-2xl p-6 h-full overflow-hidden"
>
  <a {href} class="absolute inset-0 z-0" aria-label={title}></a>

  {#if status || repo}
    <div class="flex items-center justify-between mb-4">
      {#if repo}
        <a
          href={repo}
          target="_blank"
          rel="noreferrer"
          aria-label="{title} on GitHub"
          class="relative z-10 -m-1 p-1 text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          <Icon name="github" size={15} />
        </a>
      {:else}
        <span></span>
      {/if}
      {#if status}
        <span class="eyebrow !text-[0.6rem] text-zinc-500">{status}</span>
      {/if}
    </div>
  {/if}

  <h3 class="text-lg font-semibold text-zinc-900 mb-2 group-hover:text-zinc-900 transition-colors">
    {title}
  </h3>
  <p class="text-sm leading-relaxed text-zinc-600 flex-1">
    {description}
  </p>

  {#if tags.length}
    <div class="flex flex-wrap gap-2 mt-5">
      {#each tags as tag}
        <span class="font-mono text-[0.65rem] px-2 py-1 rounded-md bg-black/[0.03] border border-black/10 text-zinc-600">
          {tag}
        </span>
      {/each}
    </div>
  {/if}

  <div class="flex items-center gap-2 mt-5 text-sm text-zinc-500 group-hover:text-accent-soft transition-colors">
    <span>View writeup</span>
    <Icon name="arrow-right" size={14} class="transition-transform duration-200 group-hover:translate-x-1" />
  </div>
</div>
