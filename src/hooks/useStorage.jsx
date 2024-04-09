import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../firebase/config'
import { useEffect, useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

const useStorage = (file) => {
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(null)

    useEffect(() => {
        //References
        const storageRef = ref(storage, file.name)

        const collectionRef = collection(db, 'images')

        const uploadTask = uploadBytesResumable(storageRef, file)
        //Upload Task
        const unsub = uploadTask.on('state_changed', (snapshot) => {
            const precentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setProgress(precentage)
        }, (err) => {
            setError(err)
        }, async () => {
            const downloadUrl = await getDownloadURL(storageRef)
            setUrl(downloadUrl)

            const createdAt = serverTimestamp()
            await addDoc(collectionRef, { url: downloadUrl, createdAt })
        })
        return () => unsub()
    }, [file])

    return { progress, url, error }
}

export default useStorage