import { useEffect } from "react"
import useStorage from "../hooks/useStorage"

export const ProgressBar = ({ file, setFile }) => {

    const { progress, url } = useStorage(file)
    console.log(progress, url)

    useEffect(() => {
        if (url) {
            setFile(null)
        }
    }, [url, setFile])

    return (
        <div className="progress-bar" style={{ width: progress + '%' }}>
        </div>
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