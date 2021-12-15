import {createSlice} from "@reduxjs/toolkit";
import { fetchAuth } from './auth'
import {httpConfig} from "../utils/httpConfig";

// Define reducer and action
const volunteers_forCurrentUser_Slice = createSlice({
    name: "volunteers_forCurrentUser",
    initialState: null,
    reducers: {
        getVolunteersForCurrentUser: (volunteers_forCurrentUser, action) => {
            return action.payload;
        }
    }
});

//Make actions callable as functions
export const {getVolunteersForCurrentUser} = volunteers_forCurrentUser_Slice.actions;

//Use export default so that if something imports this file, they will get it by default
export default volunteers_forCurrentUser_Slice.reducer;

export const fetchVolunteersForCurrentUser = () => async (dispatch, getState) => {
    await dispatch(fetchAuth());
    const {auth} = getState();
    if(auth !== null) {
        const {data} = await httpConfig.get(`/apis/volunteer/registered`);
        dispatch(getVolunteersForCurrentUser(data));
    }
}