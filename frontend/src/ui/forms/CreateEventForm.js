import React from "react";
import {Col, Row} from "react-bootstrap";
import {Form} from "react-bootstrap";
import {Button} from "react-bootstrap";
import * as Yup from "yup";
import {httpConfig} from "../../utils/httpConfig";
import {Formik} from "formik";
import {useDispatch} from "react-redux";
import {fetchAllEvents} from "../../store/event";
import '../style.css'
import {fetchCoordinatedEventByUserId} from "../../store/eventscoordinatedbycurrentuser";

export function CreateEventForm(props) {
    const formValues = {
        eventAddress: "",
        eventDate: "",
        eventDescription: "",
        eventDescriptionSkillsRequired: "",
        eventDescriptionTransportation: false,
        eventDescriptionTypeOfWork: "",
        eventEndTime: "",
        eventFlag: false,
        eventLatitude: "",
        eventLongitude: "",
        eventOrganization: "",
        eventStartTime: "",
        eventTitle: "",
    }
    const dispatch = useDispatch()
    const validator = Yup.object().shape({})
    const submitForm = (values, {resetForm, setStatus}) => {

        // alert(JSON.stringify(values));
        const formValues = {...values};
        formValues.eventStartTime = formValues.eventDate + " " + formValues.eventStartTime + ":00.000"
        formValues.eventEndTime = formValues.eventDate + " " + formValues.eventEndTime + ":00.000"
        // alert(JSON.stringify(formValues));
        httpConfig.post("/apis/event/", formValues).then(reply => {
            let {message, type} = reply;

            if (reply.status === 200) {
                dispatch(fetchAllEvents());
                dispatch(fetchCoordinatedEventByUserId());
                props.handleClose();
                alert("Event Successfully Created");
                resetForm();
            }
            setStatus({message, type});
            return (reply);
        });
    };
    return (
        <>
            <Formik
                initialValues={formValues}
                onSubmit={submitForm}
                validationSchema={validator}>
                {CreateEventFormContent}
            </Formik>
        </>
    )
}

const CreateEventFormContent = (props) => {
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
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Row className={"p-2"}>
                    <Form.Label column="lg" className="EventInfo text-white">
                        Event Information
                    </Form.Label>
                </Row>
                <Row className={"mt-3"}>
                    <Col>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            id="eventTitle"
                            name="eventTitle"
                            size="text"
                            type="text"
                            value={values.eventTitle}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Col>
                    <Col>
                        <Form.Label>Organization</Form.Label>
                        <Form.Control
                            id="eventOrganization"
                            name="eventOrganization"
                            size="text"
                            type="text"
                            value={values.eventOrganization}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            id="eventAddress"
                            name="eventAddress"
                            type="text"
                            value={values.eventAddress}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Event Date</Form.Label>
                        <Form.Control
                            id="eventDate"
                            name="eventDate"
                            type="date"
                            value={values.eventDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Col>
                </Row>
                <Row className={"mt-3"}>
                    <Col>
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control
                            id="eventStartTime"
                            name="eventStartTime"
                            type="time"
                            value={values.eventStartTime}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Col>
                    <Col>
                        <Form.Label>End Time</Form.Label>
                        <Form.Control
                            id="eventEndTime"
                            name="eventEndTime"
                            type="time"
                            value={values.eventEndTime}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Volunteer Category</Form.Label>
                        <Form.Control
                            id="eventDescriptionTypeOfWork"
                            name="eventDescriptionTypeOfWork"
                            type="text"
                            placeholder="Optional"
                            value={values.eventDescriptionTypeOfWork}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Skills Needed</Form.Label>
                        <Form.Control
                            id="eventDescriptionSkillsRequired"
                            name="eventDescriptionSkillsRequired"
                            type="text"
                            placeholder="Optional"
                            value={values.eventDescriptionSkillsRequired}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Col>
                </Row>
                <Row className={"mt-3"}>
                    <Form.Group>
                        <Form.Check
                            type="checkbox"
                            label="Transportation Provided"
                            id="eventDescriptionTransportation"
                            name="eventDescriptionTransportation"
                            value={values.eventDescriptionTransportation}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Group>
                </Row>
                <Row className={"mt-3"}>
                    <Form.Group className="mb-3"
                        // controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            id="eventDescription"
                            name="eventDescription"
                            value={values.eventDescription}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            rows={3}/>
                    </Form.Group>
                </Row>
                <Button
                    variant="primary"
                    className={"registerButton align-content-center"}
                    type="submit"
                >Create</Button>
                {status && (<div className={status.type}>{status.message}</div>)}
            </Form>
        </>
    );
}