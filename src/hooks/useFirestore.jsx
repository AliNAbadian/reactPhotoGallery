import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import { db } from '../firebase/config'

const useFirestore = (collectionName) => {
    const [docs, setDocs] = useState([])

    useEffect(() => {
        const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
        const unsub = onSnapshot(q, (snapshot) => {
            let documents = [];
            snapshot.forEach(doc => {
                documents.push({ ...doc.data(), id: doc.id })
            })
            setDocs(documents)
        })
        return () => unsub()
    }, [collectionName])
    return { docs }
}

export default useFirestore