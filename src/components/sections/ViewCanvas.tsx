"use client";
import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { MainStudioModel } from "../models/MainStudioModel";
import { OrbitControls, View } from "@react-three/drei";
import Rig from "../ui/Rig";

const ViewCanvas = () => {
  const [eventSource, setEventSource] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setEventSource(document.body);
  }, []);
  return (
    <Canvas
      style={{ position: "fixed", inset: 0, overflow: "hidden" }}
      camera={{ position: [0, 0.7, 3], fov: 30 }}
      eventSource={eventSource ?? undefined}
      eventPrefix="client"
      gl={{ stencil: true }}
    >
      <View.Port />
      <Rig />
    </Canvas>
  );
};

export default ViewCanvas;
