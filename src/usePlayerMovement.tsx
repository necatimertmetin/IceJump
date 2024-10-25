import { useEffect, useState } from "react";

const movementSpeed = 10; // Set the speed of the player to 1 pixel

export const usePlayerMovement = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 500,
    y: 50,
  }); // Initial position

  const [keys, setKeys] = useState<Set<string>>(new Set()); // Track pressed keys

  const updatePosition = () => {
    setPosition((prevPosition) => {
      let newPosition = { ...prevPosition };

      if (keys.has("ArrowUp") || keys.has("w")) {
        newPosition.y = Math.min(
          prevPosition.y + movementSpeed,
          window.innerHeight - 50
        ); // Move down
      }
      if (keys.has("ArrowDown") || keys.has("s")) {
        newPosition.y = Math.max(prevPosition.y - movementSpeed, 0); // Move up
      }
      if (keys.has("ArrowLeft") || keys.has("a")) {
        newPosition.x = Math.max(prevPosition.x - movementSpeed, 0); // Move left
      }
      if (keys.has("ArrowRight") || keys.has("d")) {
        newPosition.x = Math.min(
          prevPosition.x + movementSpeed,
          window.innerWidth - 50
        ); // Move right
      }

      return newPosition;
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeys((prevKeys) => new Set(prevKeys).add(event.key));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setKeys((prevKeys) => {
        const newKeys = new Set(prevKeys);
        newKeys.delete(event.key);
        return newKeys;
      });
    };

    // Listen for keydown and keyup events
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Game loop for smooth movement
    const interval = setInterval(updatePosition, 16); // Approx. 60 FPS

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      clearInterval(interval);
    };
  }, [keys]);

  return position;
};
