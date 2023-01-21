import { createSlice } from "@reduxjs/toolkit";
import { help } from "../components/helpPro";
export const textSlice = createSlice({
    name: "text",
    initialState: {
        data:"this is user input",
        helpText: help,
        isHelp: false,
    },
    reducers: {
        getData: (state, action) => {
            if(state.isHelp == false){
                state.data = action.payload
            }else{
                state.data = state.helpText
            }
        },
        setHelpInfo: (state,action) => {
            state.isHelp = action.payload
        }
    }
    
})
export const {getData,setHelpInfo} = textSlice.actions

export default textSlice.reducer