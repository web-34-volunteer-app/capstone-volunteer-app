import events from "./event"
import auth from "./auth";
import users from "./user";
import registered from "./registeredeventsbyuser";


import {combineReducers, configureStore} from "@reduxjs/toolkit";

const reducer = combineReducers({events, auth, users, registered});


export const store = configureStore({reducer});