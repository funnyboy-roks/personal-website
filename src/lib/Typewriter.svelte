<script lang="ts">
	import { browser } from '$app/environment';
    import { onDestroy } from 'svelte';

    const { words, speed = 500 }: { words: string[], speed: number } = $props();

	let value = $state('');

	let index = 0;
	let clearing = false;
	let selectedWord = words[index];
	let pause = 0;
	let interval = setInterval(() => {
		if (pause) return --pause;
		if (!clearing) {
			if (!selectedWord || !selectedWord[0]) {
				if (!pause) pause = 5;
				clearing = true;
			}
			value += selectedWord[0] ?? '';
			selectedWord = selectedWord.substring(1);
		} else {
			value = value.substring(0, value.length - 1);
			if (value === '') {
				index += 1;
				index %= words.length;
				selectedWord = words[index];
				clearing = false;
			}
		}
	}, speed);

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

{#if browser}
{value}
{:else}
{words[0]}
{/if}
