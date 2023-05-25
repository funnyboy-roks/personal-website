<script lang="ts">
    let message = {
        name: '',
        contact: '',
        content: '',
    };
    let missingFields: Set<string> = new Set();

    const submit = () => {
        //alert('This form is currently not working, please join my Discord or send me an email.');
        const missing = new Set<string>();
        if (message.name === '') {
            missing.add('name');
        }
        if (message.contact === '') {
            missing.add('contact');
        }
        if (message.content === '') {
            missing.add('content');
        }

        missingFields = missing;

        if (missingFields.size === 0) {
            // Good to send message
            fetch('/contact', {
                method: 'POST',
                body: JSON.stringify(message),
            }).then(() => console.log('sent', message));
        }
    };
</script>

<div>
    <h1>Contact</h1>

    <p class="lead">
        If you need help or have a suggestion for one of my plugins, websites, or tools,
        please create an issue on the correct GitHub repository, or join my
        <a href="https://api.funnyboyroks.com/discord">Discord</a> server.
    </p>

    <p class="lead">
        If you would like to contact me for any other reason, you are welcome
        to email me at <a href="mailto:funnyboyroks@gmail.com">funnyboyroks@gmail.com</a>,
        Alternatively, you can fill out the form below
        or join my <a href="https://api.funnyboyroks.com/discord">Discord</a> server.
    </p>

    <form on:submit|preventDefault={submit}>
        <center>
            <pre id="msg">
<!-- These lines be kinda long because <pre> is kinda stupid -->
<span class="bf">let</span> msg = Message &lbrace; {#if missingFields.has('name')}<br/>    <span class="b9 error">/// Required Field</span>{/if}
    name:    <span class="bb">"<input type="text" bind:value={message.name} placeholder="Enter name"/>"</span>,{#if missingFields.has('contact')}<br/>    <span class="b9 error">/// Required Field</span>{/if}
    contact: <span class="bb">"<input type="text" bind:value={message.contact} placeholder="Enter contact info"/>"</span>,{#if missingFields.has('content')}<br/>    <span class="b9 error">/// Required Field</span>{/if}
    content: <span class="bb">r#"
    <textarea cols="42" rows="4" bind:value={message.content}/>
    "#</span>,
&rbrace;;
msg.<span class="bd"><button id="submit" type="submit">send</button></span>()<span class="b9">?</span>; <span class="b4">// Click `send` to send message</span>
            </pre>
        </center>
    </form>
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
