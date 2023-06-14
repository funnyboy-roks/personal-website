import type { RequestHandler } from './$types';


export const GET = (async ({}) => {
    return fetch('https://api.funnyboyroks.com/site/projects');
}) satisfies RequestHandler;
