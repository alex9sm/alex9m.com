<script>
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import ZoomImage from '$lib/components/ZoomImage.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import { SITE_URL } from '$lib/seo';

  let visible = false;
  onMount(() => { visible = true; });

  // Images live in static/vulkan/ and are served from the site root (/vulkan/...).
  // Drop your 4 files in there named 1–4. Change the extension here if they aren't .jpg.
  const gallery = [
    { src: '/vulkan/1.jpg', alt: 'Vulkan renderer screenshot 1' },
    { src: '/vulkan/2.jpg', alt: 'Vulkan renderer screenshot 2' },
    { src: '/vulkan/3.jpg', alt: 'Vulkan renderer screenshot 3' },
    { src: '/vulkan/5.jpg', alt: 'Vulkan renderer screenshot 4' },
  ];
</script>

<!-- A render from the project makes a stronger card here than the generic site image. -->
<Seo type="article" image="{SITE_URL}/vulkan/1.jpg" imageWidth={1745} imageHeight={951} />

{#if visible}
  <article class="max-w-4xl mx-auto px-5 md:px-8 py-16 md:py-24" transition:fade={{ duration: 500 }}>

    <a href="/" class="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors mb-12">
      <Icon name="arrow-left" size={14} />
      Back to home
    </a>

    <header class="mb-12">
      <p class="eyebrow mb-4">Winter/2025 - Now</p>
      <h1 class="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900">
        Vulkan Renderer
      </h1>
      <div class="flex flex-wrap gap-2 mt-6">
        {#each ['C++', 'Vulkan', 'GLSL'] as tag}
          <span class="font-mono text-[0.65rem] px-2 py-1 rounded-md bg-black/[0.03] border border-black/10 text-zinc-600">{tag}</span>
        {/each}
        <span class="font-mono text-[0.65rem] px-2 py-1 rounded-md bg-black/[0.03] border border-black/10 text-accent-soft">In progress</span>
      </div>
    </header>

    <!-- Gallery grid -->
    <div class="grid grid-cols-2 gap-4 mb-16">
      {#each gallery as item}
        <ZoomImage
          src={item.src}
          alt={item.alt}
          class="glass rounded-xl aspect-video w-full object-cover"
        />
      {/each}
    </div>

    <!-- Text sections (empty stubs to populate) -->
    <div class="space-y-14 text-[1.05rem] leading-relaxed text-zinc-700">
      <section>
        <h2 class="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4">Overview</h2>
        <p class="text-zinc-800">The goal of this renderer is to make a highly performant, fast compiling, cross-platform game renderer written in C++ and using the VulkanSDK.</p>
      </section>

      <section>
        <h2 class="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4">Features</h2>
        <ul class="space-y-2 list-disc pl-5 marker:text-zinc-800 text-zinc-800">
          <li>Full PBR materials</li>
          <li>Cascaded shadow maps</li>
          <li>Image based lighting</li>
          <li>Cubemap reflections</li>
          <li>glTF model loading</li>
          <li>FPS style camera</li>
        </ul>
      </section>

      <section>
        <h2 class="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4">Architecture</h2>
        <ul class="space-y-2 list-disc pl-5 marker:text-zinc-800 text-zinc-800">
          <li>Data oriented design for runtime performance</li>
          <li>Explicit memory management over RAII</li>
          <li>Custom core library in place of the std/STL</li>
          <li>Precompiled headers for heavy includes</li>
          <li>Dedicated platform layer abstracting the Win32 API, with room for future platforms</li>
          <li>Renderer decoupled from game and scene specific code for a clean, reusable API</li>
        </ul>
      </section>

      <section>
        <h2 class="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4">Challenges &amp; Learnings</h2>
        <p class="text-zinc-800 ">The most challenging part came at the very start. Learning the intricacies and naming conventions of the win32 API took some time,
          but I was able to overcome it by starting small, writing only what I needed and building on it as I went.
        </p>
        <p class="text-zinc-800 mt-5">Shifting from an OOP mindset to data oriented design and cache first mindset was a real learning curve. Instead of modeling everything as objects, I had to
          start thinking in terms of how data moves through the program, which changed how I approached C++ as a whole.
        </p>
      </section>
    </div>
  </article>
{/if}
