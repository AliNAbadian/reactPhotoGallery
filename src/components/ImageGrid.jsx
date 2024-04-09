import { deleteDoc, doc } from "firebase/firestore"
import useFirestore from "../hooks/useFirestore"
import { deleteObject, ref } from "firebase/storage"
import { db, storage } from "../firebase/config"
import { useState } from "react"
import { motion } from "framer-motion"

const ImageGrid = ({ setSelectedImg }) => {
    const { docs } = useFirestore('images')

    const [showDeleteButtons, setShowDeleteButtons] = useState(false)

    const handleDelete = async (e, docId, docUrl) => {
        e.stopPropagation()
        try {
            await deleteDoc(doc(db, 'images', docId))

            const imageRef = ref(storage, docUrl)
            await deleteObject(imageRef)

        } catch (err) {
            console.error(err)
        }
    }

    const ShowButtonsAfterDelay = () => {
        setTimeout(() => {
            setShowDeleteButtons(true)
        }, 200)
    }

    console.log(docs)
    return (
        <div className="img-grid">
            {docs && docs.map((doc, i) => (
                <motion.div
                    key={i}
                    className="img-wrap"
                    onClick={() => setSelectedImg(doc.url)}
                    layout
                    whileHover={{ opacity: 1, }}
                    onMouseEnter={ShowButtonsAfterDelay}
                    onMouseLeave={() => setShowDeleteButtons(false)}
                >

                    <motion.img
                        src={doc.url}
                        alt={doc.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    />

                    {showDeleteButtons && (
                        < button onClick={e => handleDelete(e, doc.id, doc.url)} className="delete-button">
                            delete
                        </button>
                    )}
                </motion.div>
            ))
            }
        </div >
    )
}

export default ImageGrid