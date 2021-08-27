import {Request, Response} from "express";
import {selectAllFlags} from "../../utils/flag/selectAllFlags";
import {Flag} from "../../utils/interfaces/Flag";
import {insertFlag} from "../../utils/flag/insertFlag";
import {deleteFlag} from "../../utils/flag/deleteFlag";
import {updateFlag} from "../../utils/flag/updateFlag";

const {validationResult} = require('express-validator');

export async function getAllFlagsController(request: Request, response: Response): Promise<Response | void> {
    try {
        const data = await selectAllFlags();
        //return a response
        return response.json({status: 200, message: null, data});
    } catch(error) {
        console.error(error);
        return response.json({status: 200, message: error.message, data: null});
    }
}

export async function insertFlagController(request: Request, response: Response) {
    try {
        const {flagMessage} = request.body;

        const flagEventId = <string>request.session?.event.eventId;
        const flagUserId = <string>request.session?.user.userId;

        const flag: Flag = {
            flagEventId,
            flagUserId,
            flagMessage
        }

        const result = await insertFlag(flag);
        return response.json({status: 200, message: result ?? 'Flag successfully inserted', data: null});
    } catch (error) {
        console.error(error);
        return response.json({status: 200, message: error.message, data: null});
    }
}

export async function updateFlagController(request: Request, response: Response) {
    try {
        const {flagEventId, flagUserId, flagMessage} = request.body;

        const flag: Flag = {
            flagEventId,
            flagUserId,
            flagMessage
        }

        const result = await updateFlag(flag);
        return response.json({status: 200, message: result ?? 'Flag successfully updated', data: null});

    } catch (error) {
        console.error(error);
        return response.json({status: 200, message: error.message, data: null});
    }
}

export async function deleteFlagController(request: Request, response: Response) {
    try {
        const {flagEventId, flagUserId, flagMessage} = request.body;
        const flag: Flag = {
            flagEventId,
            flagUserId,
            flagMessage
        }
        const result = await deleteFlag(flag);
        return response.json({status: 200, data: null, message: result ?? 'Flag successfully deleted'});
    } catch (error) {
        console.error({status: 200, message: error.message, data: null});
    }
}