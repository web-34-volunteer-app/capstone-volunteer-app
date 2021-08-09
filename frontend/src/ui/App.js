import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Home} from "./Home";
export function App() {





    return (
        <>

            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Home}/>

                </Switch>

            </BrowserRouter>
        </>



    )
}