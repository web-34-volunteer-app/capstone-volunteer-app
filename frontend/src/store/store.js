import events from "./event"
import auth from "./auth";
import users from "./user";
import volunteers from "./volunteereventsbyuser"


import {combineReducers, configureStore} from "@reduxjs/toolkit";

const reducer = combineReducers({events, auth, users, volunteers});


export const store = configureStore({reducer});