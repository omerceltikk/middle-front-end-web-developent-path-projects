import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {textSlice,getData} from '../redux/textSlice';
import {help} from "./helpPro"
function Written() {
    const [data, setData] = useState("")
   const dispatch = useDispatch();
   const helpState = useSelector(state => state.text.isHelp)
   const helpText = useSelector(state => state.text.helpText)
   useEffect(() => {
    dispatch(getData(data))
   },[data])
  return (
    
    <div>
        <textarea onChange={(e) => setData(e.target.value)} value={helpState == true ? helpText : null } placeholder="this is user input"> 
        </textarea> 
    </div>
  )
}

export default Written