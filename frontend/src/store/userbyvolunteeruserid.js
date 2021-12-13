import {createSlice} from "@reduxjs/toolkit";
import {httpConfig} from "../utils/httpConfig";

const userVolunteerSlice = createSlice({
    name: "userVolunteer",
    initialState: "null",
    reducers: {
        getUserByVolunteerUserId: (userVolunteer, action) => {
            return action.payload;
        }
    }
})

export const {getUserByVolunteerUserId} = userVolunteerSlice.actions;

export default userVolunteerSlice.reducer;

export const fetchUserByVolunteerUserId = (userId) => async (dispatch) => {
    const {data} = await httpConfig.get(`/apis/user/volunteer/${userId}`);
    dispatch(getUserByVolunteerUserId(data));
}