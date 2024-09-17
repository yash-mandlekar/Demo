import React, { useState, useEffect } from "react";

const App = () => {
  function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers

    // Convert degrees to radians
    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);

    // Differences in coordinates
    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;

    // Haversine formula
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distance in kilometers
    const distance = R * c;

    return distance;
  }
  // console.log(`Distance: ${distance.toFixed(2)} km`);
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
    error: null,
  });

  const onSuccess = (position) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
      error: null,
    });
  };

  const onError = (error) => {
    setLocation((state) => ({
      ...state,
      loaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    }));
  };

  const handleDistance = () => {
    const lat1 = 22.635140;
    const lon1 = 75.833495;
    const distance = haversineDistance(
      lat1,
      lon1,
      location.coordinates.lat,
      location.coordinates.lng
    );
     window.alert(distance.toFixed(2) + "km")
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocation((state) => ({
        ...state,
        loaded: true,
        error: {
          code: 0,
          message: "Geolocation not supported",
        },
      }));
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }, []);

  return (
    <div>
      <h1>Geolocation Status</h1>
      {location.loaded ? (
        location.error ? (
          <p>Error: {location.error.message}</p>
        ) : (
          <p>
            Latitude: {location.coordinates.lat}, Longitude:{" "}
            {location.coordinates.lng}
          </p>
        )
      ) : (
        <p>Loading...</p>
      )}

      <button onClick={handleDistance}>find the distance</button>
    </div>
  );
};

export default App;
