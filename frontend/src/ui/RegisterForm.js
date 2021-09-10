import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import * as Yup from "yup";
import {httpConfig} from "../utils/httpConfig";
import {Formik} from "formik";

export function RegisterForm(props) {
    const formValues = {
        userFirstName: "",
        userLastName: "",
        userEmail: "",
        userPassword: "",
        userPasswordConfirm: "",
        userZipCode: "",
        userAllowContact: false
    }

    const validator = Yup.object().shape({})
    const submitForm = (values, {resetForm, setStatus}) => {
        alert(JSON.stringify(values));
        const formValues = {...values};
        httpConfig.post("/apis/sign-up/", formValues).then(reply => {
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
                {SignUpFormContent}
            </Formik>
        </>
    )
}

const SignUpFormContent = (props) => {
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

    return (<Form onSubmit={handleSubmit}>
        <Row className="mb-3">
            <Form.Group as={Col}>
                <Form.Label>First Name</Form.Label>
                <Form.Control id="registerFormFirstName" type="text" placeholder="First Name"
                              name="userFirstName"
                              value={values.userFirstName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                />
            </Form.Group>

            <Form.Group as={Col}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control id="registerFormLastName" type="text" placeholder="Last Name"
                              name="userLastName"
                              value={values.userLastName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                />
            </Form.Group>
        </Row>


        <Row className="mb-3">
            <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control id="registerFormEmail" type="email" placeholder="Enter email"
                              name="userEmail"
                              value={values.userEmail}
                              onChange={handleChange}
                              onBlur={handleBlur}
                />
            </Form.Group>

            <Form.Group as={Col}>
                <Form.Label>Confirm Email</Form.Label>
                <Form.Control id="registerFormEmailConfirm" type="email" placeholder="Confirm Email"
                              name="confirmUserEmail"
                />
            </Form.Group>


        </Row>

        <Row className="mb-3">
            <Form.Group as={Col}>
                <Form.Label>Password</Form.Label>
                <Form.Control id="registerFormPassword" type="password" placeholder="Password"
                              name="userPassword"
                              value={values.userPassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                />
            </Form.Group>

            <Form.Group as={Col}>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control id="registerFormPasswordConfirm" type="password"
                              placeholder="Confirm Password"
                              name="userPasswordConfirm"
                              value={values.userPasswordConfirm}
                              onChange={handleChange}
                              onBlur={handleBlur}
                />
            </Form.Group>
        </Row>

        <Row className="mb-3">
            {/*<Form.Group as={Col}>*/}
            {/*    <Form.Label>City</Form.Label>*/}
            {/*    <Form.Control id="registerFormCity" type="text" placeholder="City"/>*/}
            {/*</Form.Group>*/}

            {/*<Form.Group as={Col}>*/}
            {/*    <Form.Label>State</Form.Label>*/}
            {/*    <Form.Control id="registerFormState" type="text" placeholder="State"/>*/}
            {/*    /!*<Form.Select defaultValue="Choose...">*!/*/}
            {/*    /!*    <option>Choose...</option>*!/*/}
            {/*    /!*    <option>...</option>*!/*/}
            {/*    /!*</Form.Select>*!/*/}
            {/*</Form.Group>*/}

            <Form.Group as={Col}>
                <Form.Label>Zip</Form.Label>
                <Form.Control id="registerFormZip" type="text" placeholder="Zip Code"
                              name="userZipCode"
                              value={values.userZipCode}
                              onChange={handleChange}
                              onBlur={handleBlur}
                />
            </Form.Group>
        </Row>

        <Form.Group className="mb-3">
            <Form.Check type="checkbox" label="Allow Contact"
                        name="userAllowContact"
                        value={values.userAllowContact}
                        onChange={handleChange}
                        onBlur={handleBlur}
            />
        </Form.Group>
        <Button id="registerFormSubmit" variant="primary" type="submit">
            Submit
        </Button>
    </Form>
    )
}

// function registerUser() {
//     const user = {
//         firstName: document.getElementById("registerFormFirstName").value,
//         lastName: document.getElementById("registerFormLastName").value,
//         email: document.getElementById("registerFormEmail").value,
//         city: document.getElementById("registerFormCity").value,
//         state: document.getElementById("registerFormState").value,
//         zip: document.getElementById("registerFormZip").value
//     }
// }