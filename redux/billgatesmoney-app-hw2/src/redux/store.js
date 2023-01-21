import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "./card/CardSlice";

export const store = configureStore({
    reducer: {
        element: cardSlice,
    }
})