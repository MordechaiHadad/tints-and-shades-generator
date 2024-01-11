<script lang="ts">
	import { ThemeHandler, type Palette } from '$lib';
	import ButtonsModal from '$lib/components/ButtonsModal.svelte';
	import ColorButton from '$lib/components/ColorButton.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { onMount } from 'svelte';
	import Values from 'values.js';

	let themeHandler: ThemeHandler;
	let isButtonModalShown = false;
	let darkThemeButton: HTMLButtonElement;
	let colorValue = '#ffffff';
	let levelsValue: number = 10;
	let colorName = 'White';
	let color = new Values(colorValue);
	let shades = color.shades(levelsValue);
	let tints = color.tints(levelsValue).reverse();
	let colorPicker: HTMLInputElement;
	let colorPickerValue = '';

	$: {
		shades = color.shades(levelsValue);
		tints = color.tints(levelsValue).reverse();
		getColorName(color.hex).then((x) => {
			colorName = x.paletteTitle;
		});
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
	});
</script>

<div class="flex flex-col gap-6 py-4 px-8 text-neutral-900 dark:text-neutral-100">
	{#if isButtonModalShown}
		<ButtonsModal bind:isButtonModalShown {themeHandler}></ButtonsModal>
	{/if}
	<Navbar {themeHandler} bind:isButtonModalShown></Navbar>
	<div class="flex items-center justify-center gap-4">
		<button
			class="ti ti-color-picker text-2xl color-box rounded-md {color.getBrightness() <= 50
				? 'text-neutral-300'
				: 'text-neutral-700'} h-full px-9 py-7 transition-all duration-200 ease-in-out"
			style="background-color: {color.hexString()};"
			title="Open color picker"
			on:click={() => colorPicker.click()}
		/>
		<input
			type="color"
			bind:this={colorPicker}
			class="hidden"
			bind:value={colorPickerValue}
			on:change={(e) => {
				const v = e?.target?.value;
				colorValue = v;
				color = new Values(v);
			}}
		/>
		<div class="flex w-min flex-col gap-3 text-neutral-900 dark:text-neutral-100">
			<p class="text-sm">{colorName}</p>
			<input
				class="w-min p-1 text-xl text-neutral-900"
				bind:value={colorValue}
				size="5"
				type="text"
				maxlength="7"
				on:input={(e) =>
					(color = e?.target?.value.length === 7 ? new Values(e?.target?.value) : color)}
			/>
			<p class="font-semibold">
				Levels: <input
					class="w-min text-center font-normal text-neutral-900"
					size="1"
					maxlength="3"
					type="text"
					bind:value={levelsValue}
					on:input={(e) => (levelsValue = Number(e?.target?.value))}
				/>
			</p>
		</div>
	</div>
	<div class="grid grid-cols-3 justify-center gap-3 md:grid-cols-6">
		{#each tints as tint}
			<ColorButton color={tint} weight={tint.weight}></ColorButton>
		{/each}
		<ColorButton {color} weight={0}></ColorButton>
		{#each shades as shade}
			<ColorButton color={shade} weight={shade.weight}></ColorButton>
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
