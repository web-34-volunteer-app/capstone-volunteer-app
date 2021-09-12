import {createSlice} from "@reduxjs/toolkit";
import {httpConfig} from "../utils/httpConfig";

// Define reducer and action
const eventSlice = createSlice({
    name: "event",
    initialState: [],
    reducers: {
        setAllBookmarkedEvents: (events, action) => {
            return action.payload;
        }
    }
});

//Make actions callable as functions
export const {setAllEvents} = eventSlice.actions;

//Use export default so that if something imports this file, they will get it by default
export default eventSlice.reducer

export const fetchBookmarkedEventsByUserId = () => async dispatch => {
    const {data} = await httpConfig.get(`/apis/bookmarkedEvent`);

    dispatch(setAllEvents(data));
}