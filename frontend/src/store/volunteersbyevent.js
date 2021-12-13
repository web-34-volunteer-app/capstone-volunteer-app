import {createSlice} from "@reduxjs/toolkit";
import {httpConfig} from "../utils/httpConfig";

const volunteersSlice = createSlice({
    name: "volunteers",
    initialState: null,
    reducers: {
        getVolunteersByEventId: (volunteers, action) => {
            return action.payload;
        }
    }
});

export const {getVolunteersByEventId} = volunteersSlice.actions;

export default volunteersSlice.reducer;

export const fetchVolunteersByEventId = (eventId) => async dispatch => {
    // console.log("Fetching volunteers by eventID: " + eventId);
    const {data} = await httpConfig.get(`/apis/volunteer/event/${eventId}`);
    // console.log("Fetch returns: " + JSON.stringify(data));
    dispatch(getVolunteersByEventId(data));
}