import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (() => {
    throw redirect(307, 'https://api.fbr.dev/resume.pdf');
}) satisfies LayoutServerLoad;
