<script lang="ts">
	import { browser } from "$app/environment";
	import { SvelteSet } from "svelte/reactivity";
    const email = 'me@haydenpott.com';

    let message = $state({
        name: '',
        contact: '',
        content: '',
    });
    let missingFields = new SvelteSet<keyof typeof message>();

    const submit = (event: SubmitEvent) => {
        event.preventDefault();
        missingFields.clear();
        if (message.name    === '') missingFields.add('name');
        if (message.contact === '') missingFields.add('contact');
        if (message.content === '') missingFields.add('content');

        if (missingFields.size === 0) {
            // Good to send message
            fetch('/contact', {
                method: 'POST',
                body: JSON.stringify(message),
            }).then(() => console.log('sent', message));
        }
    };

</script>

<div class="flex flex-col gap-4 container">
    <h1>Contact</h1>

    <p class="lead">
        If you need help or have a suggestion for one of my plugins, websites, or tools,
        please create an issue on the correct GitHub repository, or join my
        <a href="https://api.funnyboyroks.com/discord">Discord server</a>.
    </p>

    <p class="lead">
        If you would like to contact me for any other reason, you are welcome
        to email me at <a href="mailto:{email}">{email}</a>,
    </p>

    <noscript>
        <p class="py-2 mt-8 border-4 rounded-sm border-b4 mx-16 pl-2 lead">
            JavaScript must be enabled to use the contact form.
            Feel free to send me an <a href="mailto:{email}">email</a> or join my <a href="https://api.funnyboyroks.com/discord">Discord server</a>.
        </p>
    </noscript>

    {#if browser} <!-- whether js is enabled -->
    <form onsubmit={submit}>
        <center>
            <pre id="msg"><!-- These lines be kinda long because <pre> is kinda stupid --><span class="bf">let</span> msg = Message &lbrace; {#if missingFields.has('name')}
    <span class="b9 error">/// Required Field</span>{/if}
    name:    <span class="bb">"</span><input type="text" class="bb" bind:value={message.name} placeholder="Enter name"/><span class="bb">"</span>,{#if missingFields.has('contact')}
    <span class="b9 error">/// Required Field</span>{/if}
    contact: <span class="bb">"</span><input type="text" class="bb" bind:value={message.contact} placeholder="Enter contact info"/><span class="bb">"</span>,{#if missingFields.has('content')}
    <span class="b9 error">/// Required Field</span>{/if}
    content: <span class="bb">r#"</span>
    <textarea cols="42" rows="4" bind:value={message.content}></textarea>
    <span class="bb">"#</span>,
&rbrace;;
msg.<span class="bd"><button id="submit" type="submit">send</button></span>()<span class="b9">?</span>; <span class="b4">// Click `send` to send message</span>
            </pre>
        </center>
    </form>
    {/if}
</div>

<style>
    #msg {
        text-align: left;
        font-size: 2rem;
        display: inline-block;
        color: var(--text-colour);
        font-family: 'Anonymous Pro', monospace;
    }

    #msg input, #msg textarea {
        color: inherit;
        font-size: inherit;
        background: none;
        outline: none;
        border: none;
        font-family: inherit;

        border-radius: 5px 5px 0 0;
        background: rgba(255, 255, 255, .02);
        transition: background 200ms ease-in-out;
    }

    #msg input {
        border-bottom: 3px dotted;
        transition: border-color 200ms ease-in-out; 
    }

    #msg input:focus {
        border-bottom-color: color-mix(in srgb, var(--base0B), transparent 66%);
        background: rgba(255, 255, 255, .01);
    }

    #msg textarea {
        font-size: 1.5rem;
        border-radius: 5px;
    }

    #msg textarea:focus {
        background: rgba(255, 255, 255, .01);
    }

    #submit {
        background: inherit;
        color: inherit;
        font: inherit;
        padding: inherit;
        margin: inherit;
        outline: inherit;
        border: inherit;


        text-decoration: 2px dotted underline;
    }

    #submit:hover {
        text-decoration: 2px solid underline;
    }
</style>
