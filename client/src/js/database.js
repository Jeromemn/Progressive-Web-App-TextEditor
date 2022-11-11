import { openDB } from 'idb';

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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const postDb = async ( content ) => {
  const textItDb = await openDB('jate', 1);
  const txt = textItDb.transaction('jate', 'readwrite');
  const store = txt.objectStore('jate');
  const request = store.add({ jate: content });
  const results = await request;
  console.log(' - text saved to database', results)
}

export const putDb = async (id, content) => {
  console.error('putDb not implemented');
  const textItDb = await openDB('jate', 1);
  const txt = textItDb.transaction('jate', 'readwrite');
  const store = txt.objectStore('jate');
  const request = store.put({ id: id, jate: content });
  const results = await request;
  console.log( 'data updated to the server', results)
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('getDb not implemented');
  const textItDb = await openDB('jate', 1);
  const txt = textItDb.transaction('jate', 'readonly');
  const store = txt.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};
initdb();
