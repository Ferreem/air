import { useState, useCallback } from 'react';
import Draw from 'ol/interaction/Draw';
import { toLonLat } from 'ol/proj'; // Import projection functions
import { getLength } from 'ol/sphere'; // Import distance calculation
import StyledButton from './StyledButton';
import InfoBox from './InfoBox';

interface DrawLineButtonProps {
  children: string;
  map: any; // Replace with the correct type if available
  vectorLayer: any; // Replace with the correct type if available
}

export default function DrawLineButton({ children, map, vectorLayer }: DrawLineButtonProps) {
  const [drawInteraction, setDrawInteraction] = useState(null);
  const [clicked, setClicked] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number }[]>([]);
  const [distance, setDistance] = useState<number | null>(null); // State for distance

  const toggleDrawing = useCallback(() => {
    if (!map || !vectorLayer) return;

    if (clicked) {
      // If drawing mode is active, deactivate it
      if (drawInteraction) {
        map.removeInteraction(drawInteraction);
        setDrawInteraction(null);
        console.log('Drawing mode deactivated');
      }
      setClicked(false);
    } else {
      // If drawing mode is not active, activate it
      const newDrawInteraction = new Draw({
        type: 'LineString',
        source: vectorLayer.getSource(),
      });

      newDrawInteraction.on('drawend', (event) => {
        const coords = event.feature.getGeometry().getCoordinates();
        
        // Transform coordinates from EPSG:3857 to EPSG:4326 (standard lat/lon)
        const transformedCoords = coords.map((coord: [number, number]) => {
          const [lon, lat] = toLonLat(coord); 
          return { 
            lat: parseFloat(lat.toFixed(6)), // Round latitude to 6 decimal places
            lon: parseFloat(lon.toFixed(6))  // Round longitude to 6 decimal places
          };
        });
        
        setCoordinates(transformedCoords);
        console.log('Coordinates (lat, lon):', transformedCoords);

        // Calculate the distance of the line
        const lineLength = getLength(event.feature.getGeometry(), { projection: 'EPSG:3857' });
        const distanceInKilometers = parseFloat((lineLength / 1000).toFixed(3)); // Convert meters to kilometers and round

        setDistance(distanceInKilometers); // Set distance in state
        console.log('Distance (km):', distanceInKilometers);
      });

      map.addInteraction(newDrawInteraction);
      setDrawInteraction(newDrawInteraction);
      console.log('Drawing mode activated');
      setClicked(true);
    }
  }, [map, vectorLayer, drawInteraction, clicked]);

  return (
    <>
      <StyledButton setClicked={toggleDrawing} clicked={clicked}>
        {children}
      </StyledButton>
      {clicked && (
        <InfoBox 
          coordinates={coordinates} 
          setCoordinates={setCoordinates} 
          distance={distance} // Pass distance to InfoBox
        />
      )}
    </>
  );
}
