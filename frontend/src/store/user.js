import {createSlice} from "@reduxjs/toolkit";
import { fetchAuth } from './auth'
import {httpConfig} from "../utils/httpConfig";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        getUserByUserId: (user, action) => {
            return action.payload
        }
    }
})

export const {getUserByUserId} = userSlice.actions

export default userSlice.reducer

export const fetchUserByUserId = () => async (dispatch, getState) => {
    await dispatch(fetchAuth())
    const {auth} = getState()
    if(auth !== null) {
        const {data} = await httpConfig.get(`/apis/user/userId/${auth.userId}`);
        dispatch(getUserByUserId(data))
    }
}
