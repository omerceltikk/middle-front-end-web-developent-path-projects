import { StatArrow } from "@chakra-ui/react";
import { createSlice } from "@reduxjs/toolkit";
import wordData from "./words.json"

export const wordSlice = createSlice({
    name: "word",
    initialState: {
        word: [],
        timer: 60,
        time: "01:00",
        lang: "turkish",
        isFinish: false,
        correctWord: "",
        wrongWord: "",
        correctChar: "",
        incorrectChar: "",
        userCount: "",
        compStatus:"idle",
        wordindex: 0,
        


    },
    reducers: {
        wordTimer: (state, action) => {
            state.timer -= 1;
            state.timer < 60 && state.timer>9 ? state.time = `00:${state.timer}` :state.time = `00:0${state.timer}`
            if (state.time < 1) {
                state.isFinish = true;
                state.correctWord = state.word.slice(0, state.wordindex).filter(word => word.status === "correct").length
                state.wrongWord = state.word.slice(0, state.wordindex).filter(word => word.status === "incorrect").length
                state.correctChar = state.word.slice(0, state.wordindex).filter(word => word.status === "incorrect").reduce((a,b) => a+ b.word.length, 0);

            }
        },
        wordsSort: (state, action) => {
            state.compStatus = "loading"
            const sorted = wordData.words.sort(() => Math.random() - 0.4)
            state.lang = action.payload
            if (state.lang === "turkish") {
                state.word.push(sorted.map(word => {
                    const words = { 
                        "word": word.turkish, 
                        "status": "", 
                        "nowWords": false, }
                    return words
                }))
            }
            if (state.lang === "english") {
                state.word.push(sorted.map(word => {
                    return word.english
                }))
            }
            state.compStatus = "succeeded"
        },
        changeLang: (state, action) => {
            state.lang = action.payload;
        },
        wordIndexStatus: (state) => {
            state.wordindex +=1;
            state.word.forEach(w => w.nowWords = false);
            state.word[state.wordindex].nowWords = true;

            
        },
        wordsStatus: (state,action) => {
            console.log(state.wordindex);
            if(state.word[state.wordindex].word.toLowerCase() === action.payload.toLowerCase()){
                if(state.word[state.wordindex].word[0].toLowerCase() === action.payload.trim().toLowerCase()){
                    state.word[state.wordindex].status = "correct";
                }else{
                    state.word[state.wordindex].status = "incorrect"
                }
            } else {
                state.word[state.wordindex].status = "incorrect"
            }
        }

    }
})
export const {wordsSort,wordsStatus,wordTimer,wordIndexStatus} = wordSlice.actions;
export default wordSlice.reducer