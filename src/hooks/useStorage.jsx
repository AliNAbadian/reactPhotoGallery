import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../firebase/config'
import { useEffect, useState } from 'react'

const useStorage = (file) => {
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(null)

    useEffect(() => {
        //References
        const storageRef = ref(storage, file.name)
        const uploadTask = uploadBytesResumable(storageRef, file)
        //Upload Task
        uploadTask.on('state_changed', (snapshot) => {
            const precentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setProgress(precentage)
        }, (err) => {
            setError(err)
        }, async () => {
            const downloadUrl = await getDownloadURL(storageRef)
            setUrl(downloadUrl)
        })
    }, [file])

    return { progress, url, error }
}

export default useStorage