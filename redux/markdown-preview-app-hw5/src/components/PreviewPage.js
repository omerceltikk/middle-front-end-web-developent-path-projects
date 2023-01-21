import React from 'react'
import { useSelector } from 'react-redux'
import { marked } from 'marked'
function PreviewPage() {
const data = useSelector(state => state.text.data)


const reText = marked(data || "")
const processedText = {__html: reText }
console.log(reText);
    return (
    <div className='right'
    dangerouslySetInnerHTML={processedText}>

    </div>
    )
}

export default PreviewPage