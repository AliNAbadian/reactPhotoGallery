import { useEffect } from "react"
import useStorage from "../hooks/useStorage"
import { motion } from 'framer-motion'

export const ProgressBar = ({ file, setFile }) => {

    const { progress, url } = useStorage(file)
    console.log(progress, url)

    useEffect(() => {
        if (url) {
            setFile(null)
        }
    }, [url, setFile])

    return (
        <motion.div
            className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: progress + '%' }}
        >
        </motion.div>
    )
}


// without {}
// const ProgressBar = () => {
//     return (
//         <div className="progress-bar">
//             ProgressBar
//         </div>
//     )
// }

// export default ProgressBar