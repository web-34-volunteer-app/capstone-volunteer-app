import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import {Home} from "./Home";
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import {Map} from "./Map";

export function App() {
    return (
        <>
            <Map/>
            {/*<BrowserRouter>*/}
            {/*    <Switch>*/}
            {/*        <Route exact path='/' component={Home}/>*/}
            {/*    </Switch>*/}
            {/*</BrowserRouter>*/}
        </>
    )
}