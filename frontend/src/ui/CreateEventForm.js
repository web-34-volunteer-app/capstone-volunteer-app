import React from "react";
import {Col, Row} from "react-bootstrap";
import {Form} from "react-bootstrap";
import {Button} from "react-bootstrap";
import * as Yup from "yup";
import {httpConfig} from "../utils/httpConfig";
import {Formik} from "formik";

export function CreateEventForm(props) {
    const formValues = {
        eventAddress: "",
        eventDate: "",
        eventDescription: "",
        eventDescriptionSkillsRequired: "",
        eventDescriptionTransportation: false,
        eventDescriptionTypeOfWork: "",
        eventEndTime: Date,
        eventFlag: false,
        eventLatitude: "",
        eventLongitude: "",
        eventOrganization: "",
        eventStartTime: "",
        eventTitle: "",
    }

    const validator = Yup.object().shape({})
    const submitForm = (values, {resetForm, setStatus}) => {
        alert(JSON.stringify(values));
        const formValues = {...values};
        httpConfig.post("/apis/event/", formValues).then(reply => {
            let {message, type} = reply;

            if (reply.status === 200) {
                resetForm();
            }
            setStatus({message, type});
            return (reply);
        })
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
        errors,
        touched,
        dirty,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset
    } = props;



    return(
        <>
            <Form onSubmit={handleSubmit}>
                <Row className={"p-2"}>
                    <Form.Label column="lg" className="bg-dark text-white">
                        Event Information
                    </Form.Label>
                </Row>
                <Row className={"mt-3"}>
                    <Col>
                        <Form.Label>Event Title</Form.Label>
                        <Form.Control
                            id="eventTitle"
                            name="eventTitle"
                            size="text"
                            type="text"
                            placeholder="Event Name"
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
                            placeholder="Organization"
                            value={values.eventOrganization}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Event Address</Form.Label>
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
                            type="date"
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
                            type="date"
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

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Event Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Event Description"
                        id="eventDescription"
                        name="eventDescription"
                        value={values.eventDescription}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows={3}/>
                </Form.Group>
</Row>
                <Button
                    variant="outline-success"
                    className={"align-content-center"}
                    type="submit"
                >Create</Button>
                {status && (<div className={status.type}>{status.message}</div>)}
            </Form>
        </>
    )

}