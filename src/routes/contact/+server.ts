import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request }) => {
    const { name, contact, content } = await request.json();

    await fetch('https://api.funnyboyroks.com/site/contact', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({name, contact, content}),
    });

    return json('success');
}) satisfies RequestHandler;
