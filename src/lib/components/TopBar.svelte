
<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  let showToast = false;
  const email = 'work@alex9m.com';

  function copyEmail() {
    navigator.clipboard.writeText(email)
      .then(() => {
        showToast = true;
        setTimeout(() => {
          showToast = false;
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  }
</script>

<header class="sticky top-0 z-50 bg-transparent backdrop-blur-md [-webkit-backdrop-filter:blur(8px)]">
    <div class="max-w-7xl mx-auto px-12 lg:px-20 md:py-6">
      <div class="flex justify-end items-center py-6 md:py-4">
        
        <nav>
          <div class="flex space-x-10 ">
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <a href="https://www.linkedin.com/in/alexander-cox-568b342b3/" class="fa text-3xl xl:text-lg"><i class="fa-brands fa-linkedin hover:cursor-pointer"></i></a>
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <a href="https://github.com/alex9sm" class="fa text-3xl xl:text-lg"><i class="fa-brands fa-github hover:cursor-pointer"></i></a>
            <i 
            class="fa-solid fa-envelope hover:cursor-pointer text-3xl xl:text-lg"
            on:click={copyEmail}
            role="button"
            tabindex="0"
            on:keydown={(e) => e.key === 'Enter' && copyEmail()}
          ></i>
          </div>
        </nav>
        
      </div>
    </div>
    <hr class=" h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-white to-transparent opacity-50">
</header>

{#if showToast}
  <div
    transition:fade
    class="fixed bottom-4 right-4 bg-zinc-800 text-white px-4 py-2 rounded-md shadow-lg"
    role="alert"
  >
    copied to clipboard
  </div>
{/if}
