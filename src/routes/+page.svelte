<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1 class="italic">
		<span class="welcome -mb-32">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>
	</h1>

	<div class="flex justify-start flex-wrap p-10 w-full max-w-[600px] gap-10 px-32">
		<a
			href="/panic"
			class="cursor-pointer basis-auto grow rounded p-5 hover:bg-rose-200 bg-rose-200/50 nolink"
		>
			Panic button
		</a>
		<a class="cursor-pointer basis-auto grow rounded p-5 hover:bg-rose-200 bg-rose-200/50 nolink">
			Do an assessment
		</a>
		<a class="cursor-pointer basis-auto grow rounded p-5 hover:bg-rose-200 bg-rose-200/50 nolink">
			Journaling
		</a>
		<a
			class="cursor-pointer basis-auto grow rounded p-5 hover:bg-rose-200 bg-rose-200/50 nolink"
			href="/about"
		>
			About us
		</a>
		<a class="cursor-pointer basis-auto grow rounded p-5 hover:bg-rose-200 bg-rose-200/50 nolink">
			Settings
		</a>
	</div>

	<div class="-mb-10 -mt-5">
		<!-- <Counter /> -->
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		/* filter: ; */
		aspect-ratio: 2048 / 495;
		display: block;
		position: relative;
		z-index: -100;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
