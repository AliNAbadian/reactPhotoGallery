import React from 'react'

const UploadForm = () => {

    const handleChange = () => {
        console.log('Changing')
    }

    return (
        <form>
            <input type="file" onChange={handleChange} />
        </form>
    )
}

export default UploadForm