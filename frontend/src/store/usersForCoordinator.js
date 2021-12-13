import {createSlice} from "@reduxjs/toolkit";
import { fetchAuth } from './auth'
import {httpConfig} from "../utils/httpConfig";

// Define reducer and action
const users_forCoordinator_Slice = createSlice({
    name: "users_forCoordinator",
    initialState: null,
    reducers: {
        getUsersForCoordinator: (users_forCoordinator, action) => {
            return action.payload;
        }
    }
});

//Make actions callable as functions
export const {getUsersForCoordinator} = users_forCoordinator_Slice.actions;

//Use export default so that if something imports this file, they will get it by default
export default users_forCoordinator_Slice.reducer

export const fetchUsersForCoordinator = () => async (dispatch, getState) => {
    await dispatch(fetchAuth());
    const {auth} = getState();
    if(auth !== null) {
        const {data} = await httpConfig.get(`/apis/user/volunteersForCoordinator`);
        dispatch(getUsersForCoordinator(data));
    }
}