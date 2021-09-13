import React from 'react';
import {Table} from "react-bootstrap";
import {Dropdown} from "react-bootstrap";

export function EventApprovalTable() {
    return(
        <>
            <div className={"border border-2 text-center py-1"}><h5>Pending Administration Action</h5></div>
        <Table responsive="sm" striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Event Name</th>
                <th>Event Comments/ Complaints</th>
                <th>Pending Action</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>Adopt a Pet</td>
                <td>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. </td>
                <td>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Action
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Approve</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Remove Event</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Contact Organizer</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
            </tbody>
        </Table>
        </>
    )

}