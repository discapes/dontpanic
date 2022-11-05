<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>🎔InMind</title>
	<meta name="description" content="InMind" />
</svelte:head>

<section class="flex justify-center ">
	<img
		src="inmind.png"
		class="rounded-full m-10 border-4 border-solid border-white w-32 h-32"
		alt="Welcome"
	/>

	<div class="mainbuttons flex justify-center flex-wrap w-full max-w-[600px] gap-10 ">
		<a href="/bot?journaling"> My Journal 🗒️ </a>
		<a class="panic" href="/panic"> Panic! </a>
		<a href="/bot?assessment"> Quick tests ✎ </a>
		<a href="/about"> Upgrade your mind 💎 </a>
		<a href="/marketplace"> Online therapy 🎔 </a>
	</div>
</section>

<style>
	.panic {
		cursor: pointer;
		flex-grow: 1;
		border-radius: 5%;
		padding: 2%;
		text-decoration: none;
		color: white;
		background-color: rgba(255, 0, 0, 0.8) !important;
	}
	.panic:hover {
		background-color: red !important;
	}

	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 0.6;
	}

	img {
		filter: hue-rotate(230deg);
	}
</style>
