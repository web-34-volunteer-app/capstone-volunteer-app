import {selectAllBookmarkedEvents} from "../../utils/bookmarkedEvent/selectAllBookmarkedEvents";
import {Request, Response} from 'express';
import {Status} from "../../utils/interfaces/Status";
import{User} from "../../utils/interfaces/User";
import {BookmarkedEvent} from "../../utils/interfaces/BookmarkedEvent";
import {insertEvent} from "../../utils/event/insertEvent";
import {selectBookmarkByBookmarkId} from "../../utils/bookmarkedEvent/selectBookmarkByBookmarkId";
import {deleteBookmarkedEvent} from "../../utils/bookmarkedEvent/deleteBookmarkedEvent";
import {insertBookmarkedEvent} from "../../utils/bookmarkedEvent/insertBookmarkedEvent";
import {selectEventByEventUserId} from "../../utils/event/selectEventByEventUserId";
import {Event} from "../../utils/interfaces/Event";
import {selectBookmarkedEventsByUserId} from "../../utils/bookmarkedEvent/selectBookmarkedEventsByUserId";
import {selectAllEvents} from "../../utils/event/selectAllEvents";


export async function getAllBookmarkedEventsController (request: Request, response: Response): Promise<Response<Status>> {

    try {
        const data = await selectAllBookmarkedEvents()
        //return the response
        const status: Status = {status: 200, message: null, data};
        return response.json(status);
    } catch(error){
        return response.json({
            status:500,
            message:"",
            data:[]
        })
    }
}


export async function getBookmarkedEventsByUserIdController (request: Request, response: Response): Promise<Response<Status>> {
    try {
        console.log('trying to display bookmarks')
        const user : User = request.session.user as User
        const userId : string = <string>user.userId
        const data = await selectBookmarkedEventsByUserId(userId) as Event[]
        //return the response
        const status: Status = {status: 200, message: null, data};
        return response.json(status);
    } catch(error){
        return response.json({
            status:500,
            message:"",
            data:[]
        })
    }
}



export async function toggleBookMarkController(request: Request, response: Response): Promise<Response<string>> {

    try {
        const {bookmarkedEventEventId} = request.params;
        const bookmarkedEventUserId = <string>request?.session?.user?.userId
        console.log("EventId:",bookmarkedEventEventId)
        console.log("SessionUser:",bookmarkedEventUserId)
        const bookmarkedEvent: BookmarkedEvent = {
            bookmarkedEventEventId,
            bookmarkedEventUserId

        }
        console.log("bookedMarkEvent:",bookmarkedEvent)
        const select = await selectBookmarkByBookmarkId(bookmarkedEvent)
        // @ts-ignore
        if (select){
            const result = await deleteBookmarkedEvent(bookmarkedEvent)
        }else{
            const result = await insertBookmarkedEvent(bookmarkedEvent)
        }

        const status: Status = {
            status: 200,
            message: 'Bookmark successfully updated',
            data: null
        };
        return response.json(status);

    } catch(error:any) {
        return(response.json({status: 500, data: null, message: error.message}))
    }
}












// export async function getAllBookmarkedEventsController(request: Request, response: Response): Promise<Response | void> {
//     try {
//         const data = await selectAllBookmarkedEvents();
//         // return the
//     }
// }