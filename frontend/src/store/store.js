import events from "./event"
import auth from "./auth";
import users from "./user"


import {combineReducers, configureStore} from "@reduxjs/toolkit";

const reducer = combineReducers({events, auth, users});


export const store = configureStore({reducer});