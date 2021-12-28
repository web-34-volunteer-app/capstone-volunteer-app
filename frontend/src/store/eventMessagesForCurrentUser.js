import {createSlice} from "@reduxjs/toolkit";
import {fetchAuth} from "./auth";
import {httpConfig} from "../utils/httpConfig";

const eventMessages_forCurrentUser_Slice = createSlice({
    name: "eventMessages_forCurrentUser",
    initialState: null,
    reducers: {
        getEventMessagesForCurrentUser: (eventMessages_forCurrentUser, action) => {
            return action.payload;
        }
    }
});

export const {getEventMessagesForCurrentUser} = eventMessages_forCurrentUser_Slice.actions;

export default eventMessages_forCurrentUser_Slice.reducer;

export const fetchEventMessagesForCurrentUser = () => async (dispatch, getState) => {
    await dispatch(fetchAuth());
    const {auth} = getState();
    if (auth !== null) {
        const {data} = await httpConfig.get(`/apis/eventMessage/getAllForCurrentUser`);
        dispatch(getEventMessagesForCurrentUser(data));
    }
}