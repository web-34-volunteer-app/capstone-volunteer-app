import {Request, Response} from "express";
import {insertVolunteer} from "../../utils/volunteer/insertVolunteer";
import {Status} from "../../utils/interfaces/Status";
import {Volunteer} from "../../utils/interfaces/Volunteer";
import {selectAllVolunteers} from "../../utils/volunteer/selectAllVolunteers";
import {selectVolunteerByUserId} from "../../utils/volunteer/selectVolunteerByUserId";
import {selectVolunteerByEventId} from "../../utils/volunteer/selectVolunteerByEventId";
import {selectVolunteerByUserIdEventId} from "../../utils/volunteer/selectVolunteerByUserIdEventId"
import {updateVolunteer} from "../../utils/volunteer/updateVolunteer";
import {deleteVolunteer} from "../../utils/volunteer/deleteVolunteer";

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

export async function getVolunteerByVolunteerUserIdController(request: Request, response: Response): Promise<Response<Status>> {
    try {
        const {volunteerUserId} = request.params;
        const data = await selectVolunteerByUserId(volunteerUserId) as Volunteer[];
        const status: Status = {status: 200, message: null, data};
        return response.json(status);
    } catch(e) {
        return response.json({
            status:500,
            message:"",
            data:[]
        })
    }
}

export async function getVolunteerByVolunteerEventIdController(request: Request, response: Response): Promise<Response<Status>> {
    try {
        const {volunteerEventId} = request.params;
        const data = await selectVolunteerByEventId(volunteerEventId) as Volunteer[];
        const status: Status = {status: 200, message: null, data};
        return response.json(status);
    } catch (e) {
        return response.json({
            status: 500,
            message: "",
            data: []
        })
    }
}

//UserId as url parameters, eventId as body
export async function putVolunteerController(request: Request, response: Response) : Promise<Response> {
    try {
        const {volunteerUserId, volunteerEventId} = request.params;
        console.log("user id: ", volunteerUserId);
        console.log("event id: ", volunteerEventId);
        const {volunteerHours, volunteerHoursPosterVerified, volunteerHoursVolunteerVerified} = request.body;

        const preFormUpdate = async (volunteer: Volunteer) : Promise<Response> => {
            const previousVolunteer: Volunteer|null = await selectVolunteerByUserIdEventId(<string>volunteerUserId, <string>volunteerEventId);
            const newVolunteer: Volunteer|null = {...previousVolunteer, ...volunteer};

            for(let key in newVolunteer) {
                //@ts-ignore
                newVolunteer[key] = volunteer[key] ?? previousVolunteer[key];
            }
            console.log("new volunteer: ", newVolunteer);
            await updateVolunteer(newVolunteer);
            return response.json({status: 200, data: null, message: "Volunteer successfully updated"})
        }
        const updateFailed = (message: string) : Response => {
            return response.json({status: 400, data: null, message})
        }

        let pass = true;
        return pass
            ? preFormUpdate({volunteerUserId, volunteerEventId, volunteerHours, volunteerHoursPosterVerified, volunteerHoursVolunteerVerified})
            : updateFailed("you are not allowed to pre-form this action");
    } catch(e : any) {
        return response.json( {
            status:400,
            data: null,
            message: e.message
        })
    }
}

export async function deleteVolunteerController(request: Request, response: Response) : Promise<Response> {
    try{
        const {volunteerUserId, volunteerEventId} = request.params;
        const result = await selectVolunteerByUserIdEventId(volunteerUserId, volunteerEventId) as Volunteer;
        await deleteVolunteer(result);
        const status: Status = {
            status:200,
            message: 'Volunteer successfully deleted',
            data:null
        };
        return response.json(status);
    } catch(e : any) {
        return response.json( {
            status:400,
            data: null,
            message: e.message
        })
    }
}