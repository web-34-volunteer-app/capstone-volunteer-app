import {Router} from "express";
import {postEvent} from "./event.controller";
import {asyncValidatorController} from "../../utils/controllers/asyncValidator.controller";
import {eventValidator} from "./event.validator";
import {isLoggedIn} from "../../utils/controllers/isLoggedIn.controller";
const {checkSchema} = require('express-validator');

const router = Router();

router.route('/')
.post(isLoggedIn,asyncValidatorController(checkSchema(eventValidator)), postEvent);

export default router;