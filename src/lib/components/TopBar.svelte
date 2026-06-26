<script>
  import { fade } from 'svelte/transition';
  import { page } from '$app/stores';

  let showToast = false;
  let menuOpen = false;
  const email = 'work@alex9m.com';

  const links = [
    { href: '/', label: 'Home' },
    { href: '/tradingbot', label: 'Trading Bot' },
    { href: '/vulkan', label: 'Vulkan Renderer' },
  ];

  function copyEmail() {
    navigator.clipboard.writeText(email)
      .then(() => {
        showToast = true;
        setTimeout(() => { showToast = false; }, 2000);
      })
      .catch(err => console.error('Failed to copy text: ', err));
  }

  $: pathname = $page.url.pathname;
  const isActive = (/** @type {string} */ href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);
</script>

<header class="sticky top-0 z-50">
  <div class="glass">
    <div class="max-w-6xl mx-auto px-5 md:px-8">
      <div class="flex items-center justify-between h-16">

        <!-- Brand -->
        <a href="/" class="group flex items-center gap-2">
          <span class="font-mono text-sm tracking-tight text-zinc-100">alex9m</span>
        </a>

        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-8">
          {#each links as link}
            <a
              href={link.href}
              class="text-sm transition-colors duration-200 {isActive(link.href) ? 'text-zinc-100' : 'text-zinc-400 hover:text-zinc-100'}"
            >
              {link.label}
            </a>
          {/each}

          <div class="flex items-center gap-5 pl-4 border-l border-white/10">
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <a href="https://www.linkedin.com/in/alexander-cox-568b342b3/" target="_blank" rel="noreferrer" class="text-zinc-400 hover:text-zinc-100 transition-colors"><i class="fa-brands fa-linkedin text-lg"></i></a>
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <a href="https://github.com/alex9sm" target="_blank" rel="noreferrer" class="text-zinc-400 hover:text-zinc-100 transition-colors"><i class="fa-brands fa-github text-lg"></i></a>
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button on:click={copyEmail} class="text-zinc-400 hover:text-zinc-100 transition-colors" aria-label="Copy email">
              <i class="fa-solid fa-envelope text-lg"></i>
            </button>
          </div>
        </nav>

        <!-- Mobile toggle -->
        <button
          class="md:hidden text-zinc-300 hover:text-white transition-colors p-2 -mr-2"
          on:click={() => (menuOpen = !menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <i class="fa-solid {menuOpen ? 'fa-xmark' : 'fa-bars'} text-xl"></i>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    {#if menuOpen}
      <nav class="md:hidden border-t border-white/10 px-5 py-4" transition:fade={{ duration: 150 }}>
        <div class="flex flex-col gap-1">
          {#each links as link}
            <a
              href={link.href}
              on:click={() => (menuOpen = false)}
              class="py-2 text-base transition-colors {isActive(link.href) ? 'text-zinc-100' : 'text-zinc-400 hover:text-zinc-100'}"
            >
              {link.label}
            </a>
          {/each}
        </div>
        <div class="flex items-center gap-6 mt-4 pt-4 border-t border-white/10">
          <!-- svelte-ignore a11y_consider_explicit_label -->
          <a href="https://www.linkedin.com/in/alexander-cox-568b342b3/" target="_blank" rel="noreferrer" class="text-zinc-400 hover:text-zinc-100"><i class="fa-brands fa-linkedin text-xl"></i></a>
          <!-- svelte-ignore a11y_consider_explicit_label -->
          <a href="https://github.com/alex9sm" target="_blank" rel="noreferrer" class="text-zinc-400 hover:text-zinc-100"><i class="fa-brands fa-github text-xl"></i></a>
          <!-- svelte-ignore a11y_consider_explicit_label -->
          <button on:click={copyEmail} class="text-zinc-400 hover:text-zinc-100" aria-label="Copy email"><i class="fa-solid fa-envelope text-xl"></i></button>
        </div>
      </nav>
    {/if}
  </div>
</header>

{#if showToast}
  <div
    transition:fade
    class="fixed bottom-4 right-4 glass text-zinc-100 px-4 py-2 rounded-lg shadow-lg z-50 text-sm"
    role="alert"
  >
    Email copied to clipboard
  </div>
{/if}
