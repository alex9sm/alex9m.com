<script>
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';

  let visible = false;
  onMount(() => { visible = true; });

  // TODO: populate with real media. Each item can later become an <img>, <video>, or embed.
  const gallery = [
    { label: 'Screenshot / clip 1' },
    { label: 'Screenshot / clip 2' },
    { label: 'Screenshot / clip 3' },
    { label: 'Screenshot / clip 4' },
  ];
</script>

{#if visible}
  <article class="max-w-4xl mx-auto px-5 md:px-8 py-16 md:py-24" transition:fade={{ duration: 500 }}>

    <a href="/" class="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors mb-12">
      <i class="fa-solid fa-arrow-left text-xs"></i>
      Back to home
    </a>

    <header class="mb-12">
      <p class="eyebrow mb-4">Writeup &mdash; Graphics</p>
      <h1 class="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100">
        Vulkan Renderer
      </h1>
      <div class="flex flex-wrap gap-2 mt-6">
        {#each ['C++', 'Vulkan', 'GLSL'] as tag}
          <span class="font-mono text-[0.65rem] px-2 py-1 rounded-md bg-white/[0.03] border border-white/10 text-zinc-400">{tag}</span>
        {/each}
        <span class="font-mono text-[0.65rem] px-2 py-1 rounded-md bg-white/[0.03] border border-white/10 text-accent-soft">In progress</span>
      </div>
    </header>

    <!-- Hero media slot -->
    <div class="glass rounded-2xl aspect-video flex flex-col items-center justify-center text-center gap-3 mb-6">
      <i class="fa-solid fa-image text-3xl text-zinc-600"></i>
      <p class="text-sm text-zinc-500">Hero render / demo reel</p>
      <p class="font-mono text-[0.65rem] text-zinc-600">replace this slot with an image or video</p>
    </div>

    <!-- Gallery grid -->
    <div class="grid grid-cols-2 gap-4 mb-16">
      {#each gallery as item}
        <div class="glass rounded-xl aspect-video flex flex-col items-center justify-center gap-2 text-center">
          <i class="fa-solid fa-plus text-xl text-zinc-600"></i>
          <p class="font-mono text-[0.65rem] text-zinc-600">{item.label}</p>
        </div>
      {/each}
    </div>

    <!-- Text sections (empty stubs to populate) -->
    <div class="space-y-14 text-[1.05rem] leading-relaxed text-zinc-300">
      <section>
        <h2 class="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4">Overview</h2>
        <p class="text-zinc-600 italic">Coming soon &mdash; a short summary of the renderer and its goals.</p>
      </section>

      <section>
        <h2 class="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4">Features</h2>
        <p class="text-zinc-600 italic">Coming soon &mdash; list the rendering features and techniques implemented.</p>
      </section>

      <section>
        <h2 class="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4">Architecture</h2>
        <p class="text-zinc-600 italic">Coming soon &mdash; describe the pipeline, abstractions, and design decisions.</p>
      </section>

      <section>
        <h2 class="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4">Challenges &amp; Learnings</h2>
        <p class="text-zinc-600 italic">Coming soon &mdash; notes on the hard parts and what you took away.</p>
      </section>
    </div>
  </article>
{/if}
