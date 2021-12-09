import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import {Route, BrowserRouter, Switch} from "react-router-dom";
import {Home} from "./main/Home";
import {Navigation} from "./main/Navigation";
import {UserProfile} from "./main/UserProfile";
import {PageFooter} from "./main/PageFooter";
import {Provider} from "react-redux";

export function App(store) {
    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <Navigation/>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/user-profile' component = {UserProfile}/>
                    </Switch>
                    <PageFooter/>
                </BrowserRouter>
            </Provider>
        </>
    )
}