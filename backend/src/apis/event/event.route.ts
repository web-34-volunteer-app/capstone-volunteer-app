import {Router} from "express";
import {
    deleteEventByEventIdController,
    getAllEventsController,
    getEventByEventIdController,
    getEventByEventOrganizationController,
    getEventByEventUserIdController,
    getEventByVolunteerUserIdController,
    postEvent,
    putEventController
} from "./event.controller";
import {asyncValidatorController} from "../../utils/controllers/asyncValidator.controller";
import {eventValidator} from "./event.validator";
import {isLoggedIn} from "../../utils/controllers/isLoggedIn.controller";

const {checkSchema} = require('express-validator');

export const EventRouter = Router();


EventRouter.route('/')
    .get(getAllEventsController)
    .post(isLoggedIn, asyncValidatorController(checkSchema(eventValidator)), postEvent)

EventRouter.route('/coordinated/')
    .get(isLoggedIn, getEventByEventUserIdController)

EventRouter.route('/registered/')
    .get(isLoggedIn, getEventByVolunteerUserIdController)

EventRouter.route('/eventId/:eventId')
    .delete(isLoggedIn, deleteEventByEventIdController)
    .get(getEventByEventIdController)
    .put(putEventController)

EventRouter.route('/organization/:eventOrganization')
    .get(getEventByEventOrganizationController)

