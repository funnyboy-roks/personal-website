<script lang="ts">
	import { onMount } from "svelte";
	import ProjectCard from "./ProjectCard.svelte";
    import type { Project } from "./types";

    let loading = true;
    let err: any = undefined;

    let projects: Project[] = [];
    const loadProjects = async () => {
        try {
            let r = await fetch('/projects/api')
            projects = await r.json();
        } catch (e) {
            err = e;
        }
        loading = false;
    };

    onMount(loadProjects);
</script>

<div>
    <h2 style="text-decoration: underline 1px solid white">
        <span style="color: var(--base00)">0</span>
        <span style="color: var(--base01)">1</span>
        <span style="color: var(--base02)">2</span>
        <span style="color: var(--base03)">3</span>
        <span style="color: var(--base04)">4</span>
        <span style="color: var(--base05)">5</span>
        <span style="color: var(--base06)">6</span>
        <span style="color: var(--base07)">7</span>
        <span style="color: var(--base08)">8</span>
        <span style="color: var(--base09)">9</span>
        <span style="color: var(--base0A)">A</span>
        <span style="color: var(--base0B)">B</span>
        <span style="color: var(--base0C)">C</span>
        <span style="color: var(--base0D)">D</span>
        <span style="color: var(--base0E)">E</span>
        <span style="color: var(--base0F)">F</span>
    </h2>
    {#if loading}
        <p>Loading Projects...</p>
    {:else if err}
        <p>An unexpected error occurred when loading projects.  Try again later.</p>
        <pre>{err}</pre>
    {:else}
        <div class="projects">
        {#each projects as project, i (i)}
            <ProjectCard {project} />
        {:else}
            <p>Found no projects!</p>
        {/each}
        </div>
    {/if}

</div>

<style>
    pre {
        text-align: left;
        font-size: 2rem;
        display: inline-block;
        color: var(--text-colour);
        font-family: 'Anonymous Pro', monospace;
    }

    .projects {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        /*margin: auto 0;*/
    }

</style>
