======
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

To compile app:

```
  cd ./graphql-app
  npm install
  npm run build
```

### Instaling CouchDB:

Firstly install required tools:

```
  sudo apt update
  sudo apt install -y curl apt-transport-https gnupg
```

Sign CouchDB's repository:

```
  curl https://couchdb.apache.org/repo/keys.asc | gpg --dearmor | sudo tee /usr/share/keyrings/couchdb-archive-keyring.gpg >/dev/null 2>&1
  source /etc/os-release
  echo "deb [signed-by=/usr/share/keyrings/couchdb-archive-keyring.gpg] https://apache.jfrog.io/artifactory/couchdb-deb/ ${VERSION_CODENAME} main" | sudo tee /etc/apt/sources.list.d/couchdb.list >/dev/null
  sudo apt update
```

Install it:

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

======
### Explore

Start app via `npm start` and browse http://localhost:4000/gpq

You can: //TODO

======
### Tools, approaches, packages used
// TODO
