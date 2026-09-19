<script>
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import ZoomImage from '$lib/components/ZoomImage.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Seo from '$lib/components/Seo.svelte';

  let visible = false;
  onMount(() => { visible = true; });

  const REPO = 'https://github.com/alex9sm/cs2-external';

</script>

<!-- Once a real screenshot replaces /cs2-esp/1.jpg it can become the social card,
     the way /stats-server passes image/imageWidth/imageHeight to Seo. Until then the
     site-wide og image is the better card. -->
<Seo type="article" />

{#if visible}
  <article class="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-24" transition:fade={{ duration: 500 }}>

    <a href="/#projects" class="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors mb-12">
      <Icon name="arrow-left" size={14} />
      Back to projects
    </a>

    <header class="mb-14">
      <p class="eyebrow mb-4">September/2026</p>
      <h1 class="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900">
        CS2 External ESP
      </h1>
      <div class="flex flex-wrap gap-2 mt-6">
        {#each ['C++', 'Windows API', 'Reverse Engineering', 'Direct3D', 'ImGui'] as tag}
          <span class="font-mono text-[0.65rem] px-2 py-1 rounded-md bg-black/[0.03] border border-black/10 text-zinc-600">{tag}</span>
        {/each}

      </div>

      <a
        href={REPO}
        target="_blank"
        rel="noreferrer"
        class="glass glass-hover group inline-flex items-center gap-2.5 mt-8 rounded-xl px-4 py-2.5 text-sm text-zinc-700 hover:text-zinc-900"
      >
        <Icon name="github" size={16} />
        <span>View on GitHub</span>
        <span class="text-zinc-400 group-hover:text-accent-soft transition-colors">
          <Icon name="external-link" size={12} />
        </span>
      </a>
    </header>

    <div class="space-y-14 text-[1.05rem] leading-relaxed text-zinc-700">

      <section>
        <h2 class="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4">Overview</h2>
        <p>
          Looking through some old folders on my computer I found an old cheat I wrote when I was 14 for the game
          Counter-Strike: Global Offensive. I rewrote most of it, added new features, and made it work for
          Counter Strike 2.
        </p>
      </section>

      <!-- Screenshot -->
      <section>
        <ZoomImage
          src="/cs2-esp/1.jpg"
          alt="Placeholder image for the CS2 external ESP writeup"
          class="glass rounded-xl w-full object-cover"
        />
        <p class="text-sm text-zinc-500 mt-3">
          How it looks in game
        </p>
      </section>

      <section>
        <h2 class="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4">Anticheat Bypass</h2>
        <p class="mb-6">
          Counter Strike uses VAC (Valve Anti Cheat) and it's well known for being pretty useless. 
          VAC is a usermode anticheat, meaning it doesn't have very high privileges and can't monitor in depth
          what programs are interacting with the game. That doesn't mean we can simply open a handle to access the game's memory, as VAC 
          can still enumerate these and flag suspicious processes. In my cheat I use a technique known as dll or handle hijacking. I query ntdll.dll, a system dll 
          that has a handle open to CS2, and enumerate it's open handles to see if any process IDs match. I then copy 
          it in to my own program, meaning from VAC's end it appears as though there is no external process and all calls are being made from ntdll.
          Addtionally, since it would be trivial for VAC to enumerate topmost window overlays, I decided to find Discord's
          in-game overlay and hijack its handle to further hide from possible VAC protections.
           From there it's just a matter of knowing what memory to read or alter.

        </p>
      </section>

      <section>
        <h2 class="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4">Finding Offsets</h2>
        <p>
          CS2 regularily updates the offsets for memory addresses of game objects. Luckily these are tracked 
          by dumps online, which we can pull from to get always updated offsets. Using these offsets we can 
          find the memory addresses of values we want to read, like health, team, world position, etc. From 
          there we can manipulate the data however we want and draw it to the screen.
        </p>
      </section>

      <section>
        <h2 class="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4">Overlay</h2>
        <p>
          The overlay is Imgui, which renders a transparent click-through window on top of the game and draws boxes
          using the players' feet and head positions for the box bounds. I also ensured the cheat batch reads memory
          at a set intervals to prevent the anticheat from potentially detecting a suspiciously high amount of reads every single frame
          (although I'm fairly sure VAC doesn't track this).
        </p>
      </section>

      <section>
        <h2 class="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4">What I Learned</h2>
        <p>
          The old code I wrote back then actually isn't that bad. However, it's still a very barebones cheat and I may 
          expand on it in the future.
        </p>
      </section>

    </div>
  </article>
{/if}
