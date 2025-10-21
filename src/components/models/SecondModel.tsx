import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useShirtSectionTextures } from "@/lib/useTexture";
import { createMaterial } from "@/lib/material";
import { ShirtType, TextureKey } from "@/lib/textures";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { shirtColors } from "@/lib/color";
import { useMediaQuery } from "react-responsive";

type GLTFResult = {
  nodes: {
    [name: string]: THREE.Mesh;
  };
};

export function SecondModel({ shirtType }: { shirtType: ShirtType }) {
  const { nodes } = useGLTF(
    "/models/ShirtScrolling.glb"
  ) as unknown as GLTFResult;

  const textures = useShirtSectionTextures(shirtType, "second");
  const mats = createMaterial(textures) as Record<
    TextureKey<typeof shirtType, "second">,
    THREE.MeshBasicMaterial
  >;

  const getTextColor = () => shirtColors[shirtType]?.text ?? "black";

  const marqueeText1Ref = useRef<THREE.Mesh>(null);
  const marqueeText1DupRef = useRef<THREE.Mesh>(null);
  const marqueeText2Ref = useRef<THREE.Mesh>(null);
  const marqueeText2DupRef = useRef<THREE.Mesh>(null);

  const textMaterial = new THREE.MeshBasicMaterial({
    color: getTextColor(),
    transparent: true,
    opacity: 1,
  });
  const marqueeMaterial = new THREE.MeshBasicMaterial({
    color: getTextColor(),
    transparent: true,
    opacity: 1,
  });
  const TOP_BOTTOM_TEXT_WIDTH = 5.7;
  const MIDDLE_TEXT_WDTH = 6.2;
  const DURATION = 50;

  useGSAP(() => {
    if (
      !marqueeText1Ref.current ||
      !marqueeText1DupRef.current ||
      !marqueeText2Ref.current ||
      !marqueeText2DupRef.current
    )
      return;

    gsap.to(marqueeText1Ref.current.position, {
      x: `-=${TOP_BOTTOM_TEXT_WIDTH}`,
      duration: DURATION,
      ease: "none",
      repeat: -1,
    });

    gsap.to(marqueeText1DupRef.current.position, {
      x: `-=${TOP_BOTTOM_TEXT_WIDTH}`,
      duration: DURATION,
      ease: "none",
      repeat: -1,
    });

    gsap.to(marqueeText2Ref.current.position, {
      x: `+=${MIDDLE_TEXT_WDTH}`,
      duration: DURATION,
      ease: "none",
      repeat: -1,
    });

    gsap.to(marqueeText2DupRef.current.position, {
      x: `+=${MIDDLE_TEXT_WDTH}`,
      duration: DURATION,
      ease: "none",
      repeat: -1,
    });
  });

  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <group dispose={null} scale={isMobile ? 1.5 : 2.2}>
      <mesh geometry={nodes.Shirt.geometry} material={mats.shirt} />
      <mesh geometry={nodes.Sphere_ENV.geometry} material={mats.sphere} />
      <group>
        {Object.entries(nodes)
          .filter(([key]) => key.startsWith("Texts"))
          .map(([key, node]) => (
            <mesh
              key={key}
              geometry={node.geometry}
              material={textMaterial}
              position={node.position}
            />
          ))}
      </group>
      <mesh
        ref={marqueeText1Ref}
        geometry={nodes.Marquee_Top_Bottom.geometry}
        material={marqueeMaterial}
        position={[0, 0, 0]}
      />
      <mesh
        ref={marqueeText1DupRef}
        geometry={nodes.Marquee_Top_Bottom.geometry}
        material={marqueeMaterial}
        position={[TOP_BOTTOM_TEXT_WIDTH, 0, 0]}
      />
      <mesh
        ref={marqueeText2Ref}
        geometry={nodes.Marquee_Middle.geometry}
        material={marqueeMaterial}
        position={[0, 0, 0]}
      />
      <mesh
        ref={marqueeText2DupRef}
        geometry={nodes.Marquee_Middle.geometry}
        material={marqueeMaterial}
        position={[-MIDDLE_TEXT_WDTH, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/models/ShirtScrolling.glb");
