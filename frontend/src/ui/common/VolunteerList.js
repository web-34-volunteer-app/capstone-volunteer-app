import React, {useContext} from "react";
import {useSelector} from "react-redux";

import {VolunteerListRow} from "./VolunteerListRow"
import {Accordion, Col} from "react-bootstrap";
import {fetchUsersForCoordinator} from "../../store/usersForCoordinator";
import {fetchVolunteersForCoordinator} from "../../store/volunteersForCoordinator";
import {StoreContext} from "../main/Home";
import {EventContext} from "./EventList";

export function VolunteerList() {
    const {
        dispatch
    } = useContext(StoreContext);
    const {event} = useContext(EventContext);

    //Set up store for Users
    const usersEffect = () => {
        dispatch(fetchUsersForCoordinator());
    }
    React.useEffect(usersEffect, [dispatch]);
    const users = useSelector(state => state.users_forCoordinator ? state.users_forCoordinator : null);

    //Set up store for Volunteers
    const volunteersEffect = () => {
        dispatch(fetchVolunteersForCoordinator());
    }
    React.useEffect(volunteersEffect, [dispatch]);
    const volunteers = useSelector(state => state.volunteers_forCoordinator ? state.volunteers_forCoordinator : null);

    const volunteerList = () => {
        let volunteerRow = [];
        if (users && volunteers) {
            volunteers.forEach(volunteer => {
                if (volunteer.volunteerEventId === event.eventId) {
                    users.forEach(user => {
                        if (user.userId === volunteer.volunteerUserId) {
                            let volunteerExists = false;
                            const volunteerListRow =
                                <VolunteerListRow
                                    key={'volunteerListRow' + volunteer.volunteerUserId}
                                    user={user}
                                    volunteer={volunteer}
                                />;
                            volunteerRow.forEach(volunteer => {
                                if (volunteer.key === volunteerListRow.key) {
                                    volunteerExists = true;
                                    return null;
                                }
                            })
                            if(!volunteerExists) {
                                volunteerRow.push(volunteerListRow);
                            }
                            return null;
                        }
                    })
                    return null;
                }
            })
        }
        return volunteerRow;
    }

    return (
        <>
            <Col md={12} className={"di-block mx-auto"}>
                <div className={"eventAttending text-center py-1"}>
                    <h5>Volunteers</h5>
                </div>
                <Accordion defaultActiveKey={0}>
                    {volunteerList()}
                </Accordion>
            </Col>
        </>
    )
}