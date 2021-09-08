import { Router} from "express";
import {
    deleteEventByIdController,
    getAllEventsController,
    getEventbyEventIdController, getEventByEventOrganizationController,
    postEvent, putEventController
} from "./event.controller";
import {asyncValidatorController} from "../../utils/controllers/asyncValidator.controller";
import {eventValidator} from "./event.validator";
import {isLoggedIn} from "../../utils/controllers/isLoggedIn.controller";
const {checkSchema} = require('express-validator');

export const EventRouter = Router();


EventRouter.route('/')
    .get(getAllEventsController)
    .post( isLoggedIn, asyncValidatorController(checkSchema(eventValidator)), postEvent)

    EventRouter.route('/:eventId')
    .delete(isLoggedIn, deleteEventByIdController)
        .get(getEventbyEventIdController)
        .put(putEventController)

EventRouter.route('/organization/:eventOrganization')
    .get(getEventByEventOrganizationController)

