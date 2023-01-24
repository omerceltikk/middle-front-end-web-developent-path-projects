import { createSlice } from "@reduxjs/toolkit";
import { reCreate } from "../data/data";

export const cardSlice = createSlice({
    name: "card",
    initialState:{
        items: [],
        score: 200,
        items2: [],
        gameMode:"newFlag",
        isStarted: false,
    },
    reducers:{
        activeCards: (state,action) => {
            const res = action.payload
            const findItem = state.items[0].find((item) => item.id === res.id )
            const toggle = res.status === false ? true : false;
            findItem.status = toggle;
        },
        handleScore: (state,action) => {
            state.score = state.score + (action.payload)
        },
        newGame: (state,action) => {
            state.isStarted = action.payload;
             const array = reCreate();
             const shuffled = array.sort(() => Math.random() - 0.5);
             state.items.push(shuffled)
        },
    }
})
export const {activeCards,handleScore,newGame} = cardSlice.actions   
export default cardSlice.reducer