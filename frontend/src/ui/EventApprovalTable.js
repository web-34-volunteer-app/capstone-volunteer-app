import React from 'react';
import {Table} from "react-bootstrap";
import {Dropdown} from "react-bootstrap";

export function EventApprovalTable() {
    return(
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Event Name</th>
                <th>Event Description</th>
                <th>Decision </th>
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
                            Status
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Approve</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Deny</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Contact</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
            <tr>
                <td>1</td>
                <td>Paint Local Shelter</td>
                <td>Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</td>
                <td>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Status
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Approve</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Deny</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Contact</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
            </tbody>
        </Table>
    )

}