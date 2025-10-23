export interface Link {
    name: string,
    dest: string,
}

export interface Project {
    title: string,
    description: string,
    languages: string[],
    status: 'Complete' | 'WIP' | 'Active' | 'Maintained',
    source: string,
    links: Link[],
    tags: string[],
}

export const PROJECTS: Record<string, Project> = {
    'stark': {
        title: 'stark',
        description: 'A strictly-typed stack-based compiled programming language',
        languages: ['Rust'],
        status: 'Active',
        source: 'https://github.com/funnyboy-roks/stark',
        links: [],
        tags: ['FOSS', 'programming-language'],
    },
    'basalt': {
        title: 'Basalt',
        description: 'A free and open source suite of programs for creating, hosting, and participating in local programming competitions.',
        languages: ['Rust', 'TypeScript'],
        status: 'Active',
        source: 'https://github.com/basalt-rs',
        links: [
            {
                name: 'Website',
                dest: 'https://basalt.rs',
            },
        ],
        tags: ['FOSS', 'programming-competition'],
    },
    'erudite': {
        title: 'erudite',
        description: 'A fully-asynchronous test runner for running suites of tests in parallel',
        languages: ['Rust'],
        status: 'Maintained',
        source: 'https://github.com/basalt-rs/erudite',
        links: [
            {
                name: 'crates.io',
                dest: 'https://crates.io/crates/jacc',
            },
        ],
        tags: ['async', 'tokio', 'concurrency'],
    },
    'jacc': {
        title: 'jacc',
        description: 'Just Another CLI Calculator -- a maths parser and evaluator for the CLI with many built-in functions',
        languages: ['Rust'],
        status: 'Maintained',
        source: 'https://github.com/funnyboy-roks/jacc',
        links: [
            {
                name: 'crates.io',
                dest: 'https://crates.io/crates/jacc',
            },
        ],
        tags: ['cli', 'maths', 'parser'],
    },
    'blog': {
        title: 'Blog',
        description: 'Simple blog that I use to share some random things',
        languages: [
            'Rust',
        ],
        status: 'Maintained',
        source: 'https://github.com/funnyboy-roks/blog',
        links: [
            {
                name: 'Live',
                dest: 'https://blog.funnyboyroks.com',
            },
        ],
        tags: ['web', 'static site']
    },
};
