import * as THREE from "three";
export const createMaterial = (textures: Record<string, THREE.Texture>) => {
  const mats: Record<string, THREE.MeshBasicMaterial> = {};
  for (const [key, txt] of Object.entries(textures)) {
    mats[key] = new THREE.MeshBasicMaterial({ map: txt });
  }
  return mats;
};
