/* global google */
import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { useState } from "react";
import "./App.css";

const App = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const [mapRef, setMapRef] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();
  var people = [
    { address: "Name: Ishan, Contant: ishan@gmail.com", lat: 43.72, lng: -79.636, car:"yes" },
    { address: "Person 2", lat: 43.731, lng: -79.72, car:"yes" },
    { address: "Person 3", lat: 43.471, lng: -79.684, car:"yes" },
    { address: "Person 4", lat: 43.741, lng: -79.592, car:"no" },
    { address: "Person 5", lat: 43.713, lng: -79.741, car:"no" },
    { address: "Person 6", lat: 43.607, lng: -79.804, car:"no" },
  ];

  const onMapLoad = (map) => {
    setMapRef(map);
    const bounds = new google.maps.LatLngBounds();
    people?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };

  const handleMarkerClick = (id, lat, lng, address) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData({ id, address });
    setIsOpen(true);
  };

  return (
    <div className="App">
      <h1>CarGo</h1>
      <button>Sign up</button>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          onLoad={onMapLoad}
          onClick={() => setIsOpen(false)}
        >
          {people.map(({ address, lat, lng, car }, ind) => (
            <MarkerF
              key={ind}
              position={{ lat, lng }}
              icon={car === "yes" ? "http://maps.google.com/mapfiles/kml/pal2/icon47.png" : "http://maps.google.com/mapfiles/kml/pal2/icon5.png"}
              onClick={() => {
                handleMarkerClick(ind, lat, lng, address);
              }}
            >
              {isOpen && infoWindowData?.id === ind && (
                <InfoWindow
                  onCloseClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <h3>{infoWindowData.address}</h3>
                </InfoWindow>
              )}
            </MarkerF>
          ))}
        </GoogleMap>
      )}
    </div>
  );
};

export default App;
