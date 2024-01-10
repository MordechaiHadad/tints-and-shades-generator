<script>
	import ColorButton from '$lib/components/ColorButton.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import namedColors from 'color-name-list';
	import Values from 'values.js';

	let colorValue = '#ffffff';
	let levelsValue = 10;
	let colorName = 'White';
	let color = new Values(colorValue);
	let shades = color.shades(levelsValue);
	let tints = color.tints(levelsValue).reverse();

	$: {
		shades = color.shades(levelsValue);
		tints = color.tints(levelsValue).reverse();
	}
</script>

<div class="flex flex-col gap-6 px-4 py-8">
	<Navbar></Navbar>
	<div class="flex items-center justify-center gap-4">
		<button
			class="material-symbols-outlined color-box rounded-md bg-white px-9 py-7 text-neutral-700"
		>
			colorize
		</button>
		<div class="flex flex-col gap-3 text-neutral-900">
			<p class="text-sm">{colorName}</p>
			<input
				class="w-min text-xl"
				bind:value={colorValue}
				size="3"
				type="text"
				maxlength="7"
				on:input={() =>
					(colorValue = namedColors.find((x) => x.hex === colorValue)?.name ?? colorName)}
				on:keydown={(e) => {
					if (e.key === 'Enter') {
						color = new Values(colorValue);
					}
				}}
			/>
			<p class="font-semibold">
				Levels: <input
					class="w-min text-center font-normal"
					size="1"
					maxlength="3"
					type="text"
					bind:value={levelsValue}
				/>
			</p>
		</div>
	</div>
	<div class="grid grid-cols-3 justify-center gap-3">
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
