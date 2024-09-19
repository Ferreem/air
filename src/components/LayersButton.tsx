import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StyledButton from "./StyledButton";

interface LayersButtonProps {
  children: string;
  changeMapStyle: (styleTitle: string) => void;
}

export default function LayersButton({ children, changeMapStyle }: LayersButtonProps) {
  const [clicked, setClicked] = useState(false);
  const [activeStyle, setActiveStyle] = useState('OpenStreetMap');

  const handleStyleChange = (style: string) => {
    changeMapStyle(style);
    setActiveStyle(style);
  };

  const getButtonStyle = (style: string) => ({
    color: 'white',
    opacity: activeStyle === style ? 1.0 : 0.7,
    marginBottom: '0.5rem',
    transition: 'opacity 0.3s ease',
  });

  const variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.10,
      x: '50%', 
      y: '-40%' 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      x: '0%', 
      y: '0%',
      transition: { 
        type: 'spring',
        stiffness: 200,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      scale: 0.1,
      x: '50%',
      y: '-40%',
      transition: {
        duration: 0.1
      }
    }
  };

  return (
    <>
      <StyledButton setClicked={setClicked} clicked={clicked}>
        {children}
      </StyledButton>
      <AnimatePresence>
        {clicked && (
          <motion.div
            className="flex flex-col absolute right-12 top-20 p-4 rounded-md"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
          >
            <button
              onClick={() => handleStyleChange('OpenStreetMap')}
              style={getButtonStyle('OpenStreetMap')}
            >
              OpenStreet
            </button>
            <button
              onClick={() => handleStyleChange('Transport')}
              style={getButtonStyle('Transport')}
            >
              Transport
            </button>
            <button
              onClick={() => handleStyleChange('Humanitarian')}
              style={getButtonStyle('Humanitarian')}
            >
              Humanitarian
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}