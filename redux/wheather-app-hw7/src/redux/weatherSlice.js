import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

    export const fetchWeather = createAsyncThunk("weather/getWeather", async (country) => {
        const res = await axios(`${process.env.REACT_APP_API_BASE_POINT}/forecast?q=${country}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
        return res.data 
    })
    export const dailyWeather = createAsyncThunk("weather/dailyWeather", async (country) => {
        const res = await axios(`${process.env.REACT_APP_API_BASE_POINT}/weather?q=${country}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
        return res.data 
    })
export const weatherSlice = createSlice({
    name: "weather",
    initialState:{
        items: [],
        daily: [],
        status: "idle",
        dailyStatus: "idle"
    },
    reducers:{},
    extraReducers:{
        [fetchWeather.fulfilled]: (state, action) => {
            const item = action.payload.list
            for (let i = 0; i < item.length; i+= 8) {
                const element = item[i];
                state.items.push(element)
            }
            state.status = "succeeded"
        
        },
        [fetchWeather.pending]: (state, action) => {
            state.status = "loading"
        },
        [fetchWeather.rejected]: (state, action) => {
            state.status = "rejected"
        },
        [dailyWeather.pending]: (state, action) => {
            state.dailyStatus = "loading"
        },
        [dailyWeather.fulfilled]: (state, action) => {
            state.daily.push(action.payload)
            state.dailyStatus = "succeeded"
          
        },
        [dailyWeather.rejected]: (state, action) => {
            state.dailyStatus = "rejected"
        },
    }
})
export default weatherSlice.reducer