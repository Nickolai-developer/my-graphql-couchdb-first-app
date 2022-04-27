import nanoInit, { DocumentScope, RequestError, ServerScope } from "nano";
import fs from "fs";
import { AuthorData, BookData } from "../outerTypes";

const CONFIG_FILENAME = "./couchdb-auth.json";
const DEFAULT_CONFIG = {
  "couchdb-user": "admin",
  "couchdb-password": ""
};

interface ServerScopeEx extends ServerScope {
  use<T = AuthorData>(db: "authors"): DocumentScope<T>;
  use<T = BookData>(db: "books"): DocumentScope<T>;
}

async function initializeNano(): Promise<ServerScopeEx> {
  const config = fs.existsSync(CONFIG_FILENAME) ?
    JSON.parse(fs.readFileSync(CONFIG_FILENAME).toString("utf-8")) : DEFAULT_CONFIG;
  const pass = config["couchdb-password"];
  const scope = nanoInit(`http://${config["couchdb-user"]}${pass ? ":" + pass : ""}@localhost:5984`);
  fs.writeFileSync(CONFIG_FILENAME, JSON.stringify(config, null, 2)); // emit config
  // init db structure
  for (const dbname of ["authors", "books"]) {
    try {
      await scope.db.get(dbname);
    } catch (e: unknown) {
      if ((e as RequestError).statusCode === 404) {
        await scope.db.create(dbname);
      }
      else {
        throw e;
      }
    }
  }
  return scope;
}

const nano = initializeNano();

export default nano;
