import {selectAllBookmarkedEvents} from "../../utils/bookmarkedEvent/selectAllBookmarkedEvents";
import {Request, Response} from 'express';
import {Status} from "../../utils/interfaces/Status";
import{User} from "../../utils/interfaces/User";
import {BookmarkedEvent} from "../../utils/interfaces/BookmarkedEvent";
import {insertEvent} from "../../utils/event/insertEvent";
import {selectBookmarkByBookmarkId} from "../../utils/bookmarkedEvent/selectBookmarkByBookmarkId";
import {deleteBookmarkedEvent} from "../../utils/bookmarkedEvent/deleteBookmarkedEvent";
import {insertBookmarkedEvent} from "../../utils/bookmarkedEvent/insertBookmarkedEvent";


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