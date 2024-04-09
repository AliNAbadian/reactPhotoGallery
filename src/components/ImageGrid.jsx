import useFirestore from "../hooks/useFirestore"

const ImageGrid = ({ setSelectedImg }) => {
    const { docs } = useFirestore('images')

    console.log(docs)
    return (
        <div className="img-grid">
            {docs && docs.map((doc, i) => (
                <div className="img-wrap" onClick={() => setSelectedImg(doc.url)} key={i}>
                    <img src={doc.url} alt={doc.id} />
                </div>
            ))}
        </div>
    )
}

export default ImageGrid