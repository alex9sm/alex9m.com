import { writable } from 'svelte/store';

// Holds the currently expanded image ({ src, alt }), or null when closed.
export const lightboxImage = writable(null);

export function openLightbox(src, alt = '') {
  lightboxImage.set({ src, alt });
}

export function closeLightbox() {
  lightboxImage.set(null);
}
