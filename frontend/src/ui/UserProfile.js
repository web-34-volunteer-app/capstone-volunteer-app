import React from "react";
import {Container} from "react-bootstrap";

export function UserProfile () {
    return (
        <>
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