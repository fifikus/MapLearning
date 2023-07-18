import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import krajeData from './kraje.geojson';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import './Map.css';

const Map = () => {
const mapContainerRef = useRef(null);
const geocoderContainerRef = useRef(null);

useEffect(() => {
mapboxgl.accessToken = 'pk.eyJ1IjoiZmFuZm9uMjEiLCJhIjoiY2xrNzQ2N2c3MDFoYjNmdDVqMmtubGRneiJ9.BAof6iuz1whzlOYrwZXeeg';

const map = new mapboxgl.Map({
  container: mapContainerRef.current,
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [19.5033, 48.7244],
  zoom: 7,
});

map.on('load', () => {
  map.addControl(new mapboxgl.NavigationControl());
  map.addControl(new mapboxgl.ScaleControl());

  map.addSource('kraje', {
    type: 'geojson',
    data: krajeData,
  });

  map.addLayer({
    id: 'kraje-layer',
    type: 'line',
    source: 'kraje',
    paint: {
      'line-color': 'blue',
      'line-width': 4,
    },
  });
});

const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
});

const geocoderContainer = geocoderContainerRef.current;
geocoderContainer.appendChild(geocoder.onAdd(map));

return () => {
  
  geocoderContainer.removeChild(geocoderContainer.firstChild);
  map.remove();
};
}, []);

return (
<div className="map-container">
<div className="geocoder-container" ref={geocoderContainerRef} />
<div className="map" ref={mapContainerRef} />
</div>
);
};

export default Map;