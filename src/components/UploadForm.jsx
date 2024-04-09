import React, { useState } from 'react'

const UploadForm = () => {

    const [file, setFile] = useState(null)
    const [error, setError] = useState(null)

    const types = ["image/jpeg", "image/png", "image/svg+xml"]

    const handleChange = (e) => {
        let selected = e.target.files[0]
        console.log(selected)

        if (selected && types.includes(selected.type)) {
            setFile(selected)
            setError('')
        } else {
            setFile(null)
            setError('Please Select an Image File (png, svg, jpeg)')
        }
    }

    return (
        <form>
            <input type="file" onChange={handleChange} />
            <div className="output">
                {error && <div className='error'>{error}</div>}
                {file && <div>{file.name}</div>}
            </div>
        </form>
    )
}

export default UploadForm