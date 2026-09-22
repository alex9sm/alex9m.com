<script>
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import ZoomImage from '$lib/components/ZoomImage.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Seo from '$lib/components/Seo.svelte';

  let visible = false;
  onMount(() => { visible = true; });

  const REPO = 'https://github.com/alex9sm/kd-external';

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
        CS2 Kernel Driver Cheat
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
          Counter-Strike: Global Offensive. I repurposed its code and implemented a kernel driver to bypass anti-cheat.
          Updated for CS2.
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
          how programs are interacting with the game. That doesn't mean we can simply open a handle to access the game's memory, as VAC 
          can still enumerate these and flag suspicious processes. My original cheat used dll hijacking, where I copied
          the handle to CS2 from a system dll. I decided to upgrade this process to a kernel driver for future proofing
          and to learn system development on Windows. Using a kernel driver cheat for a usermode anticheat essentially 
          gives us free range to implement whatever features we want.

        </p>
        <p class="mb-6">
          I set up a kernel development environment inside a windows virtual machine with tools like WinDBG and KDmapper.
          I created a basic driver with kernel privileges that opens a handle to any process and can read and write 
          its memory. The kernel accepts commands from the usermode cheat and executes reads, updating a shared buffer 
          that the cheat reads from to draw ESP (wallhack). The driver runs on my PC using KDmapper, which allows for 
          the execution of unregistered drivers on the Windows kernel.

        </p>
      </section>

      <section>
        <h2 class="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4">Finding Offsets</h2>
        <p>
          CS2 regularily updates the offsets for memory addresses of game objects. Luckily these are tracked 
          by dumps online, which we can pull from to get always updated offsets. I created a .bat script that 
          automatically checks the dumps repo for updates and downloads the necessary header files. Using these offsets we can 
          find the memory addresses of values we want to read, like health, team, world position, etc. From 
          there we can manipulate the data however we want and draw it to the screen.
        </p>
      </section>

      <section>
        <h2 class="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4">Overlay</h2>
        <p>
          The overlay is Imgui, which renders a transparent click-through window on top of the game and draws boxes
          using the players' feet and head positions for the box bounds. In order to prevent potential detection from
          VAC enumerating top level transparent windows, I used the same dll hijacking method to steal a handle from the Discord game
          overlay, which is a process trusted by VAC. Since there is no window belonging to my process theres nothing
          for VAC to flag and it only sees Discord's overlay.
        </p>
      </section>

      <section>
        <h2 class="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4">What I Learned</h2>
        <p>
          Kernel development is very crash prone. I ran in to several freezes and even one Blue Screen of Death. Luckily,
          it was constrained to the virtual machine and didn't cause any real damage. 
          The old code younger me wrote which I modified wasn'y that bad. However, it's still a very barebones cheat and I may 
          expand on it in the future. Because of the kernel driver, it would be trivial to add more functionality as 
          well as write operations, since VAC would have no way to protect against its elevated privileges.
        </p>
      </section>

    </div>
  </article>
{/if}
