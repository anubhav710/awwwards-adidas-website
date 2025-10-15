import { useTexture } from "@react-three/drei";
import { studioTextures } from "./textures";
import * as THREE from "three";
export const useMainStudioTexture = () => {
  const texture = useTexture(studioTextures.main);
  Object.values(texture).forEach((tex) => {
    tex.flipY = false;
    tex.colorSpace = THREE.SRGBColorSpace;
  });

  return texture;
};
