import { useState } from "react";

interface StyledButtonNoTog {
  children: string;
  setClicked: (clicked: (prev: boolean) => boolean) => void;
}

export default function StyledButtonNoTog({ children, setClicked }: StyledButtonNoTog) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setClicked((prevClicked) => !prevClicked);
  }

  return (
    <button onClick={handleClick} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-10 h-10 p-3 flex justify-center items-center"
      style={{
        backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.7)',
        transition: 'all 0.3s ease'
      }}
    >
      <img src={children} alt="Layers" 
      style={{filter: 'invert(100%)'}}
      className="w-8" />
    </button>
  );
}