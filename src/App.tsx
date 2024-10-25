import React from "react";
import { IceJumpGame } from "./IceJumpGame";

const App: React.FC = () => {
  return (
    <div>
      <IceJumpGame speed={200} initialPosition={{ x: 500, y: 500 }} />
    </div>
  );
};

export default App;
