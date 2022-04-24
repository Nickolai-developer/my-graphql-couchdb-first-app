
export interface BookData {
    id: string;
    title: string;
    authors: AuthorData[];
}

export interface AuthorData {
    id: string;
    name: string;
}
