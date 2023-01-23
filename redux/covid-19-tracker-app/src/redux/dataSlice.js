import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCountry = createAsyncThunk("data/getCountry", async () => {
    const res = await axios(`https://api.covid19api.com/countries`)
    return res.data;
})

export const getData = createAsyncThunk("data/getData", async (country) => {
    console.log(country);
    const data = await country
    if (data) {
        const res = await axios(`https://api.covid19api.com/summary`)
        return res.data.Countries
    }
})
export const dataSlice = createSlice({
    name: "data",
    initialState: {
        items: [],
        countryStatus: "idle",
        status: "idle",
        country: [],
        slug: "afghanistan",

    },
    reducers: {
        slugData: (state,action) => {
            state.slug = action.payload
        }
    },
    extraReducers: {
        [fetchCountry.fulfilled]: (state, action) => {
            state.country = action.payload
            state.countryStatus = "succeeded"
        },
        [fetchCountry.pending]: (state, action) => {
            state.countryStatus = "loading"
        },
        [fetchCountry.rejected]: (state, action) => {
            state.countryStatus = "failed"
            state.error = action.message.error
        },
        [getData.fulfilled]: (state, action) => {
            const countryItem = action.payload
            const find = countryItem.find((item) => item.Slug === state.slug.country);
            state.items = find
            state.status = "succeeded"
        },
        [getData.pending]: (state, action) => {
            state.status = "loading"
        },
        [getData.rejected]: (state, action) => {
            state.status = "failed"
            state.error = action.message.error
        },
    }
})
export const {slugData} = dataSlice.actions
export default dataSlice.reducer