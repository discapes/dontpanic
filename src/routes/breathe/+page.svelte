<script>
	import { delay } from '$lib/session';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let instruction = '1. Take a deep breath through your nose';
	let extra = '';

	onMount(async () => {
		await delay(4000);
		instruction = '2. Slowly and steadily exhale through your mouth';
		await delay(5000);
		instruction = '3. Take another deep breath';
		await delay(3000);
		extra =
			'Performing this exercise activates the parasympathetic nervous system, promoting calmness and relaxation.';
		await delay(2000);
		instruction = '4. Slowly exhale through your mouth';
		await delay(5000);
		instruction = '5. One more deep breath';
		await delay(5000);
		instruction = '6. Exhale gently';
	});
</script>

<div class="w-full relative flex flex-col items-center">
	<span class="h-[300px] relative flex justify-center items-center ">
		<p class="anim-circle">diaphragmatic animation sadkfisdaf</p>
	</span>
	<div class="h-32  w-80 relative">
		{#key instruction}
			<div
				class="absolute inset-0 mt-10 font-serif text-2xl flex justify-center text-center"
				transition:fade|local={{ duration: 1000 }}
			>
				{instruction}
			</div>
		{/key}
		{#key extra}
			<p class=" mt-32 font-serif text-sm text-center" transition:fade|local={{ duration: 3000 }}>
				{extra}
			</p>
		{/key}
	</div>
</div>

<style>
	.anim-circle {
		color: transparent;
		--circle-color-tp: rgba(255, 128, 31, 0.3);
		top: 20%;
		width: 70px;
		height: 70px;
		border-radius: 50%;
		background: rgba(255, 128, 31, 0.889);
		animation: breathe 10s linear infinite;
	}
	@keyframes breathe {
		0% {
			box-shadow: 0 0 0 15px var(--circle-color-tp), 0 0 0 30px var(--circle-color-tp),
				0 0 0 45px var(--circle-color-tp), 0 0 0 60px var(--circle-color-tp),
				0 0 0 75px var(--circle-color-tp);
		}
		50% {
			box-shadow: 0 0 0 25px var(--circle-color-tp), 0 0 0 50px var(--circle-color-tp),
				0 0 0 75px var(--circle-color-tp), 0 0 0 100px var(--circle-color-tp),
				0 0 0 125px var(--circle-color-tp);
		}
		100% {
			box-shadow: 0 0 0 15px var(--circle-color-tp), 0 0 0 30px var(--circle-color-tp),
				0 0 0 45px var(--circle-color-tp), 0 0 0 60px var(--circle-color-tp),
				0 0 0 75px var(--circle-color-tp);
		}
	}
</style>
