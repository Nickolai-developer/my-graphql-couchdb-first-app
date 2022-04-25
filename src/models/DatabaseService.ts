import { AuthorData, BookData } from "../outerTypes.js";
import { NewBookInput } from "../schemas/Book.js";
import db from "./db.js";
import newUniqueID from "./UIDService.js";


export function authorById(id: string): AuthorData {
  for(const author of db.data.authors) {
    if (author.id === id) {
      return author as AuthorData;
    }
  }
  return null as any;
}

export function bookById(id: string): BookData {
  const book = db.data.books.find(book => book.id === id) as BookData;
  return book;
}

export function addBook({ title, authors }: NewBookInput): BookData {
  const book: BookData = { title, authors: [] as any, id: null as any };
  book.id = newUniqueID(book);
  try {
    for (const providedAuthor of authors) { // add to each author
      let author = db.data.authors.find((a) => a.name === providedAuthor);
      if (!author) {
        author = { id:  newUniqueID({ name: providedAuthor }), name: providedAuthor };
        db.data.authors.push(author);
      }
      !author.books && (author.books = []);
      author.books.push({ id: book.id, title: book.title });
      book.authors.push({ id: author.id, name: author.name });
    }
    db.data.books.push(book);
  } catch(e) {
    db.rollback();
    throw e;
  }
  db.save();
  return book;
}

export function booksByAuthor(authorId: string): BookData[] {
  return db.data.books.filter(book => book.authors.some(au => au.id === authorId));
}
