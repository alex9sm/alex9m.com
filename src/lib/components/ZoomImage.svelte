<script>
  import { openLightbox } from '$lib/stores/lightbox.js';

  export let src;
  export let alt = '';
  // Consumers pass Tailwind classes for the thumbnail via `class="..."`.
  let extraClass = '';
  export { extraClass as class };

  function open() {
    openLightbox(src, alt);
  }
  function onKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
    }
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<img
  {src}
  {alt}
  loading="lazy"
  role="button"
  tabindex="0"
  on:click={open}
  on:keydown={onKeydown}
  class="cursor-zoom-in transition-transform duration-300 hover:scale-[1.02] {extraClass}"
/>
