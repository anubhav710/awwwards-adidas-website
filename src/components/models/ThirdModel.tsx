import { shirtColors } from "@/lib/color";
import { ShirtType, TextureKey } from "@/lib/textures";
import {
  useShirtEnvirmentCube,
  useShirtSectionTextures,
  useShirtVideoTexture,
} from "@/lib/useTexture";
import { MeshReflectorMaterial, Text } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import React, { useCallback } from "react";
import { useMediaQuery } from "react-responsive";
import * as THREE from "three";

const ThirdModel = ({ shirtType }: { shirtType: ShirtType }) => {
  const textures = useShirtSectionTextures(shirtType, "third", false) as Record<
    TextureKey<typeof shirtType, "third">,
    THREE.Texture
  >;

  const envMap = useShirtEnvirmentCube(shirtType);
  const videoMap = useShirtVideoTexture(shirtType);
  const getTextColor = () => shirtColors[shirtType]?.text ?? "white";
  const getWallColor = () => shirtColors[shirtType]?.wall ?? "white";

  const handleClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    window.open("https://www.adidas.co.in/", "_blank");
  }, []);

  const isMobile = useMediaQuery({ maxWidth: 1024 });

  return (
    <group>
      <mesh
        scale={isMobile ? 0.06 : 0.1}
        rotation-y={-Math.PI / 6}
        position={isMobile ? [0, 0.45, 0] : [0.2, 0.65, 0]}
      >
        <planeGeometry args={[16, 9]} />
        <meshBasicMaterial map={videoMap} />
      </mesh>
      <mesh position-y={0.2} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[10, 3]} />
        <MeshReflectorMaterial
          envMap={envMap}
          normalMap={textures.normal}
          map={textures.overlay}
          blur={[300, 30]}
          resolution={1024}
          mixBlur={1}
          mixStrength={10}
          roughness={0.8}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          metalness={0}
        />
      </mesh>
      <mesh position={[0.5, 5, -1.3]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial color={getWallColor()} map={textures.overlay} />
      </mesh>

      {/* html 3d content  */}
      <group
        position={isMobile ? [0, 0.9, 0] : [-0.8, 0.7, 0]}
        rotation={isMobile ? [0, -Math.PI / 9, 0] : [0, Math.PI / 9, 0]}
      >
        <mesh position={[0, 0.1, 0]}>
          <planeGeometry args={[0.5, 0.2]} />
          <meshBasicMaterial
            color={getTextColor()}
            map={textures.icon}
            transparent
          />
        </mesh>
        {/* button  */}
        <group
          onClick={handleClick}
          onPointerEnter={() => (document.body.style.cursor = "pointer")}
          onPointerLeave={() => (document.body.style.cursor = "auto")}
        >
          <mesh>
            <boxGeometry args={[0.5, 0.12, 0.02]} />
            <meshBasicMaterial color={getTextColor()} />
          </mesh>
          <Text
            fontSize={0.035}
            anchorX={"center"}
            anchorY={"middle"}
            position={[0, 0, 0.03]}
          >
            SHOP THE COLLECTION
            <meshBasicMaterial
              color={getTextColor() === "black" ? "white" : "black"}
            />
          </Text>
        </group>
      </group>
    </group>
  );
};

export default ThirdModel;
