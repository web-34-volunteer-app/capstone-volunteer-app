import React from 'react';
import {Table} from "react-bootstrap";
import {Dropdown} from "react-bootstrap";

export function EventsAttending() {
    return(
        <>
        <div className={"border border-2 text-center py-1"}><h5>Events Attending</h5></div>
        <Table striped bordered hover>
            <thead>

                <tr>
                <th>#</th>
                <th>Event Name</th>
                <th>Event Description</th>
                <th>Location</th>
                <th>Date</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>Homeless Shelter</td>
                <td>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. </td>
                <td>101 South Baird Street, NY, New York</td>
                <td>30 September, 2021 4:30 EST</td>
                <td>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Status
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Attending</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Unregister</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Contact</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
            <tr>
                <td>1</td>
                <td>Food Drive</td>
                <td>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. </td>
                <td>555 Jordan Street, NY, New York</td>
                <td>18 November, 2021 5:30 EST</td>
                <td>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Status
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Attending</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Unregister</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Contact</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
            </tbody>
        </Table>
        </>
    )

}