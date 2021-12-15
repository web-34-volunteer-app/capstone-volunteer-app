import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import {httpConfig} from "../../utils/httpConfig";
import {fetchVolunteersForCurrentUser} from "../../store/volunteersForCurrentUser";
import {Col, Form, Row} from "react-bootstrap";
import {Button} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Formik} from "formik";

export const ValidateHoursVolunteerForm = (props) => {
    const dispatch = useDispatch();
    const validator = Yup.object().shape({});
    //Set up store for current user
    const currentUser = useSelector(state => state.user ? state.user : null);

    const [displayComponent, setDisplayComponent] = useState(null);
    const [formComponent, setFormComponent] = useState(null);
    const [displayLatch, setDisplayLatch] = useState(false);

    useEffect(() => {
        setDisplayComponent(formComponent);
    }, [formComponent, displayLatch]);

    httpConfig.get(`/apis/volunteer/getByUserIdEventId/${props.user.userId}/${props.event.eventId}`).then(reply => {
            if (reply.status === 200) {
                const volunteerFormValues = {
                    volunteerEndTime: "",
                    volunteerStartTime: "",
                    volunteerHours: reply.data.volunteerHours,
                    volunteerHoursVolunteerVerified: reply.data.volunteerHoursVolunteerVerified
                }

                const submitForm = (values, {setStatus}) => {
                    if (currentUser) {
                        if (currentUser.userId === props.user.userId) {
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
                            httpConfig.put(`/apis/volunteer/update/${props.user.userId}/${props.event.eventId}`, volunteerFormValues).then(reply => {
                                let {message, type} = reply;

                                if (reply.status === 200) {
                                    dispatch(fetchVolunteersForCurrentUser());
                                    setDisplayLatch(false);
                                    alert(alertMessage);
                                }
                                setStatus({message, type});
                                return (reply);
                            })
                        }
                    }
                }

                if(!displayLatch) {
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