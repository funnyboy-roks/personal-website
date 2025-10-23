import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { PROJECTS } from '$lib/projects';

export const load: PageLoad = ({ params }) => {
    const project = PROJECTS[params.name as keyof typeof PROJECTS];

    if (project) {
        return { project, key: params.name };
    }

    error(404, 'Not found');
};
