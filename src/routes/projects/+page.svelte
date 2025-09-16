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
    {#if loading}
        <p>Loading Projects...</p>
    {:else if err}
        <p>An unexpected error occurred when loading projects.  Try again later.</p>
        <pre>{err}</pre>
    {:else}
        <div class="projects">
        {#each projects as project, i (i)}
            <div class="project">
                <ProjectCard {project} />
            </div>
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

    .project {
        max-width: 45%;
    }

    .projects {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
        /*margin: auto 0;*/
    }

</style>
