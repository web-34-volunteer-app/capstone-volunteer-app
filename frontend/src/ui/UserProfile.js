import React from "react";
import {Container} from "react-bootstrap";
import {UserOverview} from "./UserOverview";
import {Map} from "./Map";
import {CreateEventForm} from "./CreateEventForm";
import {EventDetails} from "./EventDetails";

export function UserProfile () {
    return (
        <>
            <UserOverview/>
        </>
    )
}