import { AuthorData, BookData } from "../outerTypes";
import { NewBookInput } from "../schemas/Book.js";
import newUniqueID from "./UIDService.js";
import nano from "./NanoInitialize.js";
import { ListingInput, SearchInput } from "../schemas/UtilClasses";

type AuthorDocument = AuthorData & { _id: string, _rev:string };
type BookDocument = BookData & { _id: string, _rev:string };

export async function authorById(id: string): Promise<AuthorData> {
  const authors = (await nano).use("authors");
  const response = await authors.find({ selector: { id } });
  const document = response.docs[0];
  return document;
}

export async function bookById(id: string): Promise<BookData> {
  const books = (await nano).use("books");
  const response = await books.find({ selector:{ id } });
  const document = response.docs[0];
  return document;
}

async function authorByName(name: string): Promise<AuthorDocument> {
  const authors = (await nano).use("authors");
  const response = await authors.find({ selector: { name } });
  return response.docs[0];
}

export async function addBook({ title, authors }: NewBookInput): Promise<BookData> {
  const booksdb = (await nano).use("books");
  const authorsdb = (await nano).use("authors");
  const book: BookData = { title, authors: [], id: newUniqueID({ title }) };

  for (const providedAuthorName of authors) {
    const authorDocument = await authorByName(providedAuthorName);
    // pick author if exists or create new
    const author = authorDocument ? { id: authorDocument.id, name: authorDocument.name } :
      { id: newUniqueID({ name: providedAuthorName }), name: providedAuthorName };
    book.authors.push(author);
    // create new author
    !authorDocument && await authorsdb.insert(author);
  }
  await booksdb.insert(book);
  return book;
}

export async function booksByAuthor(authorId: string): Promise<BookData[]> {
  const books = (await nano).use("books");
  const response = await books.find({
    selector: {
      authors: {
        "$elemMatch": { // find books, which authors[] contains an object {id} equals authorId
          id: authorId
        }
      }
    }
  });
  return response.docs;
}

export async function getBooks({ count, skip, sort }: ListingInput): Promise<BookData[]> {
  const books = (await nano).use("books");
  const response = await books.find({
    selector: {
      id: {
        "$exists": true
      }
    },
    skip,
    limit: count,
    sort: [{ title: sort === "descending" ? "desc" : "asc" }]
  });
  return response.docs;
}

export async function searchBooks({ count, skip, sort, searchString }: SearchInput): Promise<BookData[]> {
  const books = (await nano).use("books");
  const response = await books.find({
    selector: {
      title: {
        "$regex": `(?i)${searchString}`
      }
    },
    limit: count,
    skip,
    sort: [{ title: sort === "descending" ? "desc" : "asc" }]
  });
  return response.docs;
}

export async function getAuthors({ count, skip, sort }: ListingInput): Promise<AuthorData[]> {
  const authors = (await nano).use("authors");
  const response = await authors.find({
    selector: {
      id: {
        "$exists": true
      }
    },
    skip,
    limit: count,
    sort: [{ name: sort === "descending" ? "desc" : "asc" }]
  });
  return response.docs;
}

export async function searchAuthors({ count, skip, sort, searchString }: SearchInput): Promise<AuthorData[]> {
  const authors = (await nano).use("authors");
  const response = await authors.find({
    selector: {
      name: {
        "$regex": `(?i)${searchString}`
      }
    },
    limit: count,
    skip,
    sort: [{ name: sort === "descending" ? "desc" : "asc" }]
  });
  return response.docs;
}
