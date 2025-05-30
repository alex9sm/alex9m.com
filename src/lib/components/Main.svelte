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
            <div class="flex flex-col h-11 md:h-13 lg:h-16 spin">
                <h1 class="text-4xl md:text-6xl font-bold text-sky-200 [text-shadow:_0_0px_15px_rgb(99_102_241_/_0.5)] pb-1">Alex</h1>
            </div>
            </div>
        </div>

        <div class="mt-5 w-3/4 md:w-1/3 md:mx-28"
            transition:fade={{ delay: 700, duration: 1000 }}>
            <h1 class="lg:text-xl">
            I'm a student, business owner, and software engineer.
            </h1>
        </div>

        <div class="mt-4 md:mx-28 lg:mb-72"
            transition:fade={{ delay: 1200, duration: 1000 }}>
            <button class="bg-sky-200 p-3 rounded-lg text-black font-semibold shadow-xl shadow-indigo-500/20 active:bg-sky-400 cursor-pointer">
            <a href="/resume3.pdf" download>Download Resume</a>
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

        <hr class=" h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-white to-transparent opacity-50 mt-36">

        <div class="flex flex-row w-full justify-center mt-16" 
            transition:fade={{ delay: 200, duration: 1000 }}>
            <h1 class="text-4xl lg:text-4xl font-bold text-sky-200 [text-shadow:_0_0px_15px_rgb(99_102_241_/_0.5)]">About</h1>
        </div>
        <div class="flex flex-col md:flex-row justify-center mt-16">
            <h1 class=" text-center mb-16 md:mb-0 md:text-left md:w-1/3 lg:w-1/4">Fully committed to the philosophy of lifelong learning, 
                I'm an aspiring career software developer studying as a freshman at 
                George Mason University. My interests range from web development, to cybersecurity and server architecture, to
                low level programming in C/C++. I love never running out of new things to discover and learn. When I'm not at my
                computer, I love going to the gym, driving cars, and working on my business.
            </h1>
            <div class=" grid grid-cols-3 gap-8 md:ml-36">
                <div class=""><img src={cpp} class="object-contain w-full md:w-20"><h1 class="text-center font-bold">C++</h1></div>
                <div class=""><img src={nginx} class="object-contain w-full md:w-20"><h1 class="text-center font-bold">nginx</h1></div>
                <div class=""><img src={nodejs} class="object-contain w-full md:w-20"><h1 class="text-center font-bold">nodejs</h1></div>
                <div class=""><img src={python} class="object-contain w-full md:w-20"><h1 class="text-center font-bold">python</h1></div>
                <div class=""><img src={svelte} class="object-contain w-full md:w-20"><h1 class="text-center font-bold">svelte</h1></div>
                <div class=""><img src={tailwind} class="object-contain w-full md:w-20"><h1 class="text-center font-bold">tailwind</h1></div>
            </div>
        </div>
        <hr class=" h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-white to-transparent opacity-50 mt-24">
        <div class="flex flex-row w-full justify-center mt-16" >
            <h1 class="text-4xl lg:text-4xl font-bold text-sky-200 [text-shadow:_0_0px_15px_rgb(99_102_241_/_0.5)]">Projects</h1>
        </div>
        <div class="flex flex-col md:flex-row justify-center mt-16">
            <div class="md:w-1/3 lg:w-1/4">
                <h1 class=" text-center md:text-start text-2xl font-bold text-sky-200 mb-8">Personal Website</h1>
                <h1 class="text-center md:text-start">If you're reading this, this website is being hosted on a raspberry pi. This personal website project was an experiment
                    in learning how to set up a web hosting server right from my room. The front-end is made using Sveltekit and Tailwind CSS, while
                    the back-end is built using Nginx and deployed to the web through Cloudflare tunnelling. This project taught me a lot about
                    server architecture and network security, while also allowing me to express my interests in UI/UX design.
                </h1>
            </div>
            <div class="md:ml-36 md:w-96 mt-14 md:mt-0">
                <img src={rpi_img} class="object-contain rounded-xl">
            </div>
        </div>
        <div class="flex flex-col md:flex-row justify-center mt-28">
            <div class="md:mr-36 md:w-96 mb-14 md:mb-0">
                <img src={amz} class="object-contain rounded-xl">
            </div>
            <div class="md:w-1/3 lg:w-1/4">
                <h1 class="text-center md:text-end text-2xl font-bold text-sky-200 mb-8">Amazon Seller Order Manager</h1>
                <h1 class="text-center md:text-end">
                    This practical project saw me and my friend create a middleware between Amazon's seller API and a shipping label provider to 
                    automate the process of printing label's for seller fulfilled orders. The program automatically accepts customer shipping 
                    info and uses the label provider's API to generate the label pdfs efficiently. Additionally, it monitors order tracking 
                    to alert me if any orders are late or did not reach their destination.
                </h1>
            </div>
        </div>
        <hr class=" h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-white to-transparent opacity-50 mt-28">
        <div class="flex flex-col w-full justify-center mt-24" >
            <h1 class="text-center text-2xl font-bold text-sky-200 [text-shadow:_0_0px_15px_rgb(99_102_241_/_0.5)] mb-8">More to come...</h1>
            <h1 class="text-center mb-24">Contact me through Linkedin or email!</h1>
        </div>

    </div>

{/if}