import React, { useState } from "react";
import { GoogleMap, InfoWindow, LoadScript, MarkerF, useLoadScript } from "@react-google-maps/api";

const MapComponent = () => {
    const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: 'AIzaSyB7pJ2WtfyX824rP-p5rMXGOk4PmYANtMw' })
    const initialMarkers = [
        {
            position: {
                lat: 28.625485,
                lng: 79.821091
            },
            label: { color: "white", text: "P1" },
            draggable: true
        },
        {
            position: {
                lat: 28.625293,
                lng: 79.817926
            },
            label: { color: "white", text: "P2" },
            draggable: false
        },
        {
            position: {
                lat: 28.626137,
                lng: 79.821603
            },
            label: { color: "white", text: "P3" },
            draggable: true
        },
    ];
    
    const [activeInfoWindow, setActiveInfoWindow] = useState("");
    const [markers, setMarkers] = useState(initialMarkers);

    const containerStyle = {
        width: "100%",
        height: "400px",
    }

    const center = {
        lat: 28.626137,
        lng: 79.821603,
    }

    const mapClicked = (event) => { 
        console.log(event.latLng.lat(), event.latLng.lng()) 
    }

    const markerClicked = (marker, index) => {  
        setActiveInfoWindow(index)
        console.log(marker, index) 
    }

    const markerDragEnd = (event, index) => { 
        console.log(event.latLng.lat())
        console.log(event.latLng.lng())
    }
    return (
        <div>
            {isLoaded && 
                <GoogleMap 
                    mapContainerStyle={containerStyle} 
                    center={center} 
                    zoom={15}
                    onClick={mapClicked}
                >
                    {markers.map((marker, index) => (
                        <MarkerF 
                            key={index} 
                            position={marker.position}
                            label={marker.label}
                            draggable={marker.draggable}
                            onDragEnd={event => markerDragEnd(event, index)}
                            onClick={event => markerClicked(marker, index)} 
                        >
                            {
                                (activeInfoWindow === index)
                                &&
                                <InfoWindow position={marker.position}>
                                    <b>{marker.position.lat}, {marker.position.lng}</b>
                                </InfoWindow>
                            }  
                        </MarkerF>
                    ))}
                </GoogleMap>
            }
        </div>
    );
};

export default MapComponent;
