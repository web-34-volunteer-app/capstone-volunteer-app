import {selectAllBookmarkedEvents} from "../../utils/bookmarkedEvent/selectAllBookmarkedEvents";

const {validationResult} = require('express-validator');

export async function getAllBookmarkedEventsController(request: Request, response: Response): Promise<Response | void> {
    try {
        const data = await selectAllBookmarkedEvents();
        // return the
    }
}