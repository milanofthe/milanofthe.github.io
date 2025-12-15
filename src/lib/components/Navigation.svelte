<script lang="ts">
	import { onMount } from 'svelte';

	let scrolled = $state(false);
	let mobileMenuOpen = $state(false);

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 50;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function closeMenu() {
		mobileMenuOpen = false;
	}

	const navLinks = [
		{ href: '#services', label: 'Services' },
		{ href: '#pathsim', label: 'PathSim' },
		{ href: '#pysimhub', label: 'PySimHub' },
		{ href: '#about', label: 'About' },
		{ href: '#contact', label: 'Contact' }
	];
</script>

<nav
	class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrolled ? 'bg-charcoal/90 backdrop-blur-md border-b border-cream/5' : ''}"
>
	<div class="max-w-6xl mx-auto px-6 py-4">
		<div class="flex items-center justify-between">
			<!-- Name -->
			<a href="/" class="font-display font-semibold text-cream hover:text-teal transition-colors">
				Milan Rother
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center gap-8">
				{#each navLinks as link}
					<a
						href={link.href}
						class="font-body text-sm transition-colors duration-200 {link.href === '#contact' ? 'text-teal hover:text-teal-light font-medium' : 'text-cream/70 hover:text-teal'}"
					>
						{link.label}
					</a>
				{/each}
			</div>

			<!-- Mobile Menu Button -->
			<button
				class="md:hidden p-2 text-cream/70 hover:text-teal transition-colors"
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				aria-label="Toggle menu"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{#if mobileMenuOpen}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					{:else}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					{/if}
				</svg>
			</button>
		</div>

		<!-- Mobile Menu -->
		{#if mobileMenuOpen}
			<div class="md:hidden pt-4 pb-2 border-t border-cream/10 mt-4">
				<div class="flex flex-col gap-4">
					{#each navLinks as link}
						<a
							href={link.href}
							class="font-body transition-colors {link.href === '#contact' ? 'text-teal font-medium' : 'text-cream/70 hover:text-teal'}"
							onclick={closeMenu}
						>
							{link.label}
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</nav>
