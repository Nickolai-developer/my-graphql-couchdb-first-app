/**
 * These types're describing how documents are stored in db;
 * Have a db named "books", which contains document for each book;
 * field "authors" in each book contains info about author;
 * I decided to store id and name in author info (preserve name for search purposes maybe).
 * Another db - "authors";
 * Contains only author id and name
 */

/** */
export interface BookData {
    id: string;
    title: string;
    authors: AuthorData[];
}

export interface AuthorData {
    id: string;
    name: string;
}
