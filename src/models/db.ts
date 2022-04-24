/**
 * This file will be removed after migration on CouchDB
 */
import fs = require("fs");

if (!fs.existsSync("./db.json")) {
  fs.writeFileSync("./db.json", "{}");
}

const saveDb = () => {
  fs.writeFileSync("./db.json", JSON.stringify(_db));
};

let _db = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
let _rollback_copy;

class FakeDatabase {
  constructor() {
    !_db.authors && (_db.authors = []);
    !_db.books && (_db.books = []);
    _rollback_copy = JSON.parse(JSON.stringify(_db)); // deepcopied)
    console.log("fake db initialized");
  }

  get data(): { authors: any[], books: any[] } {
    return _db;
  }

  rollback() {
    _db = _rollback_copy;
  }

  save() {
    _rollback_copy = JSON.parse(JSON.stringify(_db));
    saveDb();
  }
}

export = new FakeDatabase();
