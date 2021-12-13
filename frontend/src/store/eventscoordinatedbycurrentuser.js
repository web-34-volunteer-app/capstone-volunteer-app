import {createSlice} from "@reduxjs/toolkit";
import { fetchAuth } from './auth'
import {httpConfig} from "../utils/httpConfig";

const coordinatedSlice = createSlice({
    name: "coordinated",
    initialState: null,
    reducers: {
        getCoordinatedEventByCurrentUserId: (coordinated, action) => {
            return action.payload
        }
    }
})

export const {getCoordinatedEventByCurrentUserId} = coordinatedSlice.actions

export default coordinatedSlice.reducer

export const fetchCoordinatedEventByUserId = () => async (dispatch, getState) => {
    await dispatch(fetchAuth())
    const {auth} = getState()
    if(auth !== null) {
        const {data} = await httpConfig.get(`/apis/event/coordinated/`)
        dispatch(getCoordinatedEventByCurrentUserId(data))
    }
}