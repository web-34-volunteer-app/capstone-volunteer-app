import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import {Route, BrowserRouter, Switch} from "react-router-dom";
import {Home} from "./Home";
import {Navigation} from "./Navigation";
import {UserProfile} from "./UserProfile";
import {PageFooter} from "./PageFooter";

export function App() {
    return (
        <>

            <BrowserRouter>
                <Navigation/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/user-profile' component = {UserProfile}/>
                </Switch>
                <PageFooter/>
            </BrowserRouter>

        </>
    )
}