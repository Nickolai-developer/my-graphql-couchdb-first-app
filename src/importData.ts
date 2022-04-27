import csv from "csv-parser";
import fs from "fs";
import nano from "./models/NanoInitialize.js";
import newUniqueID from "./models/UIDService.js";
import { AuthorData, BookData } from "./outerTypes.js";
import { NewBookInput } from "./schemas/Book";

const CSV_DATA_FILENAME = "./data-example.csv";

async function importData() {
  const rawBooks: NewBookInput[] = [];
  const authors = (await nano).use("authors");
  const books = (await nano).use("books");
  fs.createReadStream(CSV_DATA_FILENAME)
    .pipe(csv({ separator: ";" }))
    .on("data", data => {
      rawBooks.push({
        title: data.book,
        authors: data.authors.split(",")
      });
    })
    .on("end", () => {
      const authorsDocs: AuthorData[] = [];
      const booksDocs: BookData[] = [];
      for (const rawBook of rawBooks) {
        const book: BookData = {
          id: newUniqueID({ title: rawBook.title }) ,
          title: rawBook.title,
          authors: []
        };
        for (const providedAuthor of rawBook.authors) {
          let author = authorsDocs.find(a => a.name === providedAuthor);
          if (!author) {
            author = { id: newUniqueID({ name: providedAuthor }), name: providedAuthor };
            authorsDocs.push(author);
          }
          book.authors.push(author);
        }
        booksDocs.push(book);
      }
      authors.bulk({ docs: authorsDocs });
      books.bulk({ docs: booksDocs });
    });
}

importData();
