import {Router} from "express";
import {asyncValidatorController} from "../../utils/controllers/asyncValidator.controller";
import {messageValidator} from "./message.validator";
import {isLoggedIn} from "../../utils/controllers/isLoggedIn.controller";
import {
    getAllMessagesController,
    getAllMessagesForCurrentUserController,
    postMessageController
} from "./message.controller";

const {checkSchema} = require('express-validator');

export const MessageRouter = Router();

MessageRouter.route('/')
    .get(getAllMessagesController)

MessageRouter.route('/getAllForCurrentUser')
    .get(getAllMessagesForCurrentUserController)

MessageRouter.route('/eventParent/:eventId/')
    .post(isLoggedIn, asyncValidatorController(checkSchema(messageValidator)), postMessageController)

MessageRouter.route('/messageParent/:messageId/')
    .post(isLoggedIn, asyncValidatorController(checkSchema(messageValidator)), postMessageController)

MessageRouter.route('/userParent/:userId')
    .post(isLoggedIn, asyncValidatorController(checkSchema(messageValidator)), postMessageController)