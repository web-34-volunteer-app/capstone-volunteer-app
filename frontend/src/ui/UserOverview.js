import React from 'react';
import {Col, Container, Image} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserByUserId} from "../store/user";

export const  UserOverview =()=> {
    const dispatch = useDispatch()
    const user = useSelector(state => {return state.users ? state.users : null})
console.log(user)
    const sideEffects = () => {
        dispatch(fetchUserByUserId())
    }

    React.useEffect(sideEffects, [dispatch])
    return (
        <>
            <Container className={"py-4"}>
                <div className={"d-flex justify-content-center"}>
                    <Col fill md={2} sm={6} className={"justify-content-center me-3"}>
                        <Image src="https://picsum.photos/200/200" alt="Profile Image Placeholder" fluid roundedCircle></Image>
                    </Col>
                    {user && <><Col user={user} userkey={user.userId} md={4} sm={6} className={"my-auto"}>

                        <h1>{user.userFirstName} {user.userLastName}</h1>
                        <h5>Zip Code: {user.userZipCode}</h5>
                        <h5>Total Volunteer Hours: {user.userTotalHours}</h5>
                    </Col></>}
                </div>
            </Container>
        </>
    )
}