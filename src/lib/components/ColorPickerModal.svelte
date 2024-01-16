<script lang="ts">
	import type { ThemeHandler } from '$lib';
	import ColorPicker, { ChromeVariant } from 'svelte-awesome-color-picker';
	export let value: string;
	export let themeHandler: ThemeHandler;
	export let isOpen: boolean;
</script>

<div class="fixed left-0 top-0 z-50 flex h-full w-full justify-center">
	<!-- Modal overlay -->
	<button
		class="fixed h-full w-full"
		on:click={() => (isOpen = !isOpen)}
	/>

	<!-- Modal content -->
	<div class="relative top-10 md:right-32">
		<ColorPicker
			bind:hex={value}
			components={ChromeVariant}
			sliderDirection="horizontal"
			isDialog={false}
			--cp-bg-color={themeHandler.getisDark() ? '#404040' : '#d4d4d4'}
		/>
	</div>
</div>

<style>
	:global(.input-container) {
		background-color: white;
	}
</style>