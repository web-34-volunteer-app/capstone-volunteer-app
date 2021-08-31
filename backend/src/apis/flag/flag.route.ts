import {getAllFlagsController} from "./flag.controller";
import {insertFlag} from "../../utils/flag/insertFlag";
import {Router} from "express";
import {asyncValidatorController} from "../../utils/controllers/asyncValidator.controller";
import {isLoggedIn} from "../../utils/controllers/isLoggedIn.controller";
import {flagValidator} from "./flag.validator";

const { checkSchema } = require('express-validator');

const router = Router();

//Needs update and delete
router.route('/flag')
    .get( getAllFlagsController )
    .post( isLoggedIn, asyncValidatorController(checkSchema(flagValidator)), insertFlag);

export default router;