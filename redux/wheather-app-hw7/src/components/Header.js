import {useEffect, useState} from 'react'
import { fetchWeather,dailyWeather } from '../redux/weatherSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

function Header() {
    const [country, setCountry] = useState("")
    const status = useSelector(state => state.data.status)
    const dispatch = useDispatch()
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        await dispatch(fetchWeather(country));
        await dispatch(dailyWeather(country));
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
        <input placeholder={status === "idle" ? "Enter a City..." : `${country} 5 days weather is showing now..`} onChange={(e) => setCountry(e.target.value)}></input>
        </form>
    </div>
  )
}

export default Header