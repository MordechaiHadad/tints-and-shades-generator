<script lang="ts">
	import { ThemeHandler, type Palette } from '$lib';
	import ButtonsModal from '$lib/components/ButtonsModal.svelte';
	import ColorButton from '$lib/components/ColorButton.svelte';
	import ColorPickerModal from '$lib/components/ColorPickerModal.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { onMount } from 'svelte';
	import Values from 'values.js';

	let themeHandler: ThemeHandler;
	let isButtonModalShown = false;
	let darkThemeButton: HTMLButtonElement;
	let colorValueHex = '#ffffff';
	let levelsValue: number = 10;
	let colorName = 'White';
	let color = new Values(colorValueHex);
	let shades = color.shades(levelsValue);
	let tints = color.tints(levelsValue).reverse();
	let intialized = false;
	let isColorPickerOpen = false;

	$: {
		color = colorValueHex.length === 7 ? new Values(colorValueHex) : color;
		if (levelsValue > 0) {
			shades = color.shades(levelsValue);
			tints = color.tints(levelsValue).reverse();
		}

		if (intialized) {
			getColorName(color.hex).then((x) => {
				colorName = x.paletteTitle;
			});
		}
	}

	async function getColorName(value: string): Promise<Palette> {
		const apiUrl = `https://api.color.pizza/v1/?values=${value}&list=bestOf`;

		try {
			const response = await fetch(apiUrl);

			if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching data:', error);
			throw error;
		}
	}

	onMount(() => {
		const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
		darkThemeButton = document.getElementById('theme-button')! as HTMLButtonElement;
		themeHandler = new ThemeHandler(isDarkTheme, darkThemeButton);
		intialized = true;
	});
</script>

<div class="flex flex-col gap-6 px-4 py-4 text-neutral-900 dark:text-neutral-100 md:px-8">
	{#if isButtonModalShown}
		<ButtonsModal bind:isButtonModalShown {themeHandler}></ButtonsModal>
	{/if}
	{#if isColorPickerOpen}
		<ColorPickerModal {themeHandler} bind:value={colorValueHex} bind:isOpen={isColorPickerOpen}
		></ColorPickerModal>
	{/if}
	<Navbar {themeHandler} bind:isButtonModalShown></Navbar>
	<div class="flex items-center justify-center gap-4">
		<button
			class="ti ti-color-picker color-box rounded-md text-2xl {color.getBrightness() <= 50
				? 'text-neutral-300'
				: 'text-neutral-700'} h-full px-9 py-7 transition-all duration-200 ease-in-out"
			style="background-color: {color.hexString()};"
			title="Open color picker"
			on:click={() => {
				isColorPickerOpen = !isColorPickerOpen;
				console.log(isColorPickerOpen);
			}}
		/>

		<div class="flex w-min flex-col gap-3 text-neutral-900 dark:text-neutral-100">
			<p class="text-sm">{colorName}</p>
			<input
				class="w-full rounded-md border border-neutral-400 p-1 px-2 text-xl text-neutral-900"
				bind:value={colorValueHex}
				size="5"
				type="text"
				maxlength="7"
			/>
			<div class="flex" style:gap="1ch">
				<p class="font-semibold">Levels:</p>
				<input
					class="rounded-md border border-neutral-400 text-center font-normal text-neutral-900"
					style:width="3ch"
					size="1"
					maxlength="3"
					type="text"
					bind:value={levelsValue}
					on:input={(e) => (levelsValue = Number(e?.target?.value))}
				/>
			</div>
		</div>
	</div>
	<div class="grid grid-cols-3 justify-center gap-3 md:grid-cols-12">
		{#each tints as tint}
			<ColorButton color={tint} weight={tint.weight}></ColorButton>
		{/each}
		<ColorButton {color} weight={0}></ColorButton>
		{#each shades as shade, index}
			<ColorButton
				isLast={shades.length - index > 3 ? false : true}
				color={shade}
				weight={shade.weight}
			></ColorButton>
		{/each}
	</div>
</div>

<style>
	.color-box {
		box-shadow:
			1px 1px 4px 0px rgba(0, 0, 0, 0.1),
			5px 5px 7px 0px rgba(0, 0, 0, 0.09),
			11px 12px 10px 0px rgba(0, 0, 0, 0.05),
			19px 22px 12px 0px rgba(0, 0, 0, 0.01),
			30px 34px 13px 0px rgba(0, 0, 0, 0);
	}
</style>
