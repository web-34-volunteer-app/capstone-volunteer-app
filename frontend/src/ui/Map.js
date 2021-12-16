
import React, {useState, useEffect} from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import GPS_cursor from "./images/MC3YellowNoText.svg";
import "./style.css";
import {useSelector} from "react-redux";

let currentLat = 0;
let currentLong = 0;
let init = true;

export function Map(inputs) {
    const events = useSelector(state => state.events ? state.events : []);

    const getEvent = (eventId) => {
        let thisEvent = null;
        events.forEach(event => {
            if(event.eventId === eventId) {
                thisEvent = event;
            }
        });

        return thisEvent;
    }

    const [activeEvent, setActiveEvent] = useState(getEvent(inputs.activeEvent));

    useEffect(() => {
        setActiveEvent(getEvent(inputs.activeEvent));
    }, [inputs.activeEvent]);

//console.log(events)
    const [viewport, setViewport] = useState(() => {
        return {
            latitude: currentLat,
            longitude: currentLong,
            width: inputs.width,
            height: inputs.height,
            zoom: 10
        }
    });

    useEffect(() => {
        const listener = (e) => {
            if (e.key === "Escape") {
                inputs.setActiveEvent(null, false);
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('resize', updateMap);
        return () => {
            window.removeEventListener('resize', updateMap);
        }
    });


    if (init) {
        navigator.geolocation.getCurrentPosition(position => {
            currentLat = position.coords.latitude;
            currentLong = position.coords.longitude;
            updateMap();
            init = false;
        });
    }

    function updateMap() {
        let screenWidth = document.documentElement.clientWidth;
        setViewport(() => {
            viewport.latitude = currentLat;
            viewport.longitude = currentLong;
            if(screenWidth > 750) {
                viewport.width = inputs.width;
                viewport.height = inputs.height;
            } else {
                viewport.width = "93vw";
                viewport.height = "65vh";
            }
            return viewport;
        });
    }

    const displayPins = () => {
        return (
            events.map(place => (
                <Marker key={place.eventId}
                        latitude={Number(place.eventLatitude)}
                        longitude={Number(place.eventLongitude)}
                        offsetLeft={-25.5}
                        offsetTop={-36}
                >
                    <button className="marker-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                inputs.setActiveEvent(place.eventId, true);
                            }}>
                        <img src={GPS_cursor} alt="gps pin"/>
                    </button>
                </Marker>
            ))
        );

    }

    return (
        <>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/amartinezguzman/cktlm0pv01zdb17o3ceu4qfa7"
                onViewportChange={viewport => {
                    setViewport(viewport);
                }}
            >
                {displayPins()}
                {activeEvent && inputs.eventIsActive ? (
                    <Popup
                        latitude={Number(activeEvent.eventLatitude)}
                        longitude={Number(activeEvent.eventLongitude)}
                        onClose={() => {
                            inputs.setActiveEvent(null, false);
                        }}>
                        <div>
                            <h6>{activeEvent.eventTitle}</h6>
                            <p>{activeEvent.eventAddress}</p>
                        </div>
                    </Popup>
                ) : null}
            </ReactMapGL>
        </>
    )
}
