<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p class="footer-text">Chef Your Way</p>
		<p> © Copyright 2023</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 20px; 
		background-color: lightblue; 
	}

	.footer-text {
		font-weight: bold;
		font-size: 16px; 
		color: #333; 
	}

	@media (min-width: 480px) {
		footer {
			padding: 20px 0; 
		}
	}
</style>
