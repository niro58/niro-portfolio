"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const ClientComponent: React.FC = () => {
  const [counter, setCounter] = useState<number>(0);

  return (
    <div>
      <h1>Client Component</h1>
      <Button onClick={() => setCounter(counter + 1)}>Increment</Button>
      <p>{counter}</p>
    </div>
  );
};
