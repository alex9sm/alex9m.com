<script>
  import { fade } from 'svelte/transition';
  import { page } from '$app/stores';
  import Icon from '$lib/components/Icon.svelte';
  import { EMAIL, SOCIALS } from '$lib/seo';
  import { PROJECTS } from '$lib/projects';

  let showToast = false;
  let menuOpen = false;

  // Individual writeups are reachable from the Projects section rather than the
  // bar, so this stays two entries wide no matter how many projects get added.
  const links = [
    { href: '/', label: 'Home' },
    { href: '/#projects', label: 'Projects' },
  ];

  function copyEmail() {
    navigator.clipboard.writeText(EMAIL)
      .then(() => {
        showToast = true;
        setTimeout(() => { showToast = false; }, 2000);
      })
      .catch(err => console.error('Failed to copy text: ', err));
  }

  $: pathname = $page.url.pathname;

  // "Projects" also lights up while a writeup is open, since those pages are
  // what the section links to.
  const isActive = (href, path) => {
    if (href === '/') return path === '/';
    if (href === '/#projects') return PROJECTS.some((p) => path.startsWith(p.href));
    return path.startsWith(href);
  };
</script>

<header class="sticky top-0 z-50">
  <div class="glass">
    <div class="max-w-6xl mx-auto px-5 md:px-8">
      <div class="flex items-center justify-between h-16">

        <!-- Brand -->
        <a href="/" class="group flex items-center gap-2">
          <span class="font-mono text-sm tracking-tight text-zinc-900">alex9m</span>
        </a>

        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-8">
          {#each links as link}
            <a
              href={link.href}
              class="text-sm transition-colors duration-200 {isActive(link.href, pathname) ? 'text-zinc-900' : 'text-zinc-600 hover:text-zinc-900'}"
            >
              {link.label}
            </a>
          {/each}

          <div class="flex items-center gap-5 pl-4 border-l border-black/10">
            {#each SOCIALS as social}
              <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} class="text-zinc-600 hover:text-zinc-900 transition-colors">
                <Icon name={social.icon} size={18} />
              </a>
            {/each}
            <button on:click={copyEmail} class="text-zinc-600 hover:text-zinc-900 transition-colors" aria-label="Copy email">
              <Icon name="mail" size={18} />
            </button>
          </div>
        </nav>

        <!-- Mobile toggle -->
        <button
          class="md:hidden text-zinc-700 hover:text-zinc-900 transition-colors p-2 -mr-2"
          on:click={() => (menuOpen = !menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    {#if menuOpen}
      <nav class="md:hidden border-t border-black/10 px-5 py-4" transition:fade={{ duration: 150 }}>
        <div class="flex flex-col gap-1">
          {#each links as link}
            <a
              href={link.href}
              on:click={() => (menuOpen = false)}
              class="py-2 text-base transition-colors {isActive(link.href, pathname) ? 'text-zinc-900' : 'text-zinc-600 hover:text-zinc-900'}"
            >
              {link.label}
            </a>
          {/each}
        </div>
        <div class="flex items-center gap-6 mt-4 pt-4 border-t border-black/10">
          {#each SOCIALS as social}
            <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} class="text-zinc-600 hover:text-zinc-900">
              <Icon name={social.icon} size={20} />
            </a>
          {/each}
          <button on:click={copyEmail} class="text-zinc-600 hover:text-zinc-900" aria-label="Copy email">
            <Icon name="mail" size={20} />
          </button>
        </div>
      </nav>
    {/if}
  </div>
</header>

{#if showToast}
  <div
    transition:fade
    class="fixed bottom-4 right-4 glass text-zinc-900 px-4 py-2 rounded-lg shadow-lg z-50 text-sm"
    role="alert"
  >
    Email copied to clipboard
  </div>
{/if}
