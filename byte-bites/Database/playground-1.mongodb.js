/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'admin';
const collection = 'ACCOUNTS';

// The current database to use.
use(database);

// Create a new collection.
db.createCollection(collection);

// The prototype form to create a collection:
db.createCollection( {account},
  {

  }
)

// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/
