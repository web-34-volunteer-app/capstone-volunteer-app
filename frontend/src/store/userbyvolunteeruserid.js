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
    console.log("Fetching user by userID: " + userId);
    const {data} = await httpConfig.get(`/apis/user/volunteer/${userId}`);
    console.log("Fetch returns: " + JSON.stringify(data));
    dispatch(getUserByVolunteerUserId(data));
}