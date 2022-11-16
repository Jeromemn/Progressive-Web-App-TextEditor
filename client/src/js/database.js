import { openDB } from 'idb';

const dbName = 'jate'
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some data and adds it to the database

export const putDb = async (data) => {
  const jateDb = await openDB(dbName, 1);
  const txt = jateDb.transaction(dbName, 'readwrite');
  const store = txt.objectStore(dbName);
  const results = await store.put({
    id: 1,
   value: data
  });

  console.log('updated data in IDB', results);
};

// TODO: Add logic for a method that gets all the data from the database

export const getDb = async () => {
  const jateDb = await openDB(dbName, 1 );
  const tx = jateDb.transaction(dbName, 'readonly');
  const store = tx.objectStore(dbName);
  const results = await store.get(1);
  return results?.value;
};

initdb();
