<script lang="ts">
	import { browser } from "$app/environment";
	import type { PageProps } from "./$types";
    const email = 'me@haydenpott.com';

    let { data, form }: PageProps = $props();
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
                &nbsp;&nbsp;&nbsp;&nbsp;name:&nbsp;&nbsp;&nbsp;&nbsp;
                    <span class="bb">"</span
                    ><input type="text" class="bb" name="name" value={form?.name || ''} placeholder="Enter name"
                    /><span class="bb">"</span>, <br />
                {#if form?.error === 'missing-fields' && form.missingFields.includes('contact')}
                    &nbsp;&nbsp;&nbsp;&nbsp;<span class="b8 error">/// Required Field</span> <br />
                {/if}
                &nbsp;&nbsp;&nbsp;&nbsp;contact:&nbsp;
                    <span class="bb">"</span
                    ><input type="text" class="bb" name="contact" value={form?.contact || ''} placeholder="Enter contact info"
                    /><span class="bb">"</span>, <br />
                {#if form?.error === 'missing-fields' && form.missingFields.includes('content')}
                    &nbsp;&nbsp;&nbsp;&nbsp;<span class="b8 error">/// Required Field</span> <br />
                {/if}
                &nbsp;&nbsp;&nbsp;&nbsp;content: <span class="bb">r#"</span> <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<textarea cols="42" rows="4" name="content" value={form?.content || ''}></textarea> <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span class="bb">"#</span>, <br />
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
