import { useState, useCallback } from 'react';
import Draw from 'ol/interaction/Draw';
import { toLonLat } from 'ol/proj'; // Import projection functions
import { getLength } from 'ol/sphere'; // Import distance calculation
import { Style, Stroke, Circle, Fill } from 'ol/style'; // Import styles
import { Point } from 'ol/geom'; // Import Point geometry
import { Feature } from 'ol'; // Import Feature
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
      const customStyle = new Style({
        stroke: new Stroke({
          color: 'rgba(0, 0, 255, 1)', // Blue color
          width: 2,
        }),
      });

      const newDrawInteraction = new Draw({
        type: 'LineString',
        source: vectorLayer.getSource(),
        style: customStyle, // Apply the custom style
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

        // Define a style for the confirmed line
        const confirmedLineStyle = new Style({
          stroke: new Stroke({
            color: 'rgba(0, 0, 255, 1)', // Green color
            width: 3,
          }),
        });

        // Apply the confirmed line style to the feature
        event.feature.setStyle(confirmedLineStyle);

        // Define styles for the start, middle, and end points
        const startEndPointStyle = new Style({
          image: new Circle({
            radius: 6, // Radius of the circle
            fill: new Fill({ color: 'rgba(255, 0, 0, 1)' }), // Red color

          }),
        });

        const middlePointStyle = new Style({
          image: new Circle({
            radius: 4, // Smaller radius for middle points
            fill: new Fill({ color: 'rgba(255, 0, 0, 1)' }), // Blue color
          }),
        });

        // Add start, middle, and end points to the vector layer
        const startPoint = new Feature(new Point(coords[0]));
        const endPoint = new Feature(new Point(coords[coords.length - 1]));
        startPoint.setStyle(startEndPointStyle);
        endPoint.setStyle(startEndPointStyle);
        vectorLayer.getSource().addFeature(startPoint);
        vectorLayer.getSource().addFeature(endPoint);

        // Add middle points
        for (let i = 1; i < coords.length - 1; i++) {
          const middlePoint = new Feature(new Point(coords[i]));
          middlePoint.setStyle(middlePointStyle);
          vectorLayer.getSource().addFeature(middlePoint);
        }
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