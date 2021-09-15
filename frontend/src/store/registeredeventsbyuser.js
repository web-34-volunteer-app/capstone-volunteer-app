import {createSlice} from "@reduxjs/toolkit";
import { fetchAuth } from './auth'
import {httpConfig} from "../utils/httpConfig";

const registeredSlice = createSlice({
    name: "registered",
    initialState: null,
    reducers: {
        getEventByUserId: (registered, action) => {
            return action.payload
        }
    }
})

export const {getEventByUserId} = registeredSlice.actions

export default registeredSlice.reducer

export const fetchEventByUserId = () => async (dispatch, getState) => {
    await dispatch(fetchAuth())
    const {auth} = getState()
    if(auth !== null) {
        const {data} = await httpConfig.get(`/apis/event/registered/`)
        dispatch(getEventByUserId(data))
    }
}