<script lang="ts">
  export let href: string;
  export let title: string;
  export let description: string;
  export let tags: string[] = [];
  export let status: string = '';
</script>

<a
  {href}
  class="glass glass-hover group relative flex flex-col rounded-2xl p-6 h-full overflow-hidden"
>
  {#if status}
    <div class="flex justify-end mb-4">
      <span class="eyebrow !text-[0.6rem] text-zinc-500">{status}</span>
    </div>
  {/if}

  <h3 class="text-lg font-semibold text-zinc-100 mb-2 group-hover:text-white transition-colors">
    {title}
  </h3>
  <p class="text-sm leading-relaxed text-zinc-400 flex-1">
    {description}
  </p>

  {#if tags.length}
    <div class="flex flex-wrap gap-2 mt-5">
      {#each tags as tag}
        <span class="font-mono text-[0.65rem] px-2 py-1 rounded-md bg-white/[0.03] border border-white/10 text-zinc-400">
          {tag}
        </span>
      {/each}
    </div>
  {/if}

  <div class="flex items-center gap-2 mt-5 text-sm text-zinc-500 group-hover:text-accent-soft transition-colors">
    <span>View writeup</span>
    <i class="fa-solid fa-arrow-right text-xs transition-transform duration-200 group-hover:translate-x-1"></i>
  </div>
</a>
