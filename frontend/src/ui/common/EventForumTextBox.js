import React from "react";
import {Form} from "react-bootstrap";

export const EventForumTextBox = (props) => {
    return(
        <Form>
            <Form.Control
                as={"textarea"}
                id={props.parentId + "textarea"}
                value={props.value}
                rows={3}
            />
        </Form>
    );
}