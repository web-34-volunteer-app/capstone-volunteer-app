import React from "react";
import {Accordion} from "react-bootstrap";

export const VolunteerListRow = (props) => {

    const displayVolunteer = () => {
        if(props.user && props.volunteer) {
            return (
                <h6 className={"col-7"}>
                    <strong>
                        {props.user.userFirstName + " " + props.user.userLastName}
                    </strong>
                </h6>
            )
        }
    }

    return (
        <Accordion.Item eventKey={props.user.userId}>
            <Accordion.Header>
                {displayVolunteer()}
            </Accordion.Header>
        </Accordion.Item>
    )
}