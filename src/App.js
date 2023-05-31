import './App.css';
import React, { useState } from 'react';
import { marked } from 'marked'
import axios from 'axios';
import { useLocalStorage } from './hooks/UseLocalstorage';
import Docs from './components/Docs';

const App = () => {
  const [code, setCode] = useLocalStorage('content', '## Hello')
  const [compiled, setCompiled] = useState('<h2 id="hello">Hello</h2>')
  const [hide, hidePreview] = useState(true)
  const [showDocs, setShowDocs] = useState(false)
  const [docs, setDocs] = useState([
    {
      name: 'Headings',
      description: 'To create a heading, add number signs (`#`) in front of a word or phrase. The number of number signs you use should correspond to the heading level. For example, to create a heading level three (`<h3>`), use three number signs (e.g., `### My Header`).',
      examples: [{markdown: '## Heading level 2', html: '<h2>Heading level 2</h2>'}]
    }
  ])

  const apiURL = 'https://www.markdownguide.org/api/v1/basic-syntax.json'

  const getDocs = () => {
    axios.get(apiURL)
      .then((response) => {
        console.log(response.data)
        setDocs(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const openMD = () => {
    console.log(0)
    hidePreview(true)
    setShowDocs(false)
  }

  const openPreview = () => {
    console.log(0)
    setCompiled(marked.parse(code))
    hidePreview(false)
    setShowDocs(false)
  }

  const openDocs = () => {
    setShowDocs(true)
    getDocs()
  }

  const handleChange = (e) => {
    setCode(e.target.value)
    // setCompiled(marked.parse(e.target.value))
  }

  return (
    <>
      <h1>MarkDown Previewer React App</h1>
      <div className="container">
        <div className="btns">
          <button onClick={openMD} className="btn">MarkDown</button>
          <button onClick={openPreview}>Preview</button>
          <button onClick={openDocs}>Docs</button>
        </div>
        {
          showDocs ?
            <Docs docs={docs} /> :
            hide ?
              <div>
                <textarea onChange={handleChange} value={code} />
              </div> :
              <div>
                <textarea value={compiled} />
              </div>
        }
      </div>
    </>
  )
}


export default App;
