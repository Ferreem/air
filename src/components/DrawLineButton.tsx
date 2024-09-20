import { useState, useCallback } from 'react';
import Draw from 'ol/interaction/Draw';
import StyledButton from './StyledButton';

interface DrawLineButtonProps {
  children: string;
  map: any; // Replace with the correct type if available
  vectorLayer: any; // Replace with the correct type if available
}

export default function DrawLineButton({ children, map, vectorLayer }: DrawLineButtonProps) {
  const [drawInteraction, setDrawInteraction] = useState(null);
  const [clicked, setClicked] = useState<boolean>(false);

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
      map.addInteraction(newDrawInteraction);
      setDrawInteraction(newDrawInteraction);
      console.log('Drawing mode activated');
      setClicked(true);
    }
  }, [map, vectorLayer, drawInteraction, clicked]);

  return (
    <StyledButton setClicked={toggleDrawing} clicked={clicked}>
      {children}
    </StyledButton>
  );
}