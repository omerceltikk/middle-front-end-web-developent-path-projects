import { createSlice } from "@reduxjs/toolkit";
import productsData from "../../products.json"

const data = productsData.products

export const cardSlice = createSlice({
    name:"element",
    initialState: {
        items:data,
        budget: 100000000000,
        initialMoney: 100000000000,
    },
    reducers: {
        buyProducts: (state, action) => {
            const id = action.payload.id;
            const amount = action.payload.count
            const filtered = state.items.findIndex((product) => product.id == id);
            state.items[filtered].count = amount;
           state.budget -= Number(amount) * Number(state.items[filtered].productPrice) 
           
        },
        sellProducts: (state, action) => {
            const id = action.payload.id;
            const amount = action.payload.count
            const filtered = state.items.findIndex((product) => product.id == id);
           if(amount >0){
            state.budget += Number(amount) * Number(state.items[filtered].productPrice)
           } 
        }

    }
    

})
export const {buyProducts,sellProducts} = cardSlice.actions;
export const cardProduct = (state) => state.element.items;
export default cardSlice.reducer