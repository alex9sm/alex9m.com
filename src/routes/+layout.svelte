<script lang="ts">
  import Footer from '$lib/components/Footer.svelte';
  import TopBar from '$lib/components/TopBar.svelte';
  import '../app.css';
</script>

<div class="flex flex-col min-h-screen">
  <TopBar />
  <main class="flex-1">
    <slot />
  </main>
  <Footer />
</div>
