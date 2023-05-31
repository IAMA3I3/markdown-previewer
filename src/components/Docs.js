const Docs = ({ docs }) => {

    const docsMap = docs.map((item, index) => {
        return (
            <div key={index}>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <h4>Example:</h4>
                <p>Markdown - {item.examples.map((element, index) => {
                    return <span key={index}>{element.markdown}</span>
                })}</p>
                <p>HTML - {item.examples.map((element, index) => {
                    return <span key={index}>{element.html}</span>
                })}</p>
            </div>
        )
    })

    return (
        <div className="docs">
            {docsMap}
        </div>
    )
}

export default Docs