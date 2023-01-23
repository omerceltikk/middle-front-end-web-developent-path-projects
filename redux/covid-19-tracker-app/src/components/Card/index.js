import { Select, Center } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountry, getData } from '../../redux/dataSlice';
import Loading from '../Loading';
import Error from '../Error';
import CardComp from './CardComp';
import { slugData } from '../../redux/dataSlice';

function DataCard() {
  const [country, setCountry] = useState(null)
  const countryRes = useSelector(state => state.data.country);
  const countryStatus = useSelector(state => state.data.countryStatus);
  const dataStatus = useSelector(state => state.data.status);
  
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchCountry())
  }, [dispatch])
  useEffect(() => {
    dispatch(slugData({country}))
    dispatch(getData(country))
  }, [country])
  
  
  
  if (countryStatus === "loading" ) {
    return <Loading />
  }
  
  if (countryStatus === "failed") {
    return <Error />
  }
  
    return (

      <div>
        {
          dataStatus === "loading" ? <Loading/> : <CardComp/>
        }
        <Center>
          <Select w="30%" onChange={(e) => setCountry(e.target.value)} placeholder={country} >
            {
              countryRes.map((item, id) => (
                <option key={id} value={item.Slug}>
                  {item.Country}
                </option>
              ))
            }
          </Select>
        </Center>
      </div>
    )
  }

export default DataCard