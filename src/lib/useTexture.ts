import { useCubeTexture, useTexture, useVideoTexture } from "@react-three/drei";
import {
  SectionType,
  ShirtType,
  envirmentPaths,
  studioTextures,
  videoTextures,
} from "./textures";
import * as THREE from "three";

export const useMainStudioTexture = () => {
  return useModifiedTextures(studioTextures.main, true);
};

export const useShirtSectionTextures = (
  shirtType: ShirtType,
  section: SectionType,
  setModifier = true
) => {
  const paths = studioTextures.shirts[shirtType][section];

  return useModifiedTextures(paths, setModifier);
};

function useModifiedTextures(
  paths: Record<string, string>,
  setModifier: boolean
) {
  const texture = useTexture(paths);
  if (setModifier) {
    Object.values(texture).forEach((tex) => {
      tex.flipY = false;
      tex.colorSpace = THREE.SRGBColorSpace;
    });
  }
  return texture;
}

export const useShirtEnvirmentCube = (shirtType: ShirtType) => {
  const path = envirmentPaths[shirtType];
  return useCubeTexture(
    ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
    { path }
  );
};

export const useShirtVideoTexture = (shirtType: ShirtType) => {
  const path = videoTextures[shirtType];
  return useVideoTexture(path);
};
