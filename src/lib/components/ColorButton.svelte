<script lang="ts">
	import Values from 'values.js';

	export let color: Values;
	export let weight: number;
</script>

<button
	class="color-item-hovered flex w-full flex-col gap-3 rounded-lg border border-neutral-300 p-4 text-xs {color.getBrightness() <=
	50
		? 'text-neutral-300'
		: 'text-neutral-700'}"
	style="background-color: {color.hexString()};"
    on:click={async () => await navigator.clipboard.writeText(color.hexString())}
	>{weight}
	<span class="text-base {color.getBrightness() <= 50 ? 'text-neutral-100' : 'text-neutral-900'}"
		>{color.hex}</span
	></button
>

<style>
	.color-item-hovered:hover {
		box-shadow:
			1px 1px 3px 0px rgba(0, 0, 0, 0.1),
			5px 2px 5px 0px rgba(0, 0, 0, 0.09),
			11px 5px 7px 0px rgba(0, 0, 0, 0.05),
			20px 10px 9px 0px rgba(0, 0, 0, 0.01),
			31px 15px 10px 0px rgba(0, 0, 0, 0);
	}
</style>
