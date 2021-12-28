import {createSlice} from "@reduxjs/toolkit";
import {httpConfig} from "../utils/httpConfig";

const usersSlice = createSlice({
    name: "users",
    initialState: null,
    reducers: {
        getUsers: (users, action) => {
            return action.payload
        }
    }
});

export const {getUsers} = usersSlice.actions;

export default usersSlice.reducer;

export const fetchAllUsers = () => async (dispatch) => {
    const {data} = await httpConfig.get(`/apis/user/`);
    dispatch(getUsers(data));
}
