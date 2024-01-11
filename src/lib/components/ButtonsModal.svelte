<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Button from './Button.svelte';
	import { fade } from 'svelte/transition';
	import type { ThemeHandler } from '$lib';

	export let isButtonModalShown: boolean;
	export let themeHandler: ThemeHandler;
	let darkThemeButtonSpan: HTMLSpanElement;

	const toggleTheme = () => {
		themeHandler.toggle();
		darkThemeButtonSpan.classList.remove(themeHandler.getisDark() ? 'ti-moon' : 'ti-sun');
		darkThemeButtonSpan.classList.add(themeHandler.getisDark() ? 'ti-sun' : 'ti-moon');
	};

	onMount(() => {
		console.log(themeHandler);
		darkThemeButtonSpan.classList.add(themeHandler.getisDark() ? 'ti-sun' : 'ti-moon');
	});
</script>

<div class="fixed left-0 top-0 z-50 flex h-full w-full justify-center backdrop-blur-[2px] md:hidden">
	<!-- Modal overlay -->
	<button
		class="fixed h-full w-full bg-neutral-200 opacity-50 dark:bg-neutral-800"
		on:click={() => (isButtonModalShown = !isButtonModalShown)}
	/>

	<!-- Modal content -->
	<div
		class="absolute w-max right-4 top-16 flex flex-col gap-3 rounded-lg bg-neutral-100 p-6 shadow-lg dark:bg-neutral-900"
		transition:fade={{ duration: 200 }}
	>
		<Button
			title="Go to github repository"
			callback={() => goto('https://github.com/MordechaiHadad/svelte-complete')}
			class="gap-2 px-3 text-sm"
			><span class="ti ti-brand-github text-2xl" />Go to Github page</Button
		>
		<Button
			id="modal-theme-button"
			callback={toggleTheme}
			title="Toggle between dark/light theme"
			class="gap-2 px-3 text-sm"
			><span bind:this={darkThemeButtonSpan} class="ti text-2xl" />Toggle light Theme</Button
		>
	</div>
</div>
