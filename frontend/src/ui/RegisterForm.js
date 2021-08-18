import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";

export function RegisterForm(){
    return (
        <>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control id="registerFormFirstName" type="text" placeholder="First Name" />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control id="registerFormLastName" type="text" placeholder="Last Name" />
                    </Form.Group>
                </Row>


                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control id="registerFormEmail" type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Confirm Email</Form.Label>
                        <Form.Control id="registerFormEmailConfirm" type="email" placeholder="Confirm Email" />
                    </Form.Group>


                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control id="registerFormPassword" type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control id="registerFormPasswordConfirm" type="password" placeholder="Confirm Password" />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>City</Form.Label>
                        <Form.Control id="registerFormCity" type="text" placeholder="City"/>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>State</Form.Label>
                        <Form.Control id="registerFormState" type="text" placeholder="State"/>
                        {/*<Form.Select defaultValue="Choose...">*/}
                        {/*    <option>Choose...</option>*/}
                        {/*    <option>...</option>*/}
                        {/*</Form.Select>*/}
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Zip</Form.Label>
                        <Form.Control id="registerFormZip" type="text" placeholder="Zip"/>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button id="registerFormSubmit" variant="primary" type="submit" onClick={registerUser}>
                    Submit
                </Button>
            </Form>
        </>
    )
}

function registerUser() {
    const user = {
        firstName: document.getElementById("registerFormFirstName").value,
        lastName: document.getElementById("registerFormLastName").value,
        email: document.getElementById("registerFormEmail").value,
        city: document.getElementById("registerFormCity").value,
        state: document.getElementById("registerFormState").value,
        zip: document.getElementById("registerFormZip").value
    }
}