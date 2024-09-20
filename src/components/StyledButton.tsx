import React, { useState } from 'react';

interface StyledButtonProps {
  children: React.ReactNode;
  setClicked: (clicked: (prev: boolean) => boolean) => void;
  clicked?: boolean;
}

export default function StyledButton({ children, setClicked, clicked }: StyledButtonProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleClick = () => {
    setClicked((prevClicked) => !prevClicked);
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-10 h-10 p-3 flex justify-center items-center"
      style={{
        backgroundColor: clicked || isHovered ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.7)',
        transition: 'all 0.3s ease',
      }}
    >
      <img src={children} alt="Layers" style={{ filter: 'invert(100%)' }} className="w-8" />
    </button>
  );
}