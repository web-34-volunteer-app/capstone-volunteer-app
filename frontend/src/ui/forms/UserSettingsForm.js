import React from "react";
import {Button, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {httpConfig} from "../../utils/httpConfig";
import {getAuth} from "../../store/auth";
// import {Formik} from "formik";
// import * as Yup from "yup";

export function UserSettingsForm(props) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user ? state.user : null);

    const submitForm = () => {
        console.log("Submitting form, current user: " + JSON.stringify(currentUser));
        if (currentUser) {
            httpConfig.delete(`/apis/user/userId/${currentUser.userId}`).then(reply => {
                if (reply.status === 200) {
                    props.handleClose();
                    httpConfig.get('/apis/sign-out/').then(reply => {
                        if (reply.status === 200) {
                            window.localStorage.removeItem('authorization');
                            dispatch(getAuth(null));
                            window.location = '/';
                            alert("Account successfully removed.")
                        }
                    })
                } else {
                    console.log("Delete didn't work.");
                }
            })
        }
    }

    return (
        <>
            <Form>
                <Button onClick={submitForm}>
                    Remove User
                </Button>
            </Form>
        </>
    );
}