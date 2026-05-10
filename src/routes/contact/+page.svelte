<script lang="ts">
	import type { PageProps } from "./$types";
    const email = 'me@haydenpott.com';

    let { data, form }: PageProps = $props();

    let name = $derived(form?.name || '');
    let contact = $derived(form?.contact || '');
    let content = $derived(form?.content || '');

    const quote = (content: string | undefined): [string, string, number] => {
        if (!content) return ['r"', '"', 0];
        let matches = content.match(/"#*/g);
        if (!matches) return ['r"', '"', 0];
        let len = matches.map(m => m.length)
            .reduce((a, b) => Math.max(a, b), 1);
        let hashes = '#'.repeat(len);
        return [`r${hashes}"`, `"${hashes}`, len];
    };

    let quotes = $derived.by(() => {
        return {
            name: quote(name),
            contact: quote(contact),
            content: quote(content),
        };
    });

    let spaces = $derived.by(() => {
        const name_len = quote(name)[2];
        const contact_len = quote(contact)[2];
        const content_len = quote(content)[2];
        const max_len = Math.max(name_len, contact_len, content_len);

        const nbsp = '\u00a0';
        return {
            name: nbsp.repeat(max_len - name_len),
            contact: nbsp.repeat(max_len - contact_len),
            content: nbsp.repeat(max_len - content_len),
        };
    });

</script>

<div class="flex flex-col gap-4 container">
    <h1>Contact</h1>

    <p class="lead">
        If you need help or have a suggestion for one of my plugins, websites, or tools,
        please create an issue on the correct GitHub repository, or join my
        <a href="/discord">Discord server</a>.
    </p>

    <p class="lead">
        If you would like to contact me for any other reason, you are welcome
        to email me at <a href="mailto:{email}">{email}</a>,
    </p>

    {#if form?.success}
        <p class="py-2 mt-8 border-4 rounded-sm border-b4 mx-16 pl-2 lead">
            Message sent! <br />
            I'll get back to you as soon as I can.
        </p>
    {:else if form?.error === 'internal'}
        <p class="py-2 mt-8 border-4 rounded-sm border-b4 mx-16 pl-2 lead">
            There was an error sending the message.  
            Feel free to send me an <a href="mailto:{email}">email</a> or join my <a href="/discord">Discord server</a>.
        </p>
    {:else}
    <form method="POST">
        <center>
            <pre id="msg" class="whitespace-normal">
                <span class="bf">let</span> msg = Message &lbrace; <br />
                {#if form?.error === 'missing-fields' && form.missingFields.includes('name')}
                    &nbsp;&nbsp;&nbsp;&nbsp;<span class="b8 error ">/// Required Field</span> <br />
                {/if}
                &nbsp;&nbsp;&nbsp;&nbsp;name:&nbsp;&nbsp;&nbsp;&nbsp;{spaces.name}<span class="bb">{quotes.name[0]}</span
                    ><input type="text" autocomplete="name" class="bb" name="name" bind:value={name} placeholder="Enter name"
                    /><span class="bb">{quotes.name[1]}</span>, <br />
                {#if form?.error === 'missing-fields' && form.missingFields.includes('contact')}
                    &nbsp;&nbsp;&nbsp;&nbsp;<span class="b8 error">/// Required Field</span> <br />
                {/if}
                {#if form?.error === 'invalid-contact'}
                    &nbsp;&nbsp;&nbsp;&nbsp;<span class="b8 error ">/// Contact may not be '{form.contact}'.</span> <br />
                {/if}
                &nbsp;&nbsp;&nbsp;&nbsp;contact: {spaces.contact}<span class="bb">{quotes.contact[0]}</span
                    ><input type="text" autocomplete="email impp" class="bb" name="contact" bind:value={contact} placeholder="Enter contact info"
                    /><span class="bb">{quotes.contact[1]}</span>, <br />
                {#if form?.error === 'missing-fields' && form.missingFields.includes('content')}
                    &nbsp;&nbsp;&nbsp;&nbsp;<span class="b8 error">/// Required Field</span> <br />
                {/if}
                &nbsp;&nbsp;&nbsp;&nbsp;content: {spaces.content}<span class="bb">{quotes.content[0]}</span> <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<textarea cols="42" rows="4" name="content" bind:value={content}></textarea> <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span class="bb">{quotes.content[1]}</span>, <br />
                    &rbrace;;<br />
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
