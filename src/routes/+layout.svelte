<script>
	import Header from './Header.svelte';
	import './styles.css';
	import './normalize.css';
</script>

<div class="app h-full overflow-auto flex flex-col sm:h-screen">
	<!-- <Header /> -->

	<main class="">
		<slot />
	</main>

	<footer class="h-full">
		<p>Made with love by InMind ©️ 2022</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
	}

	main {
		/* flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box; */
	}

	footer {
		display: flex;
		color: rgba(255, 255, 255, 0.7);
		flex-direction: column;
		justify-content: end;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
