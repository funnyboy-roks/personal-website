<script lang="ts">
import { onDestroy } from "svelte";

  export let words: string[];
  export let speed: number = 500;

  let value = '';

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

{ value }
