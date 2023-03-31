import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";


export const contactSelectors = contactAdaptor.getSelectors(state => state.contacts)
export const contactAdaptor = createEntityAdapter();
export const contactSlice = createSlice({
    name: "contacts",
    initialState:contactAdaptor.getInitialState(),
    reducers:{
        addContact: contactAdaptor.addOne,
        deleteContact: contactAdaptor.removeOne,
        removeAllContacts: contactAdaptor.removeAll,
        updateContact: contactAdaptor.updateOne,
    }
})
export const {addContact,deleteContact,removeAllContacts,updateContact } =contactSlice.actions;
export default contactSlice.reducer