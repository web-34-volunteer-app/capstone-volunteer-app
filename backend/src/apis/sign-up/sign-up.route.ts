import {Router} from "express";
import {asyncValidatorController} from "../../utils/controllers/asyncValidator.controller";
import {signupValidator} from "./sign-up.validator";
import {signupUserController} from "./sign-up.controller";
import {activationController} from "./activation.controller";
import {param} from "express-validator";

const { checkSchema } = require('express-validator');

export const SignUpRoute = Router();

SignUpRoute.route('/')
    .post(
        asyncValidatorController(checkSchema(signupValidator)),
        signupUserController
    );

SignUpRoute.route('/activation/:activation')
    .get(
        asyncValidatorController([param("activation", "invalid activation link").isHexadecimal().notEmpty()]),
        activationController
    )