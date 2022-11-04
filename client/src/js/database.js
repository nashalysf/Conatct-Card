import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

export const initDb = async () =>
  openDB('contact_db', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('contact_db')) {
        console.log('contacts database already exists');
        return;
      }
      db.createObjectStore('contact_db', { keyPath: 'id', autoIncrement: true });
      console.log('contact database created');
    },
  });

export const getDb = async () => {
  console.log('GET from the database');

    //Create a connection to the IndexedDB database and the version to use.
    const contactDb = await openDB('contact_db', 1.0);

    // Create a new transaction and specify the store and data privileges.
    const tx = contactDb.transaction('contact_db', 'readonly');

    // Open up the desired object store.
    const store = tx.objectStore('contact_db');

    // Use the .getAll() method to get all data in the database.
    const request = store.getAll();

    // Get confirmation of the request.
    const result = await request;
    console.log('result.value', result);
    return result;
};

export const postDb = async (name, email, phone, profile) => {
  console.log('POST to the db');

  //create connection to db and specify version
  const contactDb = await openDB('contact_db', 1);

  //create new transaction and specify store and data privileges
  const tx = contactDb.transaction('contact_db', 'readwrite');

  //open desired object store
  const store = tx.objectStore('contact_db');

  // use .add() to store an dpass content
  const request = store.add({ name: name, email: email, phone: phone, profile: profile });

  //get confirm of req
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => console.error('putDb not implemented');

export const deleteDb = async (id) => {
  console.log('DELETE from the database', id);

  //Create a connection to the IndexedBD database and the version
  const contactDb = await openDB('contact_db', 1);

  //create a new transaction and spec th estore and data priviledges
  const tx = contactDb.transaction('contact_db', 'readwrite');

  //open the obj store
  const store = tx.objectStore('contact_db');

  //use the .delete() method to get all data in db
  const request = store.delete(id);

  //get confirm
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

initDb();
