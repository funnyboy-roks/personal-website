import type { PageServerLoad } from './$types';
import type { Project } from './types';

export const load: PageServerLoad = async () => {
    const projects: Project[] = await (await fetch('https://api.funnyboyroks.com/site/projects')).json();
	return { projects };
};
