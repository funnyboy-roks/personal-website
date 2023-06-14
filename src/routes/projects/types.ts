//export enum Language {
//    Rust,
//    Java,
//    JavaScript,
//    TypeScript,
//    Svelte,
//    Python,
//    HTML,
//    CSS,
//    Other,
//}

// Easier to use
export type Language = string;

export enum ProjectStatus {
    /// Project is complete
    Complete,
    /// Project is WIP
    WIP,
    /// Project will be continuiously updated
    NeverEnding,
    /// Project is no longer supported
    Unsupported,
    /// Project complete but still maintained
    Maintained,
    /// Project archived
    Archived,
}

export interface Link {
    name: string,
    dest: string,
}

export interface Project {
    title: string,
    description: string,
    languages: Language[],
    status: ProjectStatus,
    source: string,
    links: Link[],
    tags: string[],
}
