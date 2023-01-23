import React from 'react'
import { useSelector } from 'react-redux'
import Loading from './Loading'
import Error from './Error'

function Card() {
  const daysData = useSelector(state => state.data.items)
  const status = useSelector(state => state.data.status)
  console.log(daysData);

  if (status === "loading") {
    return <Loading />
  }
  if (status === "error") {
    <Error />
  }

  return (
    <div>
      <div className='cards'>
      {
        daysData.map((item) => (
            <div className='carditem'>
              <div>
              <h4 key={item.id}>{(item.dt_txt)}</h4>
              <br></br>
              <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="icon" />
              <h4>{item.weather[0].description}</h4>
              </div>
            </div>
        ))
      }
      </div>
    </div>
  )
}

export default Card