<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Milan Rother | Simulation & Scientific Computing</title>
</svelte:head>

{@render children()}
