import React, { useEffect, useState, useRef } from "react";
import { Box, Paper } from "@mui/material";
import "./IceJumpGame.css";
import snowflake from "./snowflake.png";
import Player from "./Player";
import { usePlayerMovement } from "./usePlayerMovement";
import { useGravity } from "./useGravity"; // Import the custom gravity hook

interface IceJumpGameProps {
  speed?: number;
  initialPosition?: { x: number; y: number }; // Başlangıç konumu için prop ekle
}

export const IceJumpGame: React.FC<IceJumpGameProps> = ({
  speed = 200,
  initialPosition = { x: 500, y: 0 }, // Varsayılan başlangıç konumu
}) => {
  const [snowflakes, setSnowflakes] = useState<JSX.Element[]>([]);
  const groundRef = useRef<HTMLDivElement>(null); // Create a ref for the ground
  const { position, jump } = useGravity(groundRef, initialPosition); // Başlangıç konumunu geç

  useEffect(() => {
    const generateSnowflakes = (count: number): JSX.Element[] => {
      if (count <= 0) {
        console.warn("Count must be a positive number. Defaulting to 50.");
        count = 50;
      }

      return Array.from({ length: count }).map((_, index) => (
        <img
          key={index}
          src={snowflake}
          alt="Snowflake"
          className="snowflake"
          style={{
            left: `${Math.random() * 100}vw`,
            animationDuration: `${Math.random() * 5 + 5}s`,
            position: "absolute",
            width: "30px",
            height: "30px",
            background: "none",
            filter: "drop-shadow(0 0px 8px #88f)",
          }}
        />
      ));
    };

    setSnowflakes(generateSnowflakes(speed));
  }, [speed]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ position: "relative", overflow: "hidden" }}
    >
      {/* Snowfall Animation */}
      <Box
        display="flex"
        flexDirection="row"
        width="1024px"
        height="calc(1024px * 9 / 16)"
        gap={2}
        sx={{
          border: "20px solid #e0f7fa",
          borderRadius: "30px",
          padding: "20px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box className="snowfall">{snowflakes}</Box>

        {Array.from({ length: 8 }).map((_, index) => (
          <Box
            key={index}
            display="flex"
            flex={1}
            alignItems="flex-end"
            justifyContent="center"
            ref={groundRef} // Ref'i buraya ekleyin
          >
            <Paper
              elevation={0}
              style={{
                padding: "16px",
                textAlign: "center",
                flex: 1,
                backgroundColor: "#a2d5e8",
                borderTop: "5px solid #e0f7fa",
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              }}
              ref={groundRef} // Attach the ref to the ground
            />
          </Box>
        ))}

        {/* Render the Player component */}
        <Player position={position} jump={jump} />
      </Box>
    </Box>
  );
};
