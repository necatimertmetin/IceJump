import React, { useEffect, useState } from "react";

const Background: React.FC = () => {
  const [bgColor, setBgColor] = useState<string>("#a2d5e8");

  const changeBgColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setBgColor(randomColor);
  };

  useEffect(() => {
    const intervalId = setInterval(changeBgColor, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      style={{
        backgroundColor: bgColor,
        height: "100vh",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
};

export default Background;
