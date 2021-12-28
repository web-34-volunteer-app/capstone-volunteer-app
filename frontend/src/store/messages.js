import {createSlice} from "@reduxjs/toolkit";
import {httpConfig} from "../utils/httpConfig";

const messages_Slice = createSlice({
    name: "messages",
    initialState: null,
    reducers: {
        getMessages:
            (messages, action) => {
                return action.payload;
            }
    }
});

export const {getMessages} = messages_Slice.actions;

export default messages_Slice.reducer;

export const fetchMessages = () => async (dispatch) => {
    const {data} = await httpConfig.get(`/apis/message/`);
    dispatch(getMessages(data));
}