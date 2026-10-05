<script>
  import Icon from '$lib/components/Icon.svelte';
  import { page } from '$app/stores';
  import { EMAIL, SOCIALS } from '$lib/seo';

  // Loaded in +layout.server.ts. Any value can be null if its source is down.
  $: stats = $page.data.stats ?? {};

  /** @param {number} s */
  const days = (s) => (s >= 86400 ? `${Math.floor(s / 86400)}d` : `${Math.floor(s / 3600)}h`);
  /** @param {number | null | undefined} v @param {(n: number) => string} fmt */
  const show = (v, fmt) => (v == null ? '—' : fmt(v));
  /** @param {number} n */
  const count = (n) => n.toLocaleString('en-US');
</script>

<footer class="mt-20">
  <hr class="hairline" />
  <div class="max-w-3xl mx-auto px-6 md:px-12 py-10">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
      <div class="flex flex-col items-center sm:items-start gap-1">
        <span class="font-mono text-sm text-stone-50">alex9m.com</span>
        <p class="text-xs text-stone-400 text-center sm:text-left">
          uptime <span class="text-green-400">{show(stats.uptime, days)}</span>
          / 30d visitors <span class="text-green-400">{show(stats.visitors, count)}</span>
          / 30d requests <span class="text-green-400">{show(stats.requests, count)}</span>
        </p>
      </div>

      <div class="flex items-center gap-6">
        {#each SOCIALS as social}
          <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} class="text-stone-300 hover:text-stone-50 transition-colors">
            <Icon name={social.icon} size={18} />
          </a>
        {/each}
        <a href="mailto:{EMAIL}" aria-label="Email" class="text-stone-300 hover:text-stone-50 transition-colors">
          <Icon name="mail" size={18} />
        </a>
      </div>
    </div>
  </div>
</footer>
