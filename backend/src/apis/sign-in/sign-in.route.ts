import {Router} from 'express';
import {asyncValidatorController} from "../../utils/controllers/asyncValidator.controller";
import {signInController} from "./sign-in.controller";
import {signInValidator} from "./sign-in.validator";

const {checkSchema} = require('express-validator');

export const SignInRoute = Router();

SignInRoute.route('/')
    .post(asyncValidatorController(checkSchema(signInValidator)), signInController);