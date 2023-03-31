import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuotes } from '../../redux/quoteSlice';
import Error from '../../components/Error';
import Loading from '../../components/Loading';

function Quotes() {
    const data = useSelector((state) => state.quotes.items);
    const status = useSelector((state) => state.quotes.status);
    const error = useSelector((state) => state.quotes.error);

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchQuotes())
    },[dispatch])

    if(error) {
        return <Error/>
    }

  return (
    <div>
        <h1>Quotes</h1> 
        {
            status ==="loading" && <Loading/>
        }
        {
            status==="succeeded" &&
            data.map((item) => 
                <div>{item.quote}</div>
            )
        }
    </div>
  )
}

export default Quotes