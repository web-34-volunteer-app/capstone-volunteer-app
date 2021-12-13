import events from "./event"
import auth from "./auth";
import users from "./user";
import registered from "./eventsregisteredbyuser";
import bookmarked from "./eventsbookmarkedbycurrentuser"
import coordinated from "./eventscoordinatedbycurrentuser"

import {combineReducers, configureStore} from "@reduxjs/toolkit";

const reducer = combineReducers({events, auth, users, registered, bookmarked, coordinated});


export const store = configureStore({reducer});