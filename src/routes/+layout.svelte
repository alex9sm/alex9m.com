<script lang="ts">
    import Footer from '$lib/components/Footer.svelte';
import SideMenu from '$lib/components/SideMenu.svelte';
	import TopBar from '$lib/components/TopBar.svelte';
import '../app.css';
	
</script>

<div class="mx-5 md:mx-8 xl:mx-20 ">
	<TopBar/>
	<SideMenu/>
	<slot/>
</div>
<Footer/>

