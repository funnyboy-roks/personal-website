<script lang="ts">
    import { PROJECTS } from '$lib/projects';
</script>

<svelte:head>
    <title>funnyboy_roks | Projects</title>
</svelte:head>

<div>
    <pre class="text-left text-4xl text-wrap w-2/3 mx-auto whitespace-normal">
        <span class="bf">let</span> projects = <span class="b8">map!</span> &lbrace;
        {#each Object.entries(PROJECTS) as [key, project], i (i)}
            <div class="flex flex-col gap-2">
                <span>&nbsp;&nbsp;&nbsp;&nbsp;<a href="/projects/{key}"><span class="b4 ">// Learn more about {project.title}</span></a></span>
                <p class="flex flex-row">
                    <span class="bb">&nbsp;&nbsp;&nbsp;&nbsp;"{key}"</span><span>&nbsp;=&gt;&nbsp;</span><span><span class="bb">"{project.description}"</span>,</span>
                </p>
            </div>
        {/each}
        &rbrace;;
    </pre>
</div>
