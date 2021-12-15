import React from "react";
import {Accordion, Row} from "react-bootstrap";
import {ValidateHoursCoordinatorForm} from "../forms/ValidateHoursCoordinatorForm";

export const VolunteerListRow = (props) => {
    const displayVolunteer = () => {
        if (props.user && props.volunteer) {
            return (
                <h6 className={"col-7"}>
                    <strong>
                        {props.user.userFirstName + " " + props.user.userLastName}
                    </strong>
                </h6>
            )
        }
    }

    const displayValidateHoursForm = () => {
        if (props.isPast) {

            return (
                <>
                    <h6>
                        {props.volunteer.volunteerHours}
                    </h6>
                    <ValidateHoursCoordinatorForm
                        key={'validateHoursForm' + props.volunteer.volunteerUserId + props.volunteer.volunteerEventId}
                        event={props.event}
                        user={props.user}
                        hours={props.volunteer.volunteerHours}
                    />
                </>
            )
        }
    }

    return (
        <Accordion.Item eventKey={props.user.userId}>
            <Accordion.Header>
                {displayVolunteer()}
            </Accordion.Header>
            <Accordion.Body>
                <Row>
                    {displayValidateHoursForm()}
                </Row>
            </Accordion.Body>
        </Accordion.Item>
    )
}

