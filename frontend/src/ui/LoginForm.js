import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import * as Yup from "yup";
import {httpConfig} from "../utils/httpConfig";
import {Formik} from "formik";
import {useDispatch} from "react-redux";
import jwt_decode from "jwt-decode"
import {getAuth} from "../store/auth";
import { useHistory } from "react-router-dom"

export function LoginForm(){

const history = useHistory()



    const dispatch = useDispatch()

    const validator = Yup.object().shape({
        userEmail: Yup.string()
            .email("email must be a valid email")
            .required('email is required'),
        userPassword: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least eight characters")
    });

    const signIn = {
        userEmail:"",
        userPassword:"",
    };

    const submitSignIn = (values, {resetForm, setStatus}) => {
        httpConfig.post("/apis/sign-in/", values)
            .then(reply => {
                let {message, type} = reply;
                setStatus({message, type});
                if(reply.status === 200 && reply.headers["authorization"]) {
                    window.localStorage.removeItem("authorization");
                    window.localStorage.setItem("authorization", reply.headers["authorization"]);
                    resetForm();
                    let jwtToken = jwt_decode(reply.headers["authorization"]);
                    dispatch(getAuth(jwtToken));
                    history.push("/user-profile");
                }
                setStatus({message, type});
            });
    };


    return (
        <>
            <Formik initialValues={signIn} onSubmit={submitSignIn} validationSchema={validator}>
                {LoginFormContent}
            </Formik>
        </>
    )
};

function LoginFormContent(props){
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
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Login Email</Form.Label>
                    <Form.Control
                        id="userEmail"
                        type="email"
                        placeholder="login email"
                        value={values.userEmail}
                        onChange={handleChange}
                        onBlur={handleBlur}

                    />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        id="userPassword"
                        type="password"
                        placeholder="Password"
                        value={values.userPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Form.Group>
                {errors.userPassword && touched.userPassword && (
                    <div className="alert alert-danger">{errors.userPassword}</div>
                )}
            </Row>
            <Button className="registerButton" id="LoginForm" variant="primary" type="submit">
                Log In
            </Button>
            {status && (<div className={status.type}>{status.message}</div>)}
        </Form>


    )
}

