import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { WEBHOOK_URL } from '$env/static/private';

const escapeCode = (s: string): string => s.replaceAll("`", "`\u{200b}");

const send = async (name: string, contact: string, content: string) => {
    const msg = {
        username: 'Website Message',
        content: null,
        embeds: [{
            title: 'Contact Form',
            description: `From \`\`${escapeCode(name)}\`\`\nContact: \`\`${escapeCode(contact)}\`\`\n\`\`\`\n${escapeCode(content)}\n\`\`\``,
            color: 0x55ff77,
        }],
    };

    const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        body: JSON.stringify(msg),
        headers: {
            'content-type': 'application/json',
        },
    });

    if (!res.ok) {
        console.error('Error sending webhook: ' + await res.text());
        console.error('Status: ' + res.status);
        return false;
    }

    return true;
};

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const name = data.get('name') as string;
        const contact = data.get('contact') as string;
        const content = data.get('content') as string;

        if (!name || !contact || !content) {
            const missing = [];
            if (!name) missing.push('name');
            if (!contact) missing.push('contact');
            if (!content) missing.push('content');
            return fail(400, {
                name,
                contact,
                content,
                error: 'missing-fields',
                missingFields: missing,
            } as const);
        }

        // For some reason, so much spam sets their contact information as "traffic"?
        if (contact === 'traffic') {
            return fail(400, {
                name,
                contact,
                content,
                error: 'invalid-contact',
            } as const);
        }

        let success = false;
        try {
            success = await send(name, contact, content);
        } catch (e) {
            console.error('ERROR', e);
        }
        if (!success) {
            return fail(500, { error: 'internal' } as const);
        }

        return { error: null, success: true } as const;
    }
} satisfies Actions;
