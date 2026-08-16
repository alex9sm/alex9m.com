<script>
  import Icon from '$lib/components/Icon.svelte';
  import { EMAIL, SOCIALS } from '$lib/seo';
</script>

<footer class="mt-32">
  <hr class="hairline" />
  <div class="max-w-6xl mx-auto px-5 md:px-8 py-10">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
      <div class="flex flex-col items-center sm:items-start gap-1">
        <span class="font-mono text-sm text-zinc-900">alex9m.com</span>
      </div>

      <div class="flex items-center gap-6">
        {#each SOCIALS as social}
          <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} class="text-zinc-600 hover:text-zinc-900 transition-colors">
            <Icon name={social.icon} size={18} />
          </a>
        {/each}
        <a href="mailto:{EMAIL}" aria-label="Email" class="text-zinc-600 hover:text-zinc-900 transition-colors">
          <Icon name="mail" size={18} />
        </a>
      </div>
    </div>
  </div>
</footer>
