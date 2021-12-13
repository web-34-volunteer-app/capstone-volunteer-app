import events from "./event"
import auth from "./auth";
import users from "./user";
import registered from "./eventsregisteredbyuser";
import bookmarked from "./eventsbookmarkedbycurrentuser"
import coordinated from "./eventscoordinatedbycurrentuser"
import volunteers from "./volunteersbyevent"
import users_forCoordinator from "./usersForCoordinator"
import volunteers_forCoordinator from "./volunteersForCoordinator"

import {combineReducers, configureStore} from "@reduxjs/toolkit";

const reducer = combineReducers({events, auth, users, registered, bookmarked, coordinated, volunteers, users_forCoordinator, volunteers_forCoordinator});


export const store = configureStore({reducer});