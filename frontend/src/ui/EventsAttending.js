import React from 'react';
import {Button, Table} from "react-bootstrap";


export function EventsAttending() {
    return(
        <>
            <div className={"border border-2 text-center py-1"}><h5>Registered Events</h5></div>
            <Table responsive="sm" striped bordered hover>
                <thead>

                <tr>
                    <th>Event Title</th>
                    <th>Organization</th>
                    <th>Event Description</th>
                    <th>Event Address</th>
                    <th>Date</th>
                    <th>Take Action</th>
                </tr>
                </thead>
                <tbody>

                <tr>

                    <td>Food Drive</td>
                    <td>USO</td>
                    <td>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. </td>
                    <td>555 Jordan Street, NY, New York</td>
                    <td>18 November, 2021 5:30 EST</td>
                    <td>
                        <Button
                            className={"me-2 mt-3"}
                            id="registerFormSubmit"
                            variant="danger"
                            type="submit">
                            Unregister
                        </Button>
                    </td>
                </tr>
                </tbody>
            </Table>
        </>
    )

}