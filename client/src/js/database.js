import { openDB } from 'idb';
import 'regenerator-runtime/runtime';


export const initdb = async () =>
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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
