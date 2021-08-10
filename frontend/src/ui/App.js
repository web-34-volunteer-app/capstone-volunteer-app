import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import {Home} from "./Home";
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import {Navigation} from "./Navigation";

export function App() {
    return (
        <>
            <Navigation/>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Home}/>
                </Switch>
            </BrowserRouter>
        </>
    )
}