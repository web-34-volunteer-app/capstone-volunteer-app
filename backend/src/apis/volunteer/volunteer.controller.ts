import {Request, Response} from "express";
import {insertVolunteer} from "../../utils/volunteer/insertVolunteer";
import {Status} from "../../utils/interfaces/Status";
import {Volunteer} from "../../utils/interfaces/Volunteer";
import {selectAllVolunteers} from "../../utils/volunteer/selectAllVolunteers";

export async function postVolunteerController(request:Request, response:Response) {
    try {
        const {volunteerEventId} = request.params;
        const volunteerUserId = <string>request.session?.user?.userId

        const volunteerHours = 0.00;
        const volunteerHoursPosterVerified = false;
        const volunteerHoursVolunteerVerified = false;

        const volunteer: Volunteer = {
            volunteerEventId,
            volunteerUserId,
            volunteerHours,
            volunteerHoursPosterVerified,
            volunteerHoursVolunteerVerified
        };

        const result = await insertVolunteer(volunteer);
        const status: Status = {
            status:200,
            message: result ?? 'Volunteer created successfully',
            data:null
        };
        return response.json(status);

    } catch(e) {
        throw e;
    }
}

export async function getAllVolunteersController(request: Request, response: Response): Promise<Response<Status>> {
    try {
        const data = await selectAllVolunteers()
        const status: Status = {status: 200, message: null, data};
        return response.json(status);
    } catch(e : any) {
        return response.json({
            status:500,
            message:e.message,
            data:[]
        })
    }
}