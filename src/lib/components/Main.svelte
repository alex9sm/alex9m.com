<script>
  import { onMount, tick } from 'svelte';
  import { fade } from 'svelte/transition';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import { PROJECTS } from '$lib/projects';

  let visible = false;

  onMount(() => {
    visible = true;

    // The page body only mounts once `visible` flips, so a browser arriving on
    // /#projects has nothing to scroll to yet and gives up. Re-run the jump
    // ourselves after the section is in the DOM.
    tick().then(() => {
      if (location.hash !== '#projects') return;
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
</script>

{#if visible}
  <div class="max-w-3xl mx-auto px-6 md:px-12">

    <!-- Hero -->
    <section class="pt-16 md:pt-24 pb-12 md:pb-16" transition:fade={{ duration: 800 }}>

      <h1 class="text-3xl md:text-4xl font-bold tracking-tight text-stone-50" transition:fade={{ delay: 200, duration: 900 }}>
        Hello, I'm <span class="accent-glow">Alex</span>.
      </h1>

      <div class="flex items-center gap-2 mt-5 text-lg md:text-2xl text-stone-300" transition:fade={{ delay: 500, duration: 900 }}>
        <span>I'm a</span>
        <div class="role-viewport">
          <div class="role-track font-medium text-stone-50">
            <span>student</span>
            <span>reverse engineer</span>
            <span>software developer</span>
            <span>business owner</span>
            <span>student</span>
          </div>
        </div>
      </div>
    </section>

    <hr class="hairline" />

    <!-- About -->
    <section class="py-12 md:py-14">
      <h2 class="eyebrow mb-6">About</h2>
      <div class="space-y-5 text-[1.05rem] leading-snug text-stone-200">
        <p>
          I'm a student and engineer who likes building impressive things that make an impact. I've never stepped down from a challenge and I set my goals high, because I want to see the things I make solve real problems for people.
        </p>
        <p>
          I discovered my love for technology growing up with game modding and hacking, from jailbreaking my PS3 to contributing to 
          open source projects for game decompiling. From there my interests branched into reverse engineering, cybersecurity, and 
          low level systems programming. My current interests include learning the Windows kernel and CUDA.
        </p>
        <p>
          When I'm not working or self teaching something new, I enjoy boxing, reading, and writing short stories.
        </p>
      </div>
    </section>

    <section class="pb-12 md:pb-14">
      <h2 class="eyebrow mb-6">Currently reading</h2>
      <ul class="space-y-3 text-[1.05rem] leading-snug text-stone-200">
        <li><i>Reverse-Engineering</i> - mytechnotalent</li>
        <li><i>The Theory of Moral Sentiments</i> - Adam Smith</li>
      </ul>
    </section>

    <!-- Projects -->
    <section id="projects" class="pb-4 scroll-mt-24">
      <h2 class="eyebrow mb-6">Projects</h2>
      <div class="flex flex-col gap-5">
        {#each PROJECTS as project}
          <ProjectCard {...project} />
        {/each}
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
