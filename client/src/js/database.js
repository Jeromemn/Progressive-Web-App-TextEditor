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

// TODO: Add logic to a method that accepts some data and adds it to the database
// export const postDb = async ( content ) => {
//   const jateDb = await openDB('jate', 1);
//   const txt = jateDb.transaction('jate', 'readwrite');
//   const store = txt.objectStore('jate');
//   const request = store.add({ jate: content });
//   const results = await request;
//   console.log(' - text saved to database', results)
// }

export const putDb = async (data) => {
  // console.error('putDb not implemented');
  try {
  console.log(data);
  const jateDb = await openDB('jate', 1);
  const txt = jateDb.transaction('jate', 'readwrite');
  const store = txt.objectStore('jate');
  const results = await store.put(data, 'jate');
  // const results = await store.put({ id: 1, value: data });
  console.log( 'data updated to the server', results)
  } catch (err) {
    console.log(err);
    throw (err);
  }
  // const results = await request;
};
// TODO: Add logic for a method that gets all the data from the database
export const getDb = async () => {
  // console.error('getDb not implemented');
  try {
  const jateDb = await openDB('jate', 1);
  const txt = jateDb.transaction('jate', 'readonly');
  const store = txt.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
  }catch (err) {
    console.log(err);
    throw err;
  }
};

initdb();
