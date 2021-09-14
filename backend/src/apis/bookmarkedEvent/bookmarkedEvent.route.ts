import {Router} from "express";
import {
    getAllBookmarkedEventsController,
    getBookmarkedEventsByUserIdController,
    toggleBookMarkController
} from "./bookmarkedEvent.controller";
import {isLoggedIn} from "../../utils/controllers/isLoggedIn.controller";
import {getAllEventsController, getEventByEventUserIdController} from "../event/event.controller";
import {EventRouter} from "../event/event.route";


export const bookMarkedEventRoute = Router();
bookMarkedEventRoute.route
('/')
    .get(getAllBookmarkedEventsController)

bookMarkedEventRoute.route('/bookmarkedEventEventId/:bookmarkedEventEventId')
    .post(isLoggedIn, toggleBookMarkController);

bookMarkedEventRoute.route('/bookmarked/')
    .get(isLoggedIn,getBookmarkedEventsByUserIdController)