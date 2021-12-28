import {useSelector} from "react-redux";
import * as Yup from "yup";
import {httpConfig} from "../../utils/httpConfig";
import {fetchUserByUserId} from "../../store/user";
import {Form} from "react-bootstrap";
import {Button} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {Formik} from "formik";
import {fetchVolunteersForCoordinator} from "../../store/volunteersForCoordinator";
import {StoreContext} from "../main/Home";
import {EventContext} from "../common/EventList";

export const ValidateHoursCoordinatorForm = (props) => {
    const {dispatch} = useContext(StoreContext);
    const {event} = useContext(EventContext);
    const validator = Yup.object().shape({});

    //Set up store for current user
    const currentUser = useSelector(state => state.user ? state.user : null);

    const [displayComponent, setDisplayComponent] = useState(null);
    const [formComponent, setFormComponent] = useState(null);
    const [displayLatch, setDisplayLatch] = useState(false);

    useEffect(() => {
        setDisplayComponent(formComponent);
    }, [formComponent, displayLatch]);

    const formValues = {
        validated: props.validated
    }

    const submitForm = (values, {setStatus}) => {
        if (currentUser) {
            if (currentUser.userId === event.eventUserId) {
                const volunteerFormValues =
                    {
                        volunteerHoursPosterVerified: true
                    }

                httpConfig.put(`/apis/volunteer/update/${props.user.userId}/${event.eventId}`, volunteerFormValues).then(reply => {
                    let {message, type} = reply;

                    if (reply.status === 200) {
                        dispatch(fetchVolunteersForCoordinator());
                        httpConfig.get(`/apis/volunteer/getByUserIdEventId/${props.user.userId}/${event.eventId}`).then(reply => {
                            if(reply.status === 200) {
                                const validated = reply.data.volunteerHoursPosterVerified &&
                                    reply.data.volunteerHoursVolunteerVerified

                                if (validated) {
                                    const userTotalHours = props.user.userTotalHours;
                                    const volunteerHours = reply.data.volunteerHours;
                                    const totalHours = parseFloat(userTotalHours) + parseFloat(volunteerHours);
                                    const userFormValues = {
                                        userTotalHours: totalHours
                                    }
                                    httpConfig.put(`/apis/user/updateWithoutAuth/${props.user.userId}`, userFormValues).then(reply => {
                                        let {message, type} = reply;
                                        if (reply.status === 200) {
                                            dispatch(fetchUserByUserId());
                                            setDisplayLatch(!validated);
                                            alert("Hours Recorded");
                                        }
                                        setStatus({message, type});
                                        return (reply);
                                    });
                                } else {
                                    alert("Hours Not Verified");
                                }
                            }

                        })

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
                    initialValues={formValues}
                    onSubmit={submitForm}
                    validationSchema={validator}
                    enableReinitialize={true}>
                    {displayFormContent}
                </Formik>
            </>
        )
        setDisplayLatch(true);
    }

    return (
        <>
            {displayComponent}
        </>
    )
}

const displayFormContent = (props) => {
    const {
        status,
        //values,
        // errors,
        // touched,
        // dirty,
        // isSubmitting,
        //handleChange,
        //handleBlur,
        handleSubmit,
        // handleReset
    } = props;

    const displayValidateButton = () => {
        if(!props.initialValues.validated) {
            return (
                    <Button
                        variant="primary"
                        className={"registerButton align-content-center"}
                        type="submit"
                    >
                        Validate
                    </Button>
                );
        } else {
            return (
                <Button
                    variant="primary"
                    className={"registerButton align-content-center"}
                    type="submit"
                    disabled={true}
                >
                    Validated
                </Button>
            );
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                {displayValidateButton()}
                {status && (<div className={status.type}>{status.message}</div>)}
            </Form>
        </>
    );
}