<script>
  import { onMount, tick } from 'svelte';
  import { fade } from 'svelte/transition';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import { PROJECTS } from '$lib/projects';

  let visible = false;
  let showArrow = true;

  onMount(() => {
    visible = true;

    // The page body only mounts once `visible` flips, so a browser arriving on
    // /#projects has nothing to scroll to yet and gives up. Re-run the jump
    // ourselves after the section is in the DOM.
    tick().then(() => {
      if (location.hash !== '#projects') return;
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    });

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

      <h1 class="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900" transition:fade={{ delay: 200, duration: 900 }}>
        Hello, I'm <span class="accent-glow">Alex</span>.
      </h1>

      <div class="flex items-center gap-2 mt-6 text-lg md:text-2xl text-zinc-600" transition:fade={{ delay: 500, duration: 900 }}>
        <span>I'm a</span>
        <div class="role-viewport">
          <div class="role-track font-medium text-zinc-900">
            <span>student</span>
            <span>reverse engineer</span>
            <span>software engineer</span>
            <span>business owner</span>
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
          <span
            class="text-zinc-400 hover:text-zinc-900 cursor-pointer transition-colors"
            on:click={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <Icon name="arrow-down" size={28} />
          </span>
        </div>
      {/if}
    </section>

    <!-- About -->
    <section class="py-20 md:py-28">
      <hr class="hairline mb-20" />
      <div class="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16">
        <p class="eyebrow pt-2">About</p>
        <div class="max-w-2xl space-y-5 text-lg leading-relaxed text-zinc-700">
          <p>
            I'm a student and engineer who likes building impressive things that make an impact. I've never stepped down from a challenge and I set my goals high, because I want to see the things I make solve real problems for people.
          </p>
          <p>
            I discovered my love for technology growing up with game modding and hacking, from jailbreaking a PS3 to contributing to open source projects for game decompiling. From there my interests branched into reverse engineering, cybersecurity, and low level systems programming.
          </p>
          <p>
            When I'm not working or learning something new related to my field, I enjoy boxing, reading, and writing short stories.
          </p>
        </div>
      </div>
    </section>

    <section class="pb-20">
      <div class="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16">
        <p class="eyebrow pt-2">Currently reading</p>
        <div class="max-w-2xl space-y-5 text-lg leading-relaxed text-zinc-700">
          <p>
            <i>Reverse-Engineering</i> - mytechnotalent
          </p>
          <p>
            <i>Storm of Steel</i> - Ernst Junger
          </p>
        </div>
      </div>
    </section>

    <!-- Projects -->
    <section id="projects" class="py-10 scroll-mt-24">
      <div class="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16">
        <p class="eyebrow pt-2">Projects</p>
        <div class="grid sm:grid-cols-2 gap-5">
          {#each PROJECTS as project}
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
