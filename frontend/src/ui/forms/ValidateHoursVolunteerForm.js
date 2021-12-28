import * as Yup from "yup";
import {httpConfig} from "../../utils/httpConfig";
import {fetchVolunteersForCurrentUser} from "../../store/volunteersForCurrentUser";
import {Col, Form, Row} from "react-bootstrap";
import {Button} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {Formik} from "formik";
import {StoreContext} from "../main/Home";
import {EventContext} from "../common/EventList";
import {EventStatusContext} from "../common/EventListRow";

export const ValidateHoursVolunteerForm = () => {
    const {event} = useContext(EventContext);
    const {
        currentUser,
        dispatch
    } = useContext(StoreContext);
    const {eventStatus} = useContext(EventStatusContext);
    //END SETUP PROPS AND CONTEXTS

    const validator = Yup.object().shape({});
    const [displayComponent, setDisplayComponent] = useState(null);
    const [formComponent, setFormComponent] = useState(null);
    const [displayLatch, setDisplayLatch] = useState(false);
    const [visible, setVisible] = useState(eventStatus.isPast);

    useEffect(() => {
        if (visible) {
            setDisplayComponent(formComponent);
        } else {
            setDisplayComponent(null);
        }
    }, [visible, formComponent, displayLatch]);

    useEffect(() => {
        if (eventStatus.isPast) {
            setVisible(true);
        }
    }, [eventStatus.isPast]);

    httpConfig.get(`/apis/volunteer/getByUserIdEventId/${currentUser.userId}/${event.eventId}`).then(reply => {
            if (reply.status === 200) {
                const volunteerFormValues = {
                    volunteerEndTime: "",
                    volunteerStartTime: "",
                    volunteerHours: reply.data.volunteerHours,
                    volunteerHoursVolunteerVerified: reply.data.volunteerHoursVolunteerVerified
                }

                const submitForm = (values, {setStatus}) => {
                    if (currentUser) {
                        let volunteerFormValues, alertMessage;
                        if (!reply.data.volunteerHoursVolunteerVerified) {
                            const volunteerHours = values.volunteerEndTime - values.volunteerStartTime;
                            volunteerFormValues =
                                {
                                    volunteerHours: volunteerHours,
                                    volunteerHoursVolunteerVerified: true
                                }
                            alertMessage = "Hours Submitted for Verification";
                        } else {
                            volunteerFormValues =
                                {
                                    volunteerHours: 0,
                                    volunteerHoursVolunteerVerified: false
                                }
                            alertMessage = "Hours Reset"
                        }
                        httpConfig.put(`/apis/volunteer/update/${currentUser.userId}/${event.eventId}`, volunteerFormValues).then(reply => {
                            let {message, type} = reply;

                            if (reply.status === 200) {
                                dispatch(fetchVolunteersForCurrentUser());
                                setDisplayLatch(false);
                                alert(alertMessage);
                            }
                            setStatus({message, type});
                            return (reply);
                        });
                    }
                }

                if (!displayLatch) {
                    setFormComponent(
                        <>
                            <Formik
                                initialValues={volunteerFormValues}
                                onSubmit={submitForm}
                                validationSchema={validator}
                                enableReinitialize={true}>
                                {displayFormContent}
                            </Formik>
                        </>
                    )
                    setDisplayLatch(true);
                }

            }
        }
    )
    return (
        <>
            {displayComponent}
        </>

    )
}

const displayFormContent = (props) => {
    const {
        status,
        values,
        // errors,
        // touched,
        // dirty,
        // isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        // handleReset
    } = props;

    const displayFormComponents = () => {
        if (props.initialValues.volunteerHoursVolunteerVerified) {
            const formMessage = props.initialValues.volunteerHours + " Hours Submitted"
            return (
                <Row>
                    <Col>
                        <h6>{formMessage}</h6>
                    </Col>
                    <Col>
                        <Button
                            variant="primary"
                            className={"registerButton align-content-center"}
                            type="submit"
                        >
                            Cancel
                        </Button>
                    </Col>
                </Row>
            );
        } else {
            return (
                <Row>
                    <Col>
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control
                            id="volunteerStartTime"
                            name="volunteerStartTime"
                            size="text"
                            type="text"
                            value={values.volunteerStartTime}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Col>
                    <Col>
                        <Form.Label>End Time</Form.Label>
                        <Form.Control
                            id="volunteerEndTime"
                            name="volunteerEndTime"
                            size="text"
                            type="text"
                            value={values.volunteerEndTime}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Col>
                    <Col>
                        <Button
                            variant="primary"
                            className={"registerButton align-content-center"}
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Col>
                </Row>
            );
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                {displayFormComponents()}
                {status && (<div className={status.type}>{status.message}</div>)}
            </Form>
        </>
    );
}