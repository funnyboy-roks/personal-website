<script lang="ts">
    import Typewriter from '$lib/Typewriter.svelte';

    const names = ['funnyboy_roks', 'Hayden Pott', 'Funny', 'Hayden'];

    const langChoices = ['rust', 'java', 'javascript'];
    const lang = langChoices[Math.floor(Math.random() * langChoices.length)];
</script>

<svelte:head>
    <title>funnyboy_roks</title>
</svelte:head>

<div>

    <h1 class="text-field"><Typewriter words={names} speed={150} /></h1>
    <!--
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
    -->

    <p class="lead">
        Hello! I'm Hayden Pott, a computer science student at Louisiana Tech University.
        I have been proramming for about 5 years in many different languages,
        including Rust, Java, JavaScript/TypeScript, Python, and much more!
    </p>

    <center>
        <pre id="nav">
<span class="bf">pub enum</span> <span class="b8">Pages</span> &lbrace;
    <span class="b5">Home</span>,
    <a href="https://blog.funnyboyroks.com">Blog</a>,
    <a href="/contact">Contact</a>,
    <a href="/projects">Projects</a>,
&rbrace;
        </pre>
    </center>
</div>

<style>
    #nav {
        text-align: left;
        font-size: 3rem;
        display: inline-block;
        color: var(--text-colour);
        font-family: 'Anonymous Pro', monospace;
    }

    #nav a {
        color: unset;
        text-decoration-color: var(--base06)
    }

    .text-field::after {
        content: '_';
        animation: 300ms infinite blink alternate;
    }

    @keyframes blink {
        0% {
            opacity: 0;
        }

        50% {
            opacity: 0;
        }
    }
</style>
