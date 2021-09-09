import {Router} from "express";
import {getAllVolunteersController, postVolunteerController} from "./volunteer.controller";
import {isLoggedIn} from "../../utils/controllers/isLoggedIn.controller";

export const VolunteerRouter = Router();

VolunteerRouter.route('/')
    .get(getAllVolunteersController)
    .post(isLoggedIn, postVolunteerController)