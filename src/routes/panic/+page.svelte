<script>
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="flex flex-col w-full justify-center items-center">
	<div class="flex flex-col w-full max-w-sm gap-5 pt-5">
		<div class="bg-white/50 flex justify-center p-10 m-5">
			&lt; insert some good words here &gt;
		</div>
		<button onclick="window.open('tel:+358925250113')" class="btn">⚠️ Immediate help ⚠️</button>
		<button class="btn">🌬️ Breathing exercises 🌬️</button>
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
