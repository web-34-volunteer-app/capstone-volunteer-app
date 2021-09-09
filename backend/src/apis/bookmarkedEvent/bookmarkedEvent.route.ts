import {Router} from "express";
import {toggleBookMarkController} from "./bookmarkedEvent.controller";
import {isLoggedIn} from "../../utils/controllers/isLoggedIn.controller";


export const bookMarkedEventRoute = Router();
bookMarkedEventRoute.route('/:bookmarkedEventEventId')
    .post(isLoggedIn, toggleBookMarkController);