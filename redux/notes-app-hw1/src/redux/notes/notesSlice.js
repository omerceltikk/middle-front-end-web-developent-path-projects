import { createSlice, nanoid } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
    name: "notes",
    initialState: {
        items: [
            {
                id:1,
                title: "lorem ipsum dolor sit amet",
                color: "pink"
            },
            {
                id:2,
                title: "lorem ipsum dolor sit amet",
                color: "pink"
            }
        ],
    },
    reducers: {
        addNote: (state,action) => {
            const id = action.payload;
            state.items.push(action.payload);
        },
        destroy: (state, action) => {
            const id = action.payload;
            const filtered = state.items.filter((item) => item.id !== id);
            state.items = filtered;
        },
        searchText: (state, action) => {
            const word = action.payload;
            const filtered = state.items.filter((item) => item.title !== word);
            state.items = filtered;
        }
    }

})

export const selectNotes = (state) => state.notes.items;
export const {addNote,destroy,searchText} = notesSlice.actions;

export default notesSlice.reducer;