"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { cn } from "../../utils/cn";

const MapContext = createContext<maplibregl.Map | null>(null);

const useMap = () => {
  const map = useContext(MapContext);
  if (!map) {
    throw new Error("MapMarker must be used within a Map component");
  }
  return map;
};

interface MapProps {
  center: [number, number]; // [lng, lat]
  zoom?: number;
  className?: string;
  theme?: "light" | "dark";
  children?: ReactNode;
}

export function Map({ center, zoom = 10, className, theme = "dark", children }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: theme === "dark" 
        ? "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        : "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: center,
      zoom: zoom,
      attributionControl: false,
    });

    map.current.on("load", () => {
      setMounted(true);
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [center, zoom, theme]);

  return (
    <div ref={mapContainer} className={cn("w-full h-full rounded-lg overflow-hidden", className)}>
      {mounted && map.current && (
        <MapContext.Provider value={map.current}>
          {children}
        </MapContext.Provider>
      )}
    </div>
  );
}

interface MapMarkerProps {
  position: [number, number]; // [lng, lat]
  icon?: string;
  iconSize?: [number, number];
  anchor?: "center" | "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export function MapMarker({ position, icon, iconSize = [40, 40], anchor = "center" }: MapMarkerProps) {
  const map = useMap();
  const markerRef = useRef<maplibregl.Marker | null>(null);

  useEffect(() => {
    if (!icon || !map) return;

    const el = document.createElement("div");
    el.className = "map-marker";
    el.style.width = `${iconSize[0]}px`;
    el.style.height = `${iconSize[1]}px`;
    el.style.backgroundImage = `url(${icon})`;
    el.style.backgroundSize = "contain";
    el.style.backgroundRepeat = "no-repeat";
    el.style.backgroundPosition = "center";
    el.style.cursor = "pointer";

    markerRef.current = new maplibregl.Marker({
      element: el,
      anchor: anchor,
    })
      .setLngLat(position)
      .addTo(map);

    return () => {
      markerRef.current?.remove();
    };
  }, [position, icon, iconSize, anchor, map]);

  return null;
}
