"use client";

import { getWindowDimensions } from "@/lib/get-window-dimensions";
import { useEffect, useRef } from "react";

export const WaveEffect: React.FC = () => {
  const { height, width } = getWindowDimensions();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawSineWave = (
    height: number,
    width: number,
    time: number,
    canvas: CanvasRenderingContext2D
  ) => {
    const numberOfWaves = 10;
    const waveOffset = height / numberOfWaves;
    canvas.clearRect(0, 0, width, height);

    const possibleColors = ["#60A5FA", "#00A5FA", "#000"];

    for (let wave = 0; wave < numberOfWaves; wave++) {
      canvas.beginPath();
      const grd = canvas.createLinearGradient(0, 0, width, height);
      grd.addColorStop(0, possibleColors[wave % possibleColors.length]);
      grd.addColorStop(1, possibleColors[(wave + 1) % possibleColors.length]);

      const offset = wave * 75;
      const horizontalOffset = wave * waveOffset;
      canvas.moveTo(0, offset);
      const baseAmplitude = 10;
      const baseFrequency = 25;

      for (let w = 0; w < width; w++) {
        const a = baseAmplitude + Math.cos(w / baseAmplitude) + 3; //max x,y
        const x = w;
        const h = time + horizontalOffset; // movement
        const b =
          baseFrequency +
          Math.cos(w / baseFrequency) +
          Math.cos((w / baseFrequency) * 2) +
          5; // how close to each other
        const k = 5; // vertical value
        const y = a * Math.sin((x - h) / b) + k;
        canvas.lineTo(x, y + offset);
      }
      canvas.strokeStyle = grd;
      canvas.lineWidth = 4;
      canvas.stroke();
    }
  };
  const animate = (time: number) => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        drawSineWave(height, width, time / 50, context);
        requestAnimationFrame(animate);
      }
    }
  };

  useEffect(() => {
    const requestId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, [height]);
  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="bg-gradient-to-tr from-blue-400 to-blue-500 w-full h-full z-0"
    ></canvas>
  );
};
