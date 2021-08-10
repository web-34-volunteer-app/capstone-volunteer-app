import React, {useState} from "react";
import ReactMapGL from "react-map-gl";

let currentLat = 0;
let currentLong = 0;
let init = true;

export function Map () {
    const [viewport, setViewport] = useState(() => {
        return {
            latitude: currentLat,
            longitude: currentLong,
            width: "100vw",
            height: "100vh",
            zoom: 10
        }
    });

    if(init) {
        navigator.geolocation.getCurrentPosition(position => {
            currentLat = position.coords.latitude;
            currentLong = position.coords.longitude;
            updateMap();
            init = false;
        });
    }

    function updateMap() {
        setViewport(viewport => {
            viewport = {
                latitude: currentLat,
                longitude: currentLong,
                width: "100vw",
                height: "100vh",
                zoom: 10
            }
            return viewport;
        });
    }

    return (
            <>
                <div>
                    <ReactMapGL
                        {...viewport}
                        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                        mapStyle="mapbox://styles/akpowers1986/cks64jxs869f317qpopvvckls"
                        onViewportChange={viewport => {
                            setViewport(viewport);
                        }}
                    >
                        <p color="white">Make sure you enable access to your gps!</p>
                    </ReactMapGL>
                </div>
            </>
        )
}