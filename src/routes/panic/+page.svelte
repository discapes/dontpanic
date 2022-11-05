<script>
	import Lorem from '$lib/Lorem.svelte';

	const BUTTON_CLASS = '';
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="flex w-full justify-center p-10">
	<div class="flex flex-col w-full max-w-sm gap-5">
		<div class="bg-white/50 flex justify-center p-10 m-5">&lt; &gt;</div>
		<button class="btn">⚠️ Immediate help ⚠️</button>
		<button class="btn">🌬️ Breathing exercises 🌬️</button>
		<button class="btn" />
	</div>
</div>

<style>
	.btn {
		@apply basis-auto grow rounded p-5 hover:bg-rose-200 bg-rose-200/50 border-[1px];
	}
</style>
