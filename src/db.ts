
/* eslint-disable @typescript-eslint/no-explicit-any */
const openDatabase = () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open("CodeDB", 1);
  
      request.onerror = () => {
        reject("Error opening database");
      };
  
      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        resolve(db);
      };
  
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        db.createObjectStore("codeStore", { keyPath: "id" });
      };
    });
  };
  
  export const saveCodeToDB = async (id: any, code: any) => {
    // console.log('Saving code to DB with id:', id); 
    const db = await openDatabase();
    const transaction = db.transaction("codeStore", "readwrite");
    const store = transaction.objectStore("codeStore");
    const data = { id, code };
  
    return new Promise<any>((resolve, reject) => {
      const request = store.put(data);
  
      request.onerror = () => {
        reject("Error saving code to IndexedDB");
      };
  
      request.onsuccess = (event) => {
        console.log("event: " + event);
  
        resolve(data); 
      };
    });
  };
  
  export const getCodeFromDB = async (id: any) => {
    const db = await openDatabase();
    const transaction = db.transaction("codeStore", "readonly");
    const store = transaction.objectStore("codeStore");
    const request = store.get(id);
  
    return new Promise<any | undefined>((resolve, reject) => {
      request.onerror = () => {
        reject("Error fetching code");
      };
  
      request.onsuccess = (event) => {
        const data = (event.target as IDBRequest).result;
        resolve(data ? data.code : undefined);
        // console.log("data", data);
      };
    });
  };

  export const removeCodeFromDB = async (id: any) => {
    const db = await openDatabase();
    const transaction = db.transaction("codeStore", "readwrite");
    const store = transaction.objectStore("codeStore");
  
    return new Promise<void>((resolve, reject) => {
      const request = store.delete(id);
  
      request.onerror = () => {
        reject("Error removing code from IndexedDB");
      };
  
      request.onsuccess = () => {
        resolve();
      };
    });
  };

// /* eslint-disable @typescript-eslint/no-explicit-any */
// const openDatabase = () => {
//   return new Promise<IDBDatabase>((resolve, reject) => {
//     const request = indexedDB.open("FileDB", 1);

//     request.onerror = () => {
//       reject("Error opening database");
//     };

//     request.onsuccess = (event) => {
//       const db = (event.target as IDBOpenDBRequest).result;
//       resolve(db);
//     };

//     request.onupgradeneeded = (event) => {
//       const db = (event.target as IDBOpenDBRequest).result;
//       db.createObjectStore("fileStore", { keyPath: "id", autoIncrement: true });
//     };
//   });
// };

// export const saveFileToDB = async (file: File) => {
//   const db = await openDatabase();
//   const transaction = db.transaction("fileStore", "readwrite");
//   const store = transaction.objectStore("fileStore");
//   const data = { file };

//   return new Promise<any>((resolve, reject) => {
//     const request = store.add(data);

//     request.onerror = () => {
//       reject("Error saving file to IndexedDB");
//     };

//     request.onsuccess = (event) => {
//       const fileId = (event.target as IDBRequest).result;
//       resolve({ fileId, file });
//     };
//   });
// };

// export const getFileFromDB = async (fileId: number) => {
//   const db = await openDatabase();
//   const transaction = db.transaction("fileStore", "readonly");
//   const store = transaction.objectStore("fileStore");
//   const request = store.get(fileId);

//   return new Promise<any | undefined>((resolve, reject) => {
//     request.onerror = () => {
//       reject("Error fetching file");
//     };

//     request.onsuccess = (event) => {
//       const data = (event.target as IDBRequest).result;
//       resolve(data ? data.file : undefined);
//     };
//   });
// };
