import {Router} from "express";
import {
    deleteVolunteerController,
    getAllVolunteersController, getVolunteerByVolunteerEventIdController, getVolunteerByVolunteerUserIdController,
    postVolunteerController,
    putVolunteerController
} from "./volunteer.controller";
import {isLoggedIn} from "../../utils/controllers/isLoggedIn.controller";

export const VolunteerRouter = Router();

//Get all volunteers in database
VolunteerRouter.route('/')
    .get(getAllVolunteersController)

//Get all events one user volunteered for
VolunteerRouter.route('/:volunteerUserId')
    .get(getVolunteerByVolunteerUserIdController)

//Get all volunteers for one event
VolunteerRouter.route('/event/:volunteerEventId')
    .get(getVolunteerByVolunteerEventIdController)

//One user volunteers for an event
VolunteerRouter.route('/:volunteerEventId')
    .post(isLoggedIn, postVolunteerController)

//Update a particular user's hours, or hours verification for a particular event
VolunteerRouter.route('/update/:volunteerUserId/:volunteerEventId')
    .put(putVolunteerController)

//Delete a volunteer
VolunteerRouter.route('/delete/:volunteerUserId/:volunteerEventId')
    .delete(deleteVolunteerController)