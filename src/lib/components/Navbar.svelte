<script lang="ts">
	import { goto } from "$app/navigation";
	import type { ThemeHandler } from "$lib";
	import Button from "./Button.svelte";

	export let themeHandler: ThemeHandler;
	export let isButtonModalShown: boolean;

</script>
<div class="flex items-start justify-between text-neutral-900 dark:text-neutral-100">
	<div class="flex flex-col gap-1">
		<h1 class="text-2xl md:text-4xl font-semibold">S&T Generator</h1>
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
	<div class="gap-3 border-neutral-300 pl-4 dark:border-neutral-700 hidden md:flex text-2xl">
		<Button
			title="Go to github repository"
			callback={async () => await goto('https://github.com/MordechaiHadad/svelte-complete')}
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
