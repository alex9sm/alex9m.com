<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import cpp from '$lib/media/cpp.png';
    import nginx from '$lib/media/nginx.png';
    import nodejs from '$lib/media/nodejs.png';
    import python from '$lib/media/python.png';
    import svelte from '$lib/media/svelte.png';
    import tailwind from '$lib/media/tailwind.png';
    import rpi_img from '$lib/media/rpi_img.jpg';
    import amz from '$lib/media/amz.png';
    
    
    let visible = false;
    let showArrow = true;
    
    onMount(() => {
        visible = true;
        const handleScroll = () => {
            showArrow = window.scrollY === 0;
        };

        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
  });

    
</script>

{#if visible}
    <div class="px-10 ">
        <div class="flex flex-col md:flex-row w-full justify-center md:justify-normal mt-36 md:mx-28 lg:mt-72" 
            transition:fade={{ delay: 200, duration: 1000 }}>
            <h1 class="text-4xl md:text-6xl font-bold">Hello, I'm </h1>
            <div class="md:px-4 overflow-hidden">
            <div class="flex flex-col h-11 md:h-13 lg:h-16">
                <h1 class="text-4xl md:text-6xl font-bold text-sky-200 [text-shadow:_0_0px_15px_rgb(99_102_241_/_0.5)] pb-1">Alex</h1>
            </div>
            </div>
        </div>

        <div class="flex md:ml-28 mt-4 md:flex-row md:justify-normal"
            transition:fade={{ delay: 700, duration: 1000 }}
        >
            <h1 class="lg:text-2xl font-bold">I'm a </h1>
            <div class="md:px-2 overflow-hidden">
                <div class="flex flex-col pl-1 md:pl-0 h-6 lg:h-9 spin">
                    <h1 class=" lg:text-2xl font-bold text-sky-200 [text-shadow:_0_0px_15px_rgb(99_102_241_/_0.5)] pb-1">student</h1>
                    <h1 class=" lg:text-2xl font-bold text-sky-200 [text-shadow:_0_0px_15px_rgb(99_102_241_/_0.5)] pb-1">business owner</h1>
                    <h1 class=" lg:text-2xl font-bold text-sky-200 [text-shadow:_0_0px_15px_rgb(99_102_241_/_0.5)] pb-1">software engineer</h1>
                    <h1 class=" lg:text-2xl font-bold text-sky-200 [text-shadow:_0_0px_15px_rgb(99_102_241_/_0.5)] pb-1">cybersecurity enthusiast</h1>
                    <h1 class=" lg:text-2xl font-bold text-sky-200 [text-shadow:_0_0px_15px_rgb(99_102_241_/_0.5)] pb-1">student</h1>
                </div>
            </div>
        </div>
 
        <div class="mt-4 md:mx-28 lg:mb-72"
            transition:fade={{ delay: 1200, duration: 1000 }}>
            <button class="bg-sky-200 p-3 rounded-lg text-black font-semibold shadow-xl shadow-indigo-500/20 active:bg-sky-400 cursor-pointer">
            <a href="/SEresume.pdf" download>Download Resume</a>
            </button>
        </div>

        {#if showArrow}
            <div 
                class="fixed bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
                transition:fade={{ duration: 200 }}
            >
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                class="text-white hover:text-sky-200 cursor-pointer"
                on:click={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                >
                <path d="M12 5v14M19 12l-7 7-7-7"/>
                </svg>
            </div>
        {/if}

        <hr class=" h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-white to-transparent opacity-30 mt-36">

        <div class="flex flex-col justify-center items-center mt-36">
            <h1 class="text-4xl font-bold text-sky-200 [text-shadow:_0_0px_15px_rgb(99_102_241_/_0.5)] mb-20">Projects</h1>
            <div class="flex flex-col w-full h-full justify-center items-center ">
                <a href="https://rapidpass.io/"><h1 class="text-2xl font-bold text-white underline mb-12">Rapidpass</h1></a>
                <embed src="https://rapidpass.io/" class="w-3/4 h-[700px] rounded-2xl ring-2 ring-indigo-400/20 shadow-2xl shadow-indigo-400/30"/>
            </div>
        </div>

        <hr class=" h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-white to-transparent opacity-30 mt-36">

        
        <div class="flex flex-col w-full justify-center mt-96 mb-72" >
            <h1 class="text-center text-2xl font-bold text-sky-200 [text-shadow:_0_0px_15px_rgb(99_102_241_/_0.5)] mb-8">More to come...</h1>
            <h1 class="text-center mb-24">Contact me through Linkedin or email!</h1>
        </div>

    </div>

{/if}