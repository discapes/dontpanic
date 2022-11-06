<script>
</script>

<svelte:head>
	<title>Panic</title>
	<meta name="description" content="Panic" />
</svelte:head>

<div class="flex flex-col w-full justify-center items-center">
	<div class="flex flex-col w-full max-w-sm gap-5 pt-5">
		<div class="bg-white/50 flex justify-center p-10 m-5">
			Good news - it's not dangerous at all and you're not gonna die! Adrenaline rushing through
			your blood makes the heart beat faster, and quick breathing brings elevated levels of oxygen
			to your brain, which might make you feel dizzy. It's called hyperventilation. You can try to
			yawn 10 times, or try the breathing exercise below. It will pass. Don't worry and try to
			distract your mind by focusing on some object that you see now.
		</div>
		<button onclick="window.open('tel:+358925250111')" class="mainbuttons"
			>Call the mental-health helpline 📞</button
		>
		<button class="mainbuttons" a href="/breathe"> Breathing exercise <span>🌀</span></button>
	</div>
	<h2 class="text-center">Things that helped you previously:</h2>
	<div class="flex gap-5">
		<button class="btn" /> <button class="btn" /> <button class="btn" /> <button class="btn" />
	</div>
	<h2 class="text-center">Other suggestions:</h2>
	<div class="flex gap-5">
		<button class="btn" /> <button class="btn" /> <button class="btn" /> <button class="btn" />
	</div>
	<div />
</div>

<style>
	.btn {
		@apply basis-auto grow rounded p-5 hover:bg-rose-200 bg-rose-200/50 border-[1px] cursor-pointer;
	}
</style>
