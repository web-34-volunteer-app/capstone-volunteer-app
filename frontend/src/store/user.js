import {createSlice} from "@reduxjs/toolkit";

// Define reducer and action
const userSlice = createSlice({
   name: "user",
   initialState: [],
   reducers: {
       getAllUsers: (users, action) => {
           return action.payload;
       }
   }
});

//Make actions callable as functions
export const {getAllUsers} = userSlice.actions;

//Use export default so that if something imports this file, they will get it by default
export default userSlice.reducer
