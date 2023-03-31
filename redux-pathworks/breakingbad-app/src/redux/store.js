import { configureStore } from "@reduxjs/toolkit";
import characterSlice  from "./characterSlice";
import quoteSlice from "./quoteSlice";
export const store = configureStore({
    reducer: {
        characters: characterSlice,
        quotes: quoteSlice,
    },
});

