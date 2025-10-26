import { envirmentPaths, ShirtType, studioTextures } from "@/lib/textures";
import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

interface AssetsPreloadProps {
  onComplete?: () => void;
}

const AssetsPreload = ({ onComplete }: AssetsPreloadProps) => {
  const { gl } = useThree();

  useGLTF.preload("/models/main/MainStudio.glb");
  useGLTF.preload("/models/white/WhiteStudio.glb");
  useGLTF.preload("/models/sport/SportStudio.glb");
  useGLTF.preload("/models/gray/GrayStudio.glb");
  useGLTF.preload("/models/ShirtScrolling.glb");

  Object.values(studioTextures.main).forEach((path) => {
    if (typeof path === "string") {
      useTexture.preload(path);
    }
  });

  (Object.keys(studioTextures.shirts) as ShirtType[]).forEach((shirtType) => {
    const shirtSection = studioTextures.shirts[shirtType];
    Object.values(shirtSection).forEach((section) => {
      if (typeof section === "object" && section !== null) {
        Object.values(section).forEach((texturePath) => {
          if (typeof texturePath === "string") useTexture.preload(texturePath);
        });
      }
    });
  });

  const cubeSides = [
    "px.png",
    "nx.png",
    "py.png",
    "ny.png",
    "pz.png",
    "nz.png",
  ];

  (Object.keys(envirmentPaths) as ShirtType[]).forEach((shirtType) => {
    cubeSides.forEach((side) => {
      useTexture.preload(`${envirmentPaths[shirtType]}${side}`);
    });
  });

  useEffect(() => {
    if (onComplete && gl.loader) {
      const checkLoadingComplete = () => {
        if (gl.loader.manager.itemsLoaded === gl.loader.manager.itemsTotal) {
          onComplete();
        } else {
          // Check again in next frame
          requestAnimationFrame(checkLoadingComplete);
        }
      };

      // Start checking after a short delay to allow preloads to register
      setTimeout(checkLoadingComplete, 100);
    }
  }, [onComplete, gl.loader]);

  return null;
};

export default AssetsPreload;
