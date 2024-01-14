<script lang="ts">
	import type { ThemeHandler } from '$lib';
	import Button from './Button.svelte';

	export let themeHandler: ThemeHandler;
	export let isButtonModalShown: boolean;
</script>

<div class="flex items-start justify-between text-neutral-900 dark:text-neutral-100">
	<div class="flex flex-col gap-1">
		<h1 class="text-2xl font-semibold md:text-4xl">S&T Generator</h1>
		<p class="text-xs md:text-base">Generate tints and shades for a provided color</p>
	</div>
	<Button
		icon="ti ti-dots-vertical"
		title="open menu"
		class="md:hidden"
		callback={() => {
			isButtonModalShown = !isButtonModalShown;
		}}
	></Button>
	<div class="hidden gap-3 border-neutral-300 pl-4 text-2xl dark:border-neutral-700 md:flex">
		<Button
			title="Go to github repository"
			callback={() => (window.location.href = 'https://github.com/MordechaiHadad/tints-and-shades-generator')}
			icon="ti ti-brand-github"
		></Button>
		<Button
			id="theme-button"
			callback={() => themeHandler.toggle()}
			title="Toggle between dark/light theme"
			icon="ti"
		></Button>
	</div>
</div>
