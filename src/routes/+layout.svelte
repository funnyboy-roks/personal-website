<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.png';
    import { page } from '$app/state';

	let { children } = $props();

    const pages = {
        'Home': '/',
        'Blog': 'https://blog.funnyboyroks.com',
        'Contact': '/contact',
        'Projects': '/projects',
    };

    const pagesCount = Object.keys(pages).length;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main>
    {#if page.route.id !== '/'}
    <nav>
        <span class="bf">pub enum</span> <span class="b8">Pages</span> &lbrace;
        {#each Object.entries(pages) as [name, path], i (i) }
            {#if page.route.id === path }
                <span class="b5">{name}</span>{#if i !== pagesCount - 1},&nbsp;{/if}
            {:else}
                <a href={path}>{name}</a>{#if i !== pagesCount - 1},&nbsp;{/if}
            {/if}
        {/each}
        &rbrace;
    </nav>
    {/if}
    <!-- <pre>{JSON.stringify($page)}</pre> -->
    {@render children?.()}
</main>

<style>
    nav {
        text-align: left;
        font-size: 2rem;
        display: inline-block;
        color: var(--text-colour);
        font-family: 'Anonymous Pro', monospace;
        position: absolute;
        right: 1rem;
        top: 1rem;
    }

    nav a {
        color: unset;
        text-decoration-color: var(--base06)
    }
</style>
