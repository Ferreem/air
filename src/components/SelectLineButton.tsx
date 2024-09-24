import React, { useState, useEffect, useRef, useCallback } from "react";
import { Select } from 'ol/interaction';
import { Style, Stroke } from 'ol/style';
import StyledButton from "./StyledButton";
import InfoBox from "./InfoBox";
import { Map as OLMap } from 'ol';
import { Vector as VectorLayer } from 'ol/layer';
import { toLonLat } from 'ol/proj';
import { getLength } from 'ol/sphere';

interface SelectLineButtonProps {
  children: React.ReactNode;
  map: OLMap;
  vectorLayer: VectorLayer;
}

export default function SelectLineButton({ children, map, vectorLayer }: SelectLineButtonProps) {
  const [clicked, setClicked] = useState(false);
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number }[]>([]);
  const [distance, setDistance] = useState<number | null>(null);
  const selectInteraction = useRef<Select | null>(null);

  const toggleSelection = useCallback(() => {
    if (!map || !vectorLayer) return;

    if (clicked) {
      // Deactivate selection mode
      if (selectInteraction.current) {
        map.removeInteraction(selectInteraction.current);
        selectInteraction.current = null;
        console.log('Selection mode deactivated');
      }
      setClicked(false);
    } else {
      // Activate selection mode
      const highlightStyle = new Style({
        stroke: new Stroke({
          color: 'rgba(255, 0, 0, 1)', // Red color
          width: 3,
        }),
      });

      const newSelectInteraction = new Select({
        style: highlightStyle,
        hitTolerance: 10, // Increase hit tolerance to make selection easier
      });

      newSelectInteraction.on('select', (event) => {
        const selectedFeatures = event.selected;
        if (selectedFeatures.length > 0) {
          const feature = selectedFeatures[0];
          const geometry = feature.getGeometry();
          if (geometry.getType() === 'LineString') {
            const coords = geometry.getCoordinates();
            const transformedCoords = coords.map((coord: [number, number]) => {
              const [lon, lat] = toLonLat(coord);
              return { 
                lat: parseFloat(lat.toFixed(6)), 
                lon: parseFloat(lon.toFixed(6)) 
              };
            });
            setCoordinates(transformedCoords);
            console.log('Coordinates (lat, lon):', transformedCoords);

            // Calculate the distance of the line
            const lineLength = getLength(geometry, { projection: 'EPSG:3857' });
            const distanceInKilometers = parseFloat((lineLength / 1000).toFixed(3));
            setDistance(distanceInKilometers);
            console.log('Distance (km):', distanceInKilometers);
          }
        }
      });

      map.addInteraction(newSelectInteraction);
      selectInteraction.current = newSelectInteraction;
      console.log('Selection mode activated');
      setClicked(true);
    }
  }, [map, vectorLayer, clicked]);

  return (
    <>
      <StyledButton setClicked={toggleSelection} clicked={clicked}>
        {children}
      </StyledButton>
      {clicked && (
        <InfoBox 
          coordinates={coordinates} 
          setCoordinates={setCoordinates} 
          distance={distance} 
        />
      )}
    </>
  );
}