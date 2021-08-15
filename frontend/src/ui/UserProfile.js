import React from "react";
import {Container} from "react-bootstrap";
import {UserOverview} from "./UserOverview";

export function UserProfile () {
    return (
        <>
            <UserOverview/>
                <Container>
                <label>First Name: </label>
                <input type="text"/>
                <label>Last Name: </label>
                <input type="text"/>
                <label>Primary Email: </label>
                <input type="text"/>
                <label>Member Since: </label>
                <label>Total Hours Volunteered: </label>
            </Container>
        </>
    )
}