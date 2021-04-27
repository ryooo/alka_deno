
export const findQuizHistory = async (id: string) => {
  const db = await connectLocalDB('alka', 'quiz_histories', 1)
  return await get(db, 'quiz_histories', id)
}

export const pushQuizHistory = async (id: string, scores: any) => {
  const db = await connectLocalDB('alka', 'quiz_histories', 1)
  let row = await findQuizHistory(id)
  if (!row) {
    row = {
      id,
      histories: [],
    }
  }
  const pushedAt = Date.now()
  row.histories.unshift({
    scores,
    pushedAt,
  })
  row.histories = row.histories.slice(0, 5)
  return await put(db, 'quiz_histories', row)
}

export const connectLocalDB = (dbName: string, schemeName: string, version: number): Promise<IDBDatabase> => {
  const dbp = new Promise<IDBDatabase>((resolve, reject) => {
    const req = indexedDB.open(dbName, version)
    req.onsuccess = (event) => resolve(req.result)
    req.onerror = (event) => reject('fails to open db')
    req.onupgradeneeded = (event) => {
      req.result.createObjectStore(schemeName, { keyPath: 'id' })
    }
  })
  return dbp
}

export const put = async (db: IDBDatabase, schemeName: string, obj: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const docs = db.transaction(schemeName, 'readwrite').objectStore(schemeName)
    const req = docs.put(obj)
    req.onsuccess = () => resolve({ id: req.result, ...obj })
    req.onerror = reject
  })
}

export const get = async (db: IDBDatabase, schemeName: string, id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const docs = db.transaction(schemeName).objectStore(schemeName)
    const req = docs.get(id)
    req.onsuccess = () => resolve(req.result)
    req.onerror = reject
  })
}

export const indexedDBEnable = (): boolean => {
  return !!indexedDB
}
