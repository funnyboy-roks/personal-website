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
<button
class="{details ? 'open' : 'collapsed'}"
onclick={() => details = !details}
onkeypress={() => details = !details}>
<pre class="border-4 border-b4 hover:border-b6 p-4 rounded-xl text-left {details ? 'open' : 'collapsed'}"
     ><span class="bf">let</span> {rustify(project.title)} = Project &lbrace; <span class="b4">{#if details}
    // Click for fewer details{/if}</span>
    title: {@html renderString(project.title, false)},
    description: {@html renderString(project.description, false)},{#if !details}
    .. <span class="b4">// Click for more details</span>{:else}
    source: <span class="bb">"<a href="{project.source}">{project.source}</a>"</span>,
    status: <span class="bd">ProjectStatus</span><span class="bf">::</span>{project.status},
    languages: <span class="ba">&</span>[{@html formatLangs(project.languages)}],{#if project.links.length}
    links: <span class="ba">&</span>[{@html formatLinks(project.links)}],{/if}
    tags: <span class="ba">&</span>[{@html formatTags(project.tags)}],
{/if}
};
</pre>
</button>
</div>
<!--
<div class="border-4 border-b4 p-4 rounded-xl text-left">
<pre>
<span class="b9 prefix">/// {project.description}</span>
<span class="bf">fn</span> <span class="bd">{rustify(project.title)}</span>() &lbrace;
    <span class="bf">let</span> title = {@html renderString(project.title, false)};
&rbrace;
</pre>
</div> -->

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
        box-sizing: content-box;
    }

    pre {
        text-align: left;
        font-size: 1.5rem;
        display: inline-block;
        color: var(--text-colour);
        font-family: 'Anonymous Pro', monospace;
        white-space: pre-wrap;

        transition: 100ms ease-in-out border;
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
