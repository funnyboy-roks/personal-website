<script lang="ts">
	import ProjectCard from "./ProjectCard.svelte";
	import type { PageProps } from './$types';

    const { data }: PageProps = $props();
    const { projects } = data;
</script>

<div class="flex flex-col gap-4 container">
    {#each projects as project, i (i)}
        <ProjectCard {project} />
    {/each}
</div>
