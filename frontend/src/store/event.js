import {createSlice} from "@reduxjs/toolkit";
import {httpConfig} from "../utils/httpConfig";

// Define reducer and action
const eventSlice = createSlice({
    name: "events",
    initialState: [],
    reducers: {
        setAllEvents: (events, action) => {
            return action.payload;
        }
    }
});

//Make actions callable as functions
export const {setAllEvents} = eventSlice.actions;

//Use export default so that if something imports this file, they will get it by default
export default eventSlice.reducer

export const fetchAllEvents = () => async dispatch => {
    const {data} = await httpConfig.get(`/apis/event`);

    dispatch(setAllEvents(data));
}