import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
    export const fetchParagraphs = createAsyncThunk("paragraphs/getParagraphs", async (data) => {
        const paragraph = await data.paragraph
        const type = await data.doc
        const res = await axios(`https://baconipsum.com/api/?type=all-meat&paras=${paragraph}&start-with-lorem=1&format=${type}`)
        return res.data;
    })
;
    

export const paragraphSlice = createSlice({
    name:"paragraphs",
    initialState:{
        title:[],
    },
    reducers:{
    },
    extraReducers:{
        [fetchParagraphs.fulfilled] : (state, action) => {
       state.title = action.payload;
        }
    }
})

export default paragraphSlice.reducer