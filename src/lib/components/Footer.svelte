<script>
  import Icon from '$lib/components/Icon.svelte';
  import { EMAIL, SOCIALS } from '$lib/seo';
  import { openLightbox } from '$lib/stores/lightbox.js';
</script>

<footer class="mt-20">
  <hr class="hairline" />
  <div class="max-w-3xl mx-auto px-6 md:px-12 py-10">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
      <div class="flex flex-col items-center sm:items-start gap-1">
        <span class="font-mono text-sm text-zinc-900">alex9m.com</span>
        <p class="text-xs text-zinc-500">
          <a
            href="/img.jpg"
            on:click|preventDefault={() => openLightbox('/img.jpg', '')}
            class=" cursor-pointer decoration-dotted underline-offset-2 hover:text-zinc-900 transition-colors"
          >
            This website is self hosted in my closet.
          </a>
        </p>
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
