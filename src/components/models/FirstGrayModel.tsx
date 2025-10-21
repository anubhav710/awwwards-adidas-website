import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF, useMask } from "@react-three/drei";

import { TextureKey } from "@/lib/textures";
import { useShirtSectionTextures } from "@/lib/useTexture";
import { createMaterial } from "@/lib/material";

type GLTFResult = {
  nodes: {
    [name: string]: THREE.Mesh;
  };
};
export function FirstGrayModel() {
  const { nodes } = useGLTF(
    "/models/gray/GrayStudio.glb"
  ) as unknown as GLTFResult;

  const shirtRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const textures = useShirtSectionTextures("gray", "first");
  const mats = createMaterial(textures) as Record<
    TextureKey<"gray", "first">,
    THREE.MeshBasicMaterial
  >;

  return (
    <group>
      <group ref={groupRef} dispose={null}>
        <mesh
          ref={shirtRef}
          geometry={nodes.Shirt_Gray.geometry}
          material={mats.shirt}
          position={[0, 0.7, 0]}
        />
        <mesh geometry={nodes.Floor.geometry} material={mats.floor} />
        <mesh geometry={nodes.Wall.geometry} material={mats.wall} />
        <mesh geometry={nodes.Asset.geometry} material={mats.assets} />
      </group>
    </group>
  );
}
