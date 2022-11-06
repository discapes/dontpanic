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
		class="rounded-full m-10 border-3 border-solid border-grey w-32 h-32"
		alt="Welcome"
	/>

	<div
		class="mainbuttons flex flex-col sm:flex-row sm:flex-wrap justify-center items-center max-w-[600px] gap-10 p-10"
	>
		<a href="/bot?journaling"> My Journal <span>🗒️</span> </a>
		<a class="panic" href="/panic"> Panic! </a>
		<a href="/bot?assessment"> Quick tests <span>✎</span> </a>
		<a href="/about"> Upgrade your mind <span>💎</span> </a>
		<a href="/marketplace"> Online therapy <span>🎔</span> </a>
	</div>
</section>

<style>
	.mainbuttons a {
		max-width: 200px;
		@apply w-full sm:w-auto;
	}

	.panic {
		color: white;
		background-color: rgba(255, 128, 31, 0.8) !important;
	}
	.panic:hover {
		background-color: rgba(255, 128, 31, 1) !important;
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
