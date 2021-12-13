import {createSlice} from "@reduxjs/toolkit";
import { fetchAuth } from './auth'
import {httpConfig} from "../utils/httpConfig";

// Define reducer and action
const volunteers_forCoordinator_Slice = createSlice({
    name: "volunteers_forCoordinator",
    initialState: null,
    reducers: {
        getVolunteersForCoordinator: (volunteers_forCoordinator, action) => {
            return action.payload;
        }
    }
});

//Make actions callable as functions
export const {getVolunteersForCoordinator} = volunteers_forCoordinator_Slice.actions;

//Use export default so that if something imports this file, they will get it by default
export default volunteers_forCoordinator_Slice.reducer

export const fetchVolunteersForCoordinator = () => async (dispatch, getState) => {
    await dispatch(fetchAuth());
    const {auth} = getState();
    if(auth !== null) {
        const {data} = await httpConfig.get(`/apis/volunteer/volunteersForCoordinator`);
        dispatch(getVolunteersForCoordinator(data));
    }
}