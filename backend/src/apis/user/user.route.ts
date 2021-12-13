import {
    deleteUserByIdController,
    getAllUsersController,
    getUserByUserIdController, getUsersByCoordinatorUserIdController,
    putUserController
} from "./user.controller";
import {Router} from "express";
import {asyncValidatorController} from "../../utils/controllers/asyncValidator.controller";
import {check, checkSchema} from "express-validator";
import {isLoggedIn} from "../../utils/controllers/isLoggedIn.controller";
import {userValidator} from "./user.validator";


export const UserRoute = Router();

UserRoute.route('/')
    .get( getAllUsersController )

UserRoute.route('/getByUserId/:userId')
    .delete(isLoggedIn,deleteUserByIdController)
    .get(
        asyncValidatorController([
            check("userId",
                "please provide a valid userId").isUUID()]),
                        getUserByUserIdController)
    .put(isLoggedIn, asyncValidatorController(checkSchema(userValidator)), putUserController)

UserRoute.route('/volunteer/:userId')
    .get(getUserByUserIdController);

UserRoute.route('/volunteersForCoordinator')
    .get(getUsersByCoordinatorUserIdController);