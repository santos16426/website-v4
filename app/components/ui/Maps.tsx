"use client";

import { Map, MapMarker } from './map';

const center: [number, number] = [121.02196502685547, 14.608887672424316]; // [lng, lat] format for MapLibre

const Maps = () => {
  return (
    <Map center={center} zoom={10} className="w-full h-full min-h-[300px] md:min-h-0" theme="dark">
      <MapMarker
        position={center}
        icon="/pin_map.png"
        iconSize={[120, 120]}
        anchor="center"
      />
    </Map>
  );
};

export default Maps;
