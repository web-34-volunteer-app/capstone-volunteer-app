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
import {selectEventByEventId} from "../../utils/event/selectEventbyEventId";
import {selectWholeUserByUserId} from "../../utils/user/selectWholeUserByUserId";
import {updateUser} from "../../utils/user/updateUser";
import {User} from "../../utils/interfaces/User";
import {selectVolunteerByCoordinatorUserId} from "../../utils/volunteer/selectVolunteerByCoordinatorUserId";

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

export async function getVolunteerByCurrentVolunteerUserIdController(request: Request, response: Response): Promise<Response<Status>> {
    try {
        const user: User = request.session.user as User
        const userId: string = <string>user.userId
        const data = await selectVolunteerByUserId(userId) as Volunteer[]
        //return the response
        const status: Status = {status: 200, message: null, data};
        return response.json(status);
    } catch(error: any) {
        return response.json({
            status:500,
            message:error.message,
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

export async function getVolunteersByCoordinatorUserIdController(request: Request, response: Response) : Promise<Response<Status>> {
    try {
        const coordinator: User = request.session.user as User;
        const userId: string = <string>coordinator.userId;
        const data = await selectVolunteerByCoordinatorUserId(userId) as Volunteer[];

        const status: Status = {
            status: 200,
            message: "SUCCESS: Got Volunteers For Coordinator",
            data
        };
        return response.json(status);
    } catch (error: any) {
        return response.json({
            status: 500,
            message: error.message,
            data: []
        })
    }
}

export async function getVolunteerByVolunteerUserIdVolunteerEventIdController(request: Request, response: Response) : Promise<Response<Status>> {
    try {
        const {volunteerUserId, volunteerEventId} = request.params;

        const data = await selectVolunteerByUserIdEventId(volunteerUserId, volunteerEventId) as Volunteer;

        const status: Status = {
            status: 200,
            message: "SUCCESS: Got Volunteer from UserId and EventId",
            data
        };
        return response.json(status);
    } catch (error: any) {
        return response.json({
            status: 500,
            message: error.message,
            data: []
        })
    }
}

//UserId as url parameters, eventId as body
export async function putVolunteerController(request: Request, response: Response) : Promise<Response> {
    try {
        const {volunteerUserId, volunteerEventId} = request.params;

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

export async function verifyVolunteerController(request: Request, response: Response) : Promise<Response> {
    try {
        const {volunteerUserId, volunteerEventId} = request.params;
        const previousVolunteer = await selectVolunteerByUserIdEventId(volunteerUserId, volunteerEventId);


        const sessionUserId = <string>request.session?.user?.userId;
        const event = await selectEventByEventId(volunteerEventId);
        const eventUserId = <string>event?.eventUserId;

        let volunteerHours: number;
        let volunteerHoursPosterVerified: boolean;
        let volunteerHoursVolunteerVerified: boolean;

        if(sessionUserId === volunteerUserId) {
            console.log("Verify by volunteer");
            volunteerHoursVolunteerVerified = request.body.volunteerHoursVolunteerVerified;
            volunteerHoursPosterVerified = previousVolunteer?.volunteerHoursPosterVerified ?? false;
        } else if (sessionUserId === eventUserId) {
            console.log("Verify by poster");
            volunteerHoursPosterVerified = request.body.volunteerHoursPosterVerified;
            volunteerHoursVolunteerVerified = previousVolunteer?.volunteerHoursVolunteerVerified ?? false;
        } else {
            console.log("Verify by admin?");
            volunteerHoursPosterVerified = previousVolunteer?.volunteerHoursPosterVerified ?? false;
            volunteerHoursVolunteerVerified = previousVolunteer?.volunteerHoursVolunteerVerified ?? false;
        }

        //Update User and Volunteer Hours
        if(volunteerHoursPosterVerified && volunteerHoursVolunteerVerified) {
            let eventEnd = event?.eventEndTime as Date;
            console.log("eventEnd: ", eventEnd)
            let endTime = eventEnd.getTime();
            console.log("endTime: ",endTime);
            let eventStart = event?.eventStartTime as Date;
            console.log("eventStart: ", eventStart);
            let startTime = eventStart.getTime();
            console.log("startTime: ", startTime);
            let totalTime = endTime - startTime;
            console.log("totalTime: ", totalTime);
            let totalHours = totalTime / (1000 * 3600);
            console.log("totalHours: ", totalHours);
            volunteerHours = Number(totalHours.toFixed(2)) ?? 0.00;
            console.log("volunteerHours: ", volunteerHours);

            let user = await selectWholeUserByUserId(volunteerUserId);
            let userTotalHours = Number(user.userTotalHours) + volunteerHours;
            console.log("userTotalHours: ", userTotalHours);
            const newUser = {...user, userTotalHours}
            await updateUser(newUser);
        } else {
            volunteerHours = previousVolunteer?.volunteerHours ?? 0.00;
        }

        const newVolunteer: Volunteer = {
            volunteerEventId: previousVolunteer?.volunteerEventId ?? volunteerEventId,
            volunteerUserId: previousVolunteer?.volunteerUserId ?? volunteerUserId,
            volunteerHours,
            volunteerHoursPosterVerified,
            volunteerHoursVolunteerVerified
        }
        console.log("Hello?");
        console.log("Updating volunteer with info: ", newVolunteer);
        const preFormUpdate = async (volunteer: Volunteer) : Promise<Response> => {

            await updateVolunteer(volunteer);
            return response.json({status: 200, data: null, message: "Volunteer successfully updated"})
        }
        const updateFailed = (message: string) : Response => {
            return response.json({status: 400, data: null, message})
        }
        let pass = true;
        return pass
            ? preFormUpdate(newVolunteer)
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

export async function deleteVolunteerBySelfController(request: Request, response: Response) : Promise<Response> {
    try{
        const {volunteerEventId} = request.params;
        const volunteerUserId = <string>request.session?.user?.userId
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