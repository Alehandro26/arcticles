const DB_NAME = 'database';
const DB_VERSION = 1;
const STORE_NAME = 'data_store';

let db;

export function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject("Error opening database");
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve();
    };

    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      const objectStore = database.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
    };
  });
}

export function addData(data) {
  const transaction = db.transaction([STORE_NAME], 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  store.add(data);
}

export function getData() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = () => {
      reject("Error fetching data");
    };
  });
}


export function getDataById(id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = (event) => {
      const data = event.target.result;

      if (data) {
        resolve(data);
      } else {
        reject("Data not found");
      }
    };

    request.onerror = () => {
      reject("Error fetching data");
    };
  });
}

export function updateData(id, newData) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = (event) => {
      const existingData = event.target.result;
      if (existingData) {
        const updatedData = { ...existingData, ...newData };
        const updateRequest = store.put(updatedData);
        updateRequest.onsuccess = () => {
          resolve();
        };
        updateRequest.onerror = () => {
          reject("Error updating data");
        };
      } else {
        reject("Data not found");
      }
    };

    request.onerror = () => {
      reject("Error fetching data");
    };
  });
}