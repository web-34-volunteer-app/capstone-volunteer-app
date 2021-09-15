import React from "react";
import {FormControl, InputGroup} from "react-bootstrap";
import './style.css'

export function SearchField (){
    return(
        <>
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
                <FormControl
                    aria-label="Search"
                    aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>
        </>
    )
}