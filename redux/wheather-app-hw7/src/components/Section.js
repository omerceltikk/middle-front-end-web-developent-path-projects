import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from './Loading'
import Error from './Error'

function Section() {
    const dailyData = useSelector(state => state.data.daily)
    const status = useSelector(state => state.data.dailyStatus)
    console.log(dailyData);

    if (status === "loading") {
        return <Loading />
    }
    if (status === "error") {
        <Error />
    }
    return (
        <div>
          {
             status === "succeeded" ? 
            <div className='section'>
            <div>
            <img  src={`http://openweathermap.org/img/wn/${dailyData[0].weather[0].icon}.png`} width="80" height="80"/>
             <h4>{dailyData[0].weather[0].description}</h4>
             </div>
             <h1>{Math.round(dailyData[0].main.temp)}  °C</h1>
             <div>
                 <h4>Humidity: {Math.round(dailyData[0].main.humidity)}%</h4>
                 <h4>Pressure: {Math.round(dailyData[0].main.pressure)} mb</h4>
                 <h4>Wind: {Math.round(dailyData[0].wind.speed)} kmph</h4>
             </div>
            </div> : <Loading/>
          }
        </div>
    )
}

export default Section