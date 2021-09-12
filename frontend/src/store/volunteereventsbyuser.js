import {createSlice} from "@reduxjs/toolkit";
import { fetchAuth } from './auth'
import {httpConfig} from "../utils/httpConfig";


const volunteerSlice = createSlice({
    name: "volunteers",
    initialState: [],
    reducers: {
        getVolunteerByVolunteerUserId: (events, action) => {
            return action.payload
        }
    }
})

export const {getVolunteerByVolunteerUserId} = volunteerSlice.actions

export default volunteerSlice.reducer

export const fetchVolunteerByVolunteerUserId = () => async (dispatch, getState) => {
    await dispatch(fetchAuth())
    const {auth} = getState()
    console.log(auth)
    if(auth !== null) {
        const {data} = await httpConfig.get(`/apis/volunteer/${auth.UserId}`)
        console.log(data)
        dispatch(getVolunteerByVolunteerUserId(data))
    }
}