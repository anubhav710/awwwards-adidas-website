import * as THREE from "three";
import { useGLTF, useMask } from "@react-three/drei";

import { createMaterial } from "@/lib/material";
import { TextureKey } from "@/lib/textures";

import { useRef } from "react";
import { useShirtSectionTextures } from "@/lib/useTexture";

type GLTFResult = {
  nodes: {
    [name: string]: THREE.Mesh;
  };
};
export function FirstSportModel() {
  const { nodes } = useGLTF(
    "/models/sport/SportStudio.glb"
  ) as unknown as GLTFResult;

  const shirtRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  const textures = useShirtSectionTextures("sport", "first");
  const mats = createMaterial(textures) as Record<
    TextureKey<"sport", "first">,
    THREE.MeshBasicMaterial
  >;

  return (
    <group>
      <group ref={groupRef} dispose={null}>
        <mesh
          ref={shirtRef}
          geometry={nodes.Shirt_Sport.geometry}
          material={mats.shirt}
          position={[0, 0.7, 0]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh geometry={nodes.Environment.geometry} material={mats.env} />
        <mesh geometry={nodes.Ramp.geometry} material={mats.ramp} />
        <mesh
          geometry={nodes.SakteBoard.geometry}
          material={mats.skateboard}
          position={[0, -0.012, 0]}
        />
      </group>
    </group>
  );
}
