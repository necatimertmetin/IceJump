import React from "react";

interface PlayerProps {
  position: { x: number; y: number }; // Player position from gravity hook
  jump: () => void; // Jump function passed from gravity hook
}

const Player: React.FC<PlayerProps> = ({ position, jump }) => {
  // Player style
  const playerStyle: React.CSSProperties = {
    position: "absolute",
    left: position.x,
    bottom: position.y, // Use y position to set bottom position
    width: "50px", // Width of the player
    height: "50px", // Height of the player
    backgroundColor: "#ff5722", // Player color
    borderRadius: "25px", // Circular shape
    transition: "bottom 0.1s", // Smooth transition for jumping
  };

  return (
    <div
      style={playerStyle}
      onClick={jump} // Call jump function on click
    />
  );
};

export default Player;
