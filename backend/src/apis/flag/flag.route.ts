import {getAllFlagsController} from "./flag.controller";
import {insertFlag} from "../../utils/flag/insertFlag";
import {Router} from "express";

const { checkSchema } = require('express-validator');

const router = Router();

//Needs update and delete
router.route('/flag')
    .get( getAllFlagsController )
    .post( isLoggedInAdmin, asyncValidatorController(checkSchema(flagValidator)), insertFlag);

export default router;