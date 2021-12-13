import {createSlice} from "@reduxjs/toolkit";
import { fetchAuth } from './auth'
import {httpConfig} from "../utils/httpConfig";

const registeredSlice = createSlice({
    name: "registered",
    initialState: null,
    reducers: {
        getRegisteredEventByCurrentUserId: (registered, action) => {
            return action.payload
        }
    }
})

export const {getRegisteredEventByCurrentUserId} = registeredSlice.actions

export default registeredSlice.reducer

export const fetchRegisteredEventByUserId = () => async (dispatch, getState) => {
    await dispatch(fetchAuth())
    const {auth} = getState()
    if(auth !== null) {
        const {data} = await httpConfig.get(`/apis/event/registered/`)
        dispatch(getRegisteredEventByCurrentUserId(data))
    }
}