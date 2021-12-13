import {Router} from "express";
import {
    deleteVolunteerBySelfController,
    deleteVolunteerController,
    getAllVolunteersController,
    getVolunteerByCurrentVolunteerUserIdController,
    getVolunteerByVolunteerEventIdController,
    getVolunteerByVolunteerUserIdController, getVolunteersByCoordinatorUserIdController,
    postVolunteerController,
    putVolunteerController,
    verifyVolunteerController
} from "./volunteer.controller";
import {isLoggedIn} from "../../utils/controllers/isLoggedIn.controller";
import {isNotRegisteredForEvent} from "../../utils/controllers/isNotRegisteredForEvent";

export const VolunteerRouter = Router();

//Get all volunteers in database
VolunteerRouter.route('/')
    .get(getAllVolunteersController)

//Get all events current user volunteered for
VolunteerRouter.route('/registered')
    .get(isLoggedIn, getVolunteerByCurrentVolunteerUserIdController)

//Get all events one user volunteered for
VolunteerRouter.route('/getAllByUserId/:volunteerUserId')
    .get(getVolunteerByVolunteerUserIdController)

//Get all volunteers for one event
VolunteerRouter.route('/event/:volunteerEventId')
    .get(getVolunteerByVolunteerEventIdController)

//Get all volunteers for event coordinator
VolunteerRouter.route('/volunteersForCoordinator')
    .get(getVolunteersByCoordinatorUserIdController);

//One user volunteers for an event
VolunteerRouter.route('/:volunteerEventId')
    .post(isLoggedIn, isNotRegisteredForEvent, postVolunteerController)

//Update a particular user's hours, or hours verification for a particular event
VolunteerRouter.route('/update/:volunteerUserId/:volunteerEventId')
    .put(putVolunteerController)

//Update a particular user's hours, or hours verification for a particular event
VolunteerRouter.route('/verify/:volunteerUserId/:volunteerEventId')
    .put(isLoggedIn, verifyVolunteerController)

//Delete a volunteer
VolunteerRouter.route('/delete/:volunteerUserId/:volunteerEventId')
    .delete(deleteVolunteerController)

VolunteerRouter.route('/deleteSelf/:volunteerEventId')
    .delete(isLoggedIn, deleteVolunteerBySelfController)
