<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { gameState } from '$lib/state.svelte';
	import { browser } from '$app/environment';

	if (browser) {
		const stored = localStorage.getItem('unicorn-academy-state');
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				if (parsed.unicorns) gameState.unicorns = parsed.unicorns;
				if (parsed.girls) gameState.girls = parsed.girls;
			} catch (e) {}
		}
	}

	$effect(() => {
		if (browser) {
			localStorage.setItem('unicorn-academy-state', JSON.stringify({
				unicorns: gameState.unicorns,
				girls: gameState.girls
			}));
		}
	});

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
