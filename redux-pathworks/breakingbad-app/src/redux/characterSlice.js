import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const char_limit= 12;
export const fetchCharacters = createAsyncThunk("characters/getCharacters" , async () => {
    const res = await axios(`https://www.breakingbadapi.com/api/characterslimit=${char_limit}&offset=${page * char_limit}`);
    // console.log(res.data);
    return  res.data;

})
export const characterSlice = createSlice({
    name: "characters",
    initialState: {
        items: [],
        status: "idle",
        page: 0,
        hasNextPage: true,
    },
    reducers: {},

    extraReducers: {
        [fetchCharacters.fulfilled]: (state,action) => {
           state.items = [...state.items ,action.payload];
           state.status = "succeeded";
           state.page =+ 1;
           if(action.payload.length < 12){
            state.hasNextPage =false;
           }
        },
        [fetchCharacters.pending]: (state,action) => {
            state.status = "loading";
        },
        [fetchCharacters.rejected]: (state,action) => {
            state.status = "failed";
            state.error = action.error.message;
        }
    },
});


export default characterSlice.reducer;