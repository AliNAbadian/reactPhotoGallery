import Title from './components/Title.jsx'
import './App.css'
import UploadForm from './components/UploadForm.jsx'
import ImageGrid from './components/ImageGrid.jsx'
import Modal from './components/Modal.jsx'
import { useState } from 'react'

function App() {
  const [selectedImg, setSelectedImg] = useState(null)
  return (
    <div className="App">
      <Title />
      <UploadForm />
      <ImageGrid setSelectedImg={setSelectedImg} />
      {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />}
    </div>
  )
}

export default App
