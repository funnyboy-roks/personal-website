<script lang="ts">
    import type { Project, Language, Link } from "./types";

    export let project: Project;

    const rustify = (s: string): string => {
        return s.toLowerCase().replace(/[^a-z0-9_]+/gi, '_');
    };

    const tabWidth = 4;
    const tab = ' '.repeat(tabWidth);

    const formatList = (items: Array<string>): string => {
        let out = '';
        if (items.length) {
            out += '\n';
            for (const item of items) {
                out += `${tab}${tab}${item},\n`;
            }
            out += `${tab}`;
        }
        return out;
    };

    const formatEnum = (enumName: string, items: string[]): string => {
        return formatList(items.map(item => `<span class="bd">${enumName}</span><span class="bf">::</span>${item}`));
    }

    const formatLangs = (langs: Language[]): string => {
        // @ts-ignore because langs is Language[] but formatEnum wants string[]
        return formatEnum('Language', langs);
    };

    const formatLinks = (links: Link[]): string => {
        return formatEnum('Link', links.map(l => {
        let out = '<span class="bd">new</span>';
        out +=`(${renderString(l.name, false)}, ${renderString(l.dest, true)})`
        return out;
        }));
    };

    const formatTags = (tags: string[]) => {
        return formatList(tags.map(t => renderString(t, false)));
    };

    let details = false;

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
<div>
<pre class="{details ? 'open' : 'collapsed'}"><button
class="{details ? 'open' : 'collapsed'}"
on:click={() => details = !details}
on:keypress={() => details = !details}
     ><span class="bf">let</span> {rustify(project.title)} = Project &lbrace;
    <span class="b4">{#if details}// Click for fewer details{:else}// Click for more details{/if}</span>
    title: {@html renderString(project.title, false)},
    description: {@html renderString(project.description, false)},
    {#if !details}
    .. 
    {:else}
    source: <span class="bb">"<a href="{project.source}">{project.source}</a>"</span>,
    status: <span class="bd">ProjectStatus</span><span class="bf">::</span>{project.status},
    languages: <span class="ba">&</span>[{@html formatLangs(project.languages)}],{#if project.links.length}
    links: <span class="ba">&</span>[{@html formatLinks(project.links)}],{/if}
    tags: <span class="ba">&</span>[{@html formatTags(project.tags)}],
{/if}
};
</button>
</pre>
</div>
<style>
    button { /* Reset (ish) the button styles */
        border-radius: 0;
        border: none;
        outline: none;
        padding: none;
        font: inherit;
        color: inherit;
        background: none;
        justify-content: inherit;
        align-content: inherit;
        text-align: inherit;
        background-color: none;
        cursor: pointer;
        margin: none;
        width: 100%;
        height: 100%;
    }

    pre {
        text-align: left;
        font-size: 1.5rem;
        display: inline-block;
        color: var(--text-colour);
        font-family: 'Anonymous Pro', monospace;
        white-space: pre-wrap;
    }

    button {
        transition: 100ms ease-in-out transform, 100ms linear outline;
    }

    button.collapsed:hover {
        transform: scale(1.1);
        outline: 1px solid var(--base03);
    }

    .collapsed {
        width: 35vw;
    }

    .open {
        width: 100%;
    }

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
