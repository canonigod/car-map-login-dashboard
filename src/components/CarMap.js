import React, {useState} from 'react'
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps'
import * as carData from '../data/car-map-data.json'
import carImg from './images/car.png'

// Variables
const API_KEY = "AIzaSyDQ-DKskRRpyuu9fzkGwg4IYGUhv2BtEbw"

// Creating Map
const Map = () => { // Creating Map with Markers
    const [selectedCar, setselectedCar] = useState(null) // Setting Infobox State to display car information

    return (
        <GoogleMap // Creating Google Maps

            defaultZoom={10} // Setting Default Zoom
            defaultCenter={{ lat: 33.8323324, lng: -84.5009415 }} // Defining Atlanta as default Center

        >
            {carData.response.destination_charging.map((car) => ( // Creating car Markers
                <Marker
                key={car.id}
                position={{
                    lat: car.location.lat,
                    lng: car.location.long
                }}
                onClick={() => { setselectedCar(car); }}
                icon={{
                    url: carImg,
                    scaledSize: new window.google.maps.Size(50,50)
                }}
                label= {{
                    text: car.battery_level,
                    color: 'white',
                  }}
                  labelClass="labels"
                />
            ))}

            {selectedCar && ( //Infobox
                <InfoWindow
                key={selectedCar.id}
                position={{
                    lat: selectedCar.location.lat,
                    lng: selectedCar.location.long}}
                onCloseClick={() =>{
                    setselectedCar(null)
                }}
                >
                    <div> {/* Display Car Model Information */}
                        <h2>{selectedCar.name}</h2>
                        <p>Battery Level: {selectedCar.battery_level}</p>
                    </div>
                </InfoWindow>
            )}

        </GoogleMap>
    );
}

// Initiating Map
const WrappedMap = withScriptjs(withGoogleMap(Map));

// Creating CarMap Component
const CarMap = () => {

    return (
        <div className="carMap">
            <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`}
                loadingElement={<div style={{ height: `100%` }} /> }
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
}

export default CarMap