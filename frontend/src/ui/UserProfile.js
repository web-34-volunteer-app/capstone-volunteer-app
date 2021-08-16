import React from "react";
import {UserOverview} from "./UserOverview";
import {EventApprovalTable} from "./EventApprovalTable";


export function UserProfile () {
    return (
        <>
            <UserOverview/>
            <EventApprovalTable/>
        </>
    )
}