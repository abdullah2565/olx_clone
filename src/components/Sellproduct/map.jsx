// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// const LocationMarker = ({ onLocationChange }) => {
//   const [position, setPosition] = useState(null);
//   const map = useMapEvents({
//     click() {
//       map.locate();
//     },
//     locationfound(e) {
//       const latlng = e.latlng;
//       setPosition(latlng);
//       map.flyTo(latlng, map.getZoom());

//       // Call the callback function to update the state in the parent component
//       onLocationChange(latlng);
//     },
//   });

//   return position === null ? null : (
//     <Marker position={position}>
//       <Popup>You are here</Popup>
//     </Marker>
//   );
// };

// const Map = (userLocation) => {
//   const initialPosition = [24.8900002, 67.0557045]; // Replace with your desired initial coordinates
// const [userLocation, setUserLocation] = useState(initialPosition);

//   const handleLocationChange = (latlng) => {
//     setUserLocation([latlng.lat, latlng.lng]);
//   };

//   return (
//     <div style={{ width: '150vw', height: '200vh' }}>
//       <h1>Map</h1>
//       <MapContainer center={initialPosition} zoom={13} style={{ height: '400px', width: '100%' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <LocationMarker onLocationChange={handleLocationChange} />
//       </MapContainer>
//       <p>Marker Position: {JSON.stringify(userLocation)}</p>
//     </div>
//   );
// };

// export default Map;
