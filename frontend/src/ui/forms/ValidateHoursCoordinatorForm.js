import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import {httpConfig} from "../../utils/httpConfig";
import {fetchVolunteersForCurrentUser} from "../../store/volunteersForCurrentUser";
import {fetchUserByUserId} from "../../store/user";
import {Form} from "react-bootstrap";
import {Button} from "react-bootstrap";
import React from "react";
import {Formik} from "formik";

export const ValidateHoursCoordinatorForm = (props) => {
    const volunteerFormValues = {
        volunteerEndTime: "",
        volunteerStartTime: ""
    }

    const dispatch = useDispatch();
    const validator = Yup.object().shape({});

    //Set up store for current user
    const currentUser = useSelector(state => state.user ? state.user : null);

    const submitForm = (values, {setStatus}) => {
        const currentUserIsVolunteer = () => {
            if (currentUser) {
                if (currentUser.userId === props.user.userId) {
                    return true;
                }
            }
            return false;
        }
        const currentUserIsCoordinator = () => {
            if (currentUser) {
                if (currentUser.userId === props.event.eventUserId) {
                    return true;
                }
            }
            return false;
        }

        const volunteerHours = values.volunteerEndTime - values.volunteerStartTime;
        const volunteerFormValues =
            (currentUserIsVolunteer() ?
                    {
                        volunteerHours: volunteerHours,
                        volunteerHoursVolunteerVerified: true
                    }
                    :
                    (currentUserIsCoordinator() ?
                            {
                                volunteerHours: volunteerHours,
                                volunteerHoursPosterVerified: true
                            }
                            :
                            {
                                volunteerHours: volunteerHours
                            }
                    )
            )

        httpConfig.put(`/apis/volunteer/update/${props.user.userId}/${props.event.eventId}`, volunteerFormValues).then(reply => {
            let {message, type} = reply;

            if (reply.status === 200) {
                dispatch(fetchVolunteersForCurrentUser());
                httpConfig.get(`/apis/volunteer/getByUserIdEventId/${props.user.userId}/${props.event.eventId}`).then(reply => {
                    let {message, type} = reply;
                    if (reply.status === 200) {
                        if (reply.data.volunteerHoursVolunteerVerified && reply.data.volunteerHoursPosterVerified) {
                            console.log("userTotalHours: " + parseFloat(props.user.userTotalHours));
                            console.log("volunteerHours: " + parseFloat(reply.data.volunteerHours));
                            const totalHours = parseFloat(props.user.userTotalHours) + parseFloat(props.hours);
                            console.log("totalHours: " + totalHours);
                            const userFormValues = {
                                userTotalHours: totalHours
                            }
                            httpConfig.put(`/apis/user/updateWithoutAuth/${props.user.userId}`, userFormValues).then(reply => {
                                let {message, type} = reply;
                                if (reply.status === 200) {
                                    dispatch(fetchUserByUserId());
                                    alert("Hours Recorded");
                                }
                                setStatus({message, type});
                                return (reply);
                            });
                        } else {
                            alert("Hours Submitted for Verification");
                        }
                    }

                });
            }
            setStatus({message, type});
            return (reply);
        })
    }

    return (
        <>
            <Formik
                initialValues={volunteerFormValues}
                onSubmit={submitForm}
                validationSchema={validator}>
                {displayFormContent}
            </Formik>
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
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Button
                    variant="primary"
                    className={"registerButton align-content-center"}
                    type="submit"
                >
                    Validate
                </Button>
                {status && (<div className={status.type}>{status.message}</div>)}
            </Form>
        </>
    );
}