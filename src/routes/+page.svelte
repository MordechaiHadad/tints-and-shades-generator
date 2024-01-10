<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import namedColors from 'color-name-list';

	let colorValue = '#ffffff';
	let levelsValue = 10;
	let colorName = 'White';
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
	<div class="flex flex-wrap justify-center gap-3">
		<button
			class="color-item-hovered flex flex-col gap-3 rounded-lg border border-neutral-300 bg-white p-4 text-xs text-neutral-700"
			>100 <span class=" text-base text-neutral-900">#FFFFFF</span></button
		>
		<button
			class="color-item-hovered flex flex-col gap-3 rounded-lg border border-neutral-300 bg-white p-4 text-xs text-neutral-700"
			>100 <span class=" text-base text-neutral-900">#FFFFFF</span></button
		>
		<button
			class="color-item-hovered flex flex-col gap-3 rounded-lg border border-neutral-300 bg-white p-4 text-xs text-neutral-700"
			>100 <span class=" text-base text-neutral-900">#FFFFFF</span></button
		>
		<button
			class="color-item-hovered flex flex-col gap-3 rounded-lg border border-neutral-300 bg-white p-4 text-xs text-neutral-700"
			>100 <span class=" text-base text-neutral-900">#FFFFFF</span></button
		>
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
	.color-item-hovered:hover {
		box-shadow:
			1px 1px 3px 0px rgba(0, 0, 0, 0.1),
			5px 2px 5px 0px rgba(0, 0, 0, 0.09),
			11px 5px 7px 0px rgba(0, 0, 0, 0.05),
			20px 10px 9px 0px rgba(0, 0, 0, 0.01),
			31px 15px 10px 0px rgba(0, 0, 0, 0);
	}
</style>
