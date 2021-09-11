import {createSlice} from "@reduxjs/toolkit";
import { fetchAuth } from './auth'
import {httpConfig} from "../utils/httpConfig";

const userSlice = createSlice({
    name: "users",
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
    console.log(auth)
    if(auth !== null) {
        const {data} = await httpConfig.get(`/apis/user/${auth.userId}`)
        console.log(data)
        dispatch(getUserByUserId(data))
    }
}
