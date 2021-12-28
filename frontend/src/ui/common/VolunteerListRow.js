import React, {useContext, useEffect, useState} from "react";
import {Accordion, Row} from "react-bootstrap";
import {ValidateHoursCoordinatorForm} from "../forms/ValidateHoursCoordinatorForm";
import {EventContext} from "./EventList";
import {EventStatusContext} from "./EventListRow";

export const VolunteerListRow = (props) => {
    const {event} = useContext(EventContext);
    const {eventStatus} = useContext(EventStatusContext);

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

    const [hoursValidated, setHoursValidated] = useState(
        props.volunteer.volunteerHoursPosterVerified &&
        props.volunteer.volunteerHoursVolunteerVerified);
    useEffect(() => {
        setHoursValidated(
            props.volunteer.volunteerHoursPosterVerified &&
            props.volunteer.volunteerHoursVolunteerVerified);
    }, [props.volunteer.volunteerHoursPosterVerified, props.volunteer.volunteerHoursVolunteerVerified]);

    const displayValidateHoursForm = () => {
        if (eventStatus.isPast) {
            return (
                <>
                    <h6>
                        {props.volunteer.volunteerHours}
                    </h6>
                    <ValidateHoursCoordinatorForm
                        key={'validateHoursForm' + props.volunteer.volunteerUserId + props.volunteer.volunteerEventId}
                        event={event}
                        user={props.user}
                        validated={hoursValidated}
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

