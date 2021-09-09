import events from "./event"
import {combineReducers, configureStore} from "@reduxjs/toolkit";

const reducer = combineReducers({events});

export const store = configureStore({reducer});