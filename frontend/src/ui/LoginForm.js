import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";

export function LoginForm(){
    return (
        <>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>User Name</Form.Label>
                        <Form.Control id="loginFormUserName" type="text" placeholder="User Name" />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control id="loginFormPassword" type="password" placeholder="Password" />
                    </Form.Group>
                </Row>
                <Button id="registerFormSubmit" variant="primary" type="submit" onClick={login}>
                    Log In
                </Button>
            </Form>
        </>
    )
}

function login() {
}