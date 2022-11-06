<script>
	import Header from './Header.svelte';
	import './styles.css';
	import './normalize.css';
	import { page } from '$app/stores';
</script>

<div class="app h-full sm:h-screen">
	<!-- <Header /> -->

	<main class="">
		<slot />
	</main>

	<footer class="h-full">
		<p>Made with love by InMind ©️ 2022</p>
		<a class="contents " href={$page.url.toString().includes('about') ? '/' : '/about'}>
			<img
				style="filter: invert(1);"
				class="absolute right-3 opacity-80 w-10 h-10"
				src="/back-icon.svg"
			/></a
		>
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
