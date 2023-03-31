import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchQuotes = createAsyncThunk("quotes/fetchAll", async () => {
    const res = await axios(`${process.nextTick.REACT_APP_API_BASE_ENDPOINT}/quotes`)
    return res.data 
})
export const quotesSlice = createSlice({
    name: "quotes",
    initialState: {
        items: [],
        status: "idle",
    },
    reducers: {},
    extraReducers: {
        [fetchQuotes.fulfilled]: (state, action) => {
            state.items =action.payload;
            state.status = "succeeded"
        },
        [fetchQuotes.pending]: (state, action) => {
            state.status = "loading"
        },
        [fetchQuotes.rejected]: (state, action) => {
            state.status =" failed";
            state.error = state.error.message;
        }
    }
})

export default quotesSlice.reducer