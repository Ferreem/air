import React, { useState, useCallback, useRef } from 'react';
import { toLonLat } from 'ol/proj';
import { getLength } from 'ol/sphere';
import { Map as OLMap } from 'ol';
import { Vector as VectorLayer } from 'ol/layer';
import StyledButton from './StyledButton';
import InfoBox from './InfoBox';

interface MeasureAngleButtonProps {
  children: string;
  map: OLMap;
  vectorLayer: VectorLayer;
}

export default function MeasureAngleButton({ children, map, vectorLayer }: MeasureAngleButtonProps) {
  const [clicked, setClicked] = useState(false);
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number }[]>([]);
  const [distance, setDistance] = useState<number | null>(null);
  const [angle, setAngle] = useState<number | null>(null);
  const clickCount = useRef(0);

  const handleMapClick = useCallback((event) => {
    const clickedCoord = event.coordinate;
    const [lon, lat] = toLonLat(clickedCoord);
    const newCoord = { 
      lat: parseFloat(lat.toFixed(6)),
      lon: parseFloat(lon.toFixed(6))
    };

    setCoordinates(prev => [...prev, newCoord]);
    clickCount.current += 1;

    console.log('Coordinates:', coordinates);
    console.log('Click Count:', clickCount.current);

    if (clickCount.current === 2) {
      // Calculate distance
      const lineLength = getLength(vectorLayer.getSource().getFeatures()[0].getGeometry(), { projection: 'EPSG:3857' });
      const distanceInKilometers = parseFloat((lineLength / 1000).toFixed(3));
      setDistance(distanceInKilometers);
      console.log('Distance:', distanceInKilometers);
    }

    if (clickCount.current === 3) {
      // Calculate angle
      const [p1, p2, p3] = coordinates;
      const angle = calculateAngle(p1, p2, p3);
      setAngle(angle);
      console.log('Angle:', angle);
      
      // Remove click listener
      map.un('click', handleMapClick);
      setClicked(false);
      clickCount.current = 0;
    }
  }, [map, vectorLayer, coordinates]);

  const toggleMeasuring = useCallback(() => {
    if (clicked) {
      map.un('click', handleMapClick);
      setClicked(false);
      clickCount.current = 0;
    } else {
      setCoordinates([]);
      setDistance(null);
      setAngle(null);
      map.on('click', handleMapClick);
      setClicked(true);
    }
  }, [map, handleMapClick, clicked]);



  return (
    <>
      <StyledButton setClicked={toggleMeasuring} clicked={clicked}>
        {children}
      </StyledButton>
      {clicked && (
        <InfoBox 
          coordinates={coordinates} 
          setCoordinates={setCoordinates} 
          distance={distance}
          angle={angle}
        />
      )}
    </>
  );
}