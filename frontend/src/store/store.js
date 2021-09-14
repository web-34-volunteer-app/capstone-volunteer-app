import events from "./event"
import auth from "./auth";
import users from "./user";
import registered from "./registeredeventsbyuser";
import bookmarked from "./bookmarkevent"

import {combineReducers, configureStore} from "@reduxjs/toolkit";

const reducer = combineReducers({events, auth, users, registered,bookmarked});


export const store = configureStore({reducer});