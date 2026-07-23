<script>
  import { fade } from 'svelte/transition';
  import { lightboxImage, closeLightbox } from '$lib/stores/lightbox.js';

  function onKeydown(/** @type {KeyboardEvent} */ e) {
    if (e.key === 'Escape') closeLightbox();
  }

  // Lock background scrolling while the lightbox is open.
  $: if (typeof document !== 'undefined') {
    document.body.style.overflow = $lightboxImage ? 'hidden' : '';
  }
</script>

<svelte:window on:keydown={onKeydown} />

{#if $lightboxImage}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10 bg-black/80 backdrop-blur-sm cursor-zoom-out"
    on:click={closeLightbox}
    transition:fade={{ duration: 200 }}
    role="dialog"
    aria-modal="true"
    aria-label="Expanded image"
  >
    <img
      src={$lightboxImage.src}
      alt={$lightboxImage.alt}
      on:click|stopPropagation
      class="max-h-[90vh] max-w-full rounded-xl object-contain shadow-2xl cursor-default"
    />
    <button
      type="button"
      class="fixed top-5 right-6 text-white/70 hover:text-white text-3xl leading-none"
      on:click={closeLightbox}
      aria-label="Close expanded image"
    >
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>
{/if}
