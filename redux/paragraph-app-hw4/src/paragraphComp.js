
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./styles.module.css"
import { fetchParagraphs } from './redux/paragraphSlice'

function ParagraphComp() {
    const [count, setCount] = useState(1)
    const [type, setType] = useState("text")
    const dispatch = useDispatch()
    const response = useSelector(state => state.paragraphs.title)
    console.log(response);
    useEffect(()=> {
        handleClick();
    },[dispatch])

    const handleClick = async () => {
        dispatch(fetchParagraphs({doc: type, paragraph: count}))
    }
    return (
      
        <div display="flex" className={styles.container}>
            <h1>React Sample Text Generator App</h1>
            <input display="flex" min={1} max="" type="number" 
            onChange={(e) => setCount(e.target.value)} />
            <select onChange={(e) => setType(e.target.value)} placeholder='Select option'>
                <option value='html'>HTML</option>
                <option value='text'>Text</option>
            </select>
            <button onClick={handleClick}>Submit</button>
            <div className={styles.box}>
                <p>
                    {response}
                </p>
            </div>
        </div>
        
    )
}

export default ParagraphComp