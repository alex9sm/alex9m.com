<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import ProjectCard from '$lib/components/ProjectCard.svelte';

  let visible = false;
  let showArrow = true;

  const projects = [
    {
      href: '/tradingbot',
      title: 'Arbitrage Trading Bot',
      description:
        'Automated pipeline that webscrapes SEC filings and applies NLP to surface reverse split arbitrage opportunities across multiple brokerages.',
      tags: ['Python', 'OpenAI', 'Discord API', 'Brokerage APIs'],
      status: 'Writeup',
    },
    {
      href: '/vulkan',
      title: 'Vulkan Renderer',
      description:
        'A real-time renderer built from the ground up on the VulkanSDK. Exploring low-level GPU programming and modern rendering techniques.',
      tags: ['C++', 'Vulkan', 'GLSL'],
      status: 'In progress',
    },
  ];

  onMount(() => {
    visible = true;
    const handleScroll = () => {
      showArrow = window.scrollY === 0;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

{#if visible}
  <div class="max-w-6xl mx-auto px-5 md:px-8">

    <!-- Hero -->
    <section class="min-h-[78vh] flex flex-col justify-center" transition:fade={{ duration: 800 }}>
      <p class="eyebrow mb-6" transition:fade={{ delay: 150, duration: 800 }}>Portfolio</p>

      <h1 class="text-5xl md:text-7xl font-bold tracking-tight text-zinc-100" transition:fade={{ delay: 200, duration: 900 }}>
        Hello, I'm <span class="accent-glow">Alex</span>.
      </h1>

      <div class="flex items-center gap-2 mt-6 text-lg md:text-2xl text-zinc-400" transition:fade={{ delay: 500, duration: 900 }}>
        <span>I'm a</span>
        <div class="role-viewport">
          <div class="role-track font-medium text-zinc-100">
            <span>student</span>
            <span>business owner</span>
            <span>software engineer</span>
            <span>cybersecurity enthusiast</span>
            <span>student</span>
          </div>
        </div>
      </div>

      {#if showArrow}
        <div
          class="fixed bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          transition:fade={{ duration: 200 }}
        >
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <svg
            xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="text-zinc-500 hover:text-zinc-200 cursor-pointer transition-colors"
            on:click={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      {/if}
    </section>

    <!-- About -->
    <section class="py-20 md:py-28">
      <hr class="hairline mb-20" />
      <div class="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16">
        <p class="eyebrow pt-2">About</p>
        <div class="max-w-2xl space-y-5 text-lg leading-relaxed text-zinc-300">
          <p>
            I'm a student and engineer who likes building impressive things that make an impact. I've never stepped down from a challenge and I set my goals high, because I want to see the things I make solve real problems for people.
          </p>
        </div>
      </div>
    </section>

    <!-- Projects -->
    <section class="pb-10">
      <div class="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16">
        <p class="eyebrow pt-2">Projects</p>
        <div class="grid sm:grid-cols-2 gap-5">
          {#each projects as project}
            <ProjectCard {...project} />
          {/each}
        </div>
      </div>
    </section>

  </div>
{/if}

<style>
  /* Sizes are in em so the rotation scales with the surrounding font-size
     (text-lg on mobile, md:text-2xl on desktop) without recalculating heights. */
  .role-viewport {
    height: 1.5em;
    line-height: 1.5em;
    overflow: hidden;
  }

  .role-track {
    display: flex;
    flex-direction: column;
    animation: role_roll 12s ease-in-out infinite;
  }

  .role-track :global(span) {
    display: block;
    height: 1.5em;
    line-height: 1.5em;
    flex: none;
  }

  @keyframes role_roll {
    0%, 15%   { transform: translateY(0); }
    25%, 40%  { transform: translateY(-1.5em); }
    50%, 65%  { transform: translateY(-3em); }
    75%, 90%  { transform: translateY(-4.5em); }
    100%      { transform: translateY(-6em); }
  }

  /* This carousel is a small branding flourish, so it spins even when the
     global reduced-motion override (in app.css) is active. The scoped class
     outranks the universal selector, so !important here takes precedence. */
  @media (prefers-reduced-motion: reduce) {
    .role-track {
      animation: role_roll 12s ease-in-out infinite !important;
    }
  }
</style>
