import {createSlice} from "@reduxjs/toolkit";
import { fetchAuth } from './auth'
import {httpConfig} from "../utils/httpConfig";

const bookmarkedSlice = createSlice({
    name: "bookmarked",
    initialState: null,
    reducers: {
        getBookedMarkedEventByUserId: (bookmarked, action) => {
            return action.payload
        }
    }
})

export const {getBookedMarkedEventByUserId} = bookmarkedSlice.actions

export default bookmarkedSlice.reducer

export const fetchBookmarkedEventByUserId = () => async (dispatch, getState) => {
    await dispatch(fetchAuth())
    const {auth} = getState()
    if(auth !== null) {
        const {data} = await httpConfig.get(`/apis/bookmarkedEvent/bookmarked/`)
        dispatch(getBookedMarkedEventByUserId(data))
    }
}