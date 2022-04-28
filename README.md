### How to
Firstly, install required tools:

```
  sudo apt update
  sudo apt install -y git npm nodejs
```

Clone repo by

```
  git clone https://github.com/Nickolai-dev/my-graphql-couchdb-first-app.git graphql-app
```

And compile app:

```
  cd ./graphql-app
  npm install
  npm run build
```

### Instaling CouchDB:

Install required tools:

```
  sudo apt update
  sudo apt install -y curl apt-transport-https gnupg
```

Sign CouchDB's repository pubkeys:

```
  curl https://couchdb.apache.org/repo/keys.asc | gpg --dearmor | sudo tee /usr/share/keyrings/couchdb-archive-keyring.gpg >/dev/null 2>&1
  source /etc/os-release
  echo "deb [signed-by=/usr/share/keyrings/couchdb-archive-keyring.gpg] https://apache.jfrog.io/artifactory/couchdb-deb/ ${VERSION_CODENAME} main" | sudo tee /etc/apt/sources.list.d/couchdb.list >/dev/null
  sudo apt update
```

Install CouchDB:

```
  sudo apt install -y couchdb
```


If you want to [check pubkeys](https://docs.couchdb.org/en/stable/install/unix.html#gpg-keys-used-for-signing-the-couchdb-repositories),
or need more info, use [CouchDB documentation](https://docs.couchdb.org/en/stable/install/unix.html)


If you got a prompt to choose configuration of database you want to install, pick standalone version.

If installer stands for using a clusterization cookie, enter anything.

If you need admin password, enter your password.
If you specified a password and/or created and want to use a different database user,
you need then create a json file in project root directory named couchdb-auth.json with the following content:
```
{
  "couchdb-user": "<username>",
  "couchdb-password": "<password>"
}
```
Set permissions on this file if you need.


When you're performed these steps, CouchDB is already running on your machine. You can check it:
```
  curl -X GET http://<your_user_or_admin><:user_or_admin_password_if_set>@127.0.0.1:5984/_all_dbs
```
You will get initial list of databases:
```
  [
    "_replicator",
    "_users"
  ]
```
In case this returns an empty array for you, it means you haven't finished installation correctly. 

---
### Initialize db

You need to import example data to database from csv file. To acquire this, just run script:
```
  npm run import
```
Example data stored in a file "data-example.csv" in a root directory.

---
### Explore

Start app via `npm start` and browse http://<your_host>:4000/gpq. You will see GraphiQL panel.

You can:
+ Add new books

```
  mutation {
    addBook(newBookInput: {
      title: "Sonnets",
      authors: ["W. Shakespeare"]
    })
  }
```

+ Select single books and authors by id

```
  {
    bookById(id: "15aea5baaa12731bc76e3680ba687b9964b841cae829966bedf7383347c1a250_book") {
      title
    }
  }
```

+ Extract books or authors in lists (pagination and sort options are provided)
```
  {
    getBooks(listingInput: {
      count: 40
      skip: 20
      sort: "descending"
    }) {
      title
      authors {
        name
      }
    }
  }
```

+ Search books or authors in lists. Pagination and sorting works too
```
{
  searchBooks(searchInput: {
    searchString: "The"
    count: 10
    skip: 1
    sort:"descending"
  }) {
    title
    authors {
      name
    }
  }
}
```

+ Recursively select books, then authors of books, then books, written by these authors. Unlimited levels of nesting

```
  {
  bookById(id:"15aea5baaa12731bc76e3680ba687b9964b841cae829966bedf7383347c1a250_book") {
    title
    authors {
      name
      books{
        title
      }
    }
  }
}
```

---
### Approaches used

Code written in typescript according to es6 for LTS node.js v12.22. Information about packages used available in package.json.

The project structure divided by single responsibility principle in some sort of MVC.

We have a "schemas" which are represents how our data are available via api;

A "models" layer, responsible to utilize database communication;

And "controllers" - a thin layer, which only objective is to properly connect them both.

---
### Tools, packages

For cleaner, less repeatable code was used type-graphql framework;

For easier database communication was used apache/nano-couchdb interlayer;
