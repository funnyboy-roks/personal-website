<script lang="ts">
	import type { PageProps } from './$types';
    import { PROJECTS } from '$lib/projects';

    let { data }: PageProps = $props();
    const { project, key } = $derived(data);

    const tabWidth = 4;
    const tab = '&nbsp;'.repeat(tabWidth);

    const formatList = (items: Array<string>): string => {
        let out = '';
        if (items.length) {
            out += '<br />';
            for (const item of items) {
                out += `${tab}${tab}${item},<br />`;
            }
            out += `${tab}`;
        }
        return out;
    };

    const formatEnum = (enumName: string, items: string[]): string => {
        return formatList(items.map(item => `<span class="bd">${enumName}</span><span class="bf">::</span>${item}`));
    }

    const formatLangs = (langs: string[]): string => {
        // @ts-ignore because langs is Language[] but formatEnum wants string[]
        return formatEnum('Language', langs);
    };

    const formatLinks = (links: string[]): string => {
        return formatEnum('Link', links.map(l => {
        let out = '<span class="bd">new</span>';
        out +=`(${renderString(l.name, false)}, ${renderString(l.dest, true)})`
        return out;
        }));
    };

    const formatTags = (tags: string[]) => {
        return formatList(tags.map(t => renderString(t, false)));
    };

    /**
     * A function which accurately calculates the amount of '#'s needed for a rust raw string to be valid and then applies the correct styling.
     *
     * Examples:
     *     renderString("hello \" world") -> r#"hello " world"#
     *     renderString("hello \"## world") -> r###"hello "## world"###
     *     renderString("hello \"####### world") -> r########"hello "######## world"#########
     *     renderString("hello world") -> "hello world"
     */
    const renderString = (s: string, link: boolean): string => {
        const mkln = (s: string) => `<a href="${s}" style="color: inherit; text-decoration-color: var(--base06);">${s}</a>`;
        let out = '<span class="bb">';
        if (/["\\]/.test(s)) {
            let hashCount = 1;
            let matches = s.match(/"#+/g);
            if (matches) {
                console.log(matches);
                hashCount = Math.max(...matches.map(s => s.length));
            }
            out += 'r' + '#'.repeat(hashCount);
            if (link) {
                out += `"${mkln(s)}"`;
            } else {
                out += `"${s}"`;
            }
            out += '#'.repeat(hashCount);
        } else {
            if (link) {
                out += `"${mkln(s)}"`;
            } else {
                out += `"${s}"`;
            }
        }
        out += '</span>'
        return out;
    }
</script>

<svelte:head>
    <title>funnyboy_roks | {project.title} </title>
</svelte:head>

<div class="w-[80vw] flex">
    <pre class="p-4 text-4xl text-left w-1/3 max-w-1/3 whitespace-normal mr-8 pr-8 flex flex-col justify-center">
    <span class="b9">// Other projects</span>
    <ul>
        {#each Object.keys(PROJECTS) as key, i (i)}
            <li>
                <a href="/projects/{key}">
                    projects[{@html renderString(key)}]
                </a>
            </li>
        {/each}
    </ul>
    </pre>
    <pre class="p-4 text-4xl text-left flex-grow max-w-2/3 text-wrap whitespace-normal">
        projects.<span class="bd">insert</span>({@html renderString(key)}, Project &lbrace;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;title: {@html renderString(project.title, false)},<br />
            &nbsp;&nbsp;&nbsp;&nbsp;description: {@html renderString(project.description, false)},<br />
            &nbsp;&nbsp;&nbsp;&nbsp;source: <span class="bb">"<a href="{project.source}">{project.source}</a>"</span>,<br />
            &nbsp;&nbsp;&nbsp;&nbsp;status: <span class="bd">ProjectStatus</span><span class="bf">::</span>{project.status},<br />
            &nbsp;&nbsp;&nbsp;&nbsp;languages: <span class="ba">&amp;</span>[{@html formatLangs(project.languages)}],<br />
            {#if project.links.length}
                &nbsp;&nbsp;&nbsp;&nbsp;links: <span class="ba">&amp;</span>[{@html formatLinks(project.links)}],<br />
            {/if}
            &nbsp;&nbsp;&nbsp;&nbsp;tags: <span class="ba">&amp;</span>[{@html formatTags(project.tags)}],<br />
        });
    </pre>
</div>

<style>
    a {
        color: inherit;
        text-decoration-color: var(--base06)
    }

    .link {
        color: unset;
        text-decoration: 2px dotted underline var(--base06);
        cursor: pointer;
    }

    .link:hover {
        text-decoration-style: solid;
    }
</style>
