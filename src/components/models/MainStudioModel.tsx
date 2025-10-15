"use client";
import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

import * as THREE from "three";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useMainStudioTexture } from "@/lib/useTexture";
import { createMaterial } from "@/lib/material";
import { studioTextures } from "@/lib/textures";

type GLTFResult = {
  nodes: {
    [name: string]: THREE.Mesh;
  };
};

export function MainStudioModel({
  currentIndex,
  scale,
}: {
  currentIndex: number;
  scale: number;
}) {
  const meshRef = useRef<(THREE.Mesh | null)[]>([]);
  const router = useRouter();
  const tlRef = useRef<GSAPTimeline[]>([]);

  useGSAP(() => {
    if (!meshRef.current) return;
    meshRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      tlRef.current[i] = gsap
        .timeline({ paused: true })
        .to(mesh.rotation, { y: 0, duration: 1, ease: "power1.inOut" })
        .to(
          mesh.scale,
          {
            x: 1.05,
            y: 1.05,
            z: 1.05,
            duration: 1,
            ease: "power1.inOut",
          },
          "<"
        );
    });
  });

  useGSAP(() => {
    if (window.innerWidth > 768) return;
    for (let i = 0; i < meshRef.current.length; i++) {
      const mesh = meshRef.current[i];
      if (!mesh) return;

      switch (currentIndex) {
        case 0:
          gsap.to(mesh.position, { x: mesh.position.x + 0.65 });
          gsap.to(mesh.rotation, { y: 0 });
          gsap.to(meshRef.current[0]!.position, { z: 0 });
          gsap.to(meshRef.current[1]!.position, { z: -0.45 });
          setEnvMaterial(mats.grayStudio);
          break;
        case 1:
          gsap.to(mesh.position, {
            x: shirt[i].position[0],
            z: shirt[i].position[2],
          });
          setEnvMaterial(mats.redStudio);
          break;
        case 2:
          gsap.to(mesh.position, { x: mesh.position.x - 0.65 });
          gsap.to(mesh.rotation, { y: 0 });
          gsap.to(meshRef.current[2]!.position, { z: 0 });
          gsap.to(meshRef.current[1]!.position, { z: -0.45 });
          setEnvMaterial(mats.whiteStudio);
          break;
      }
    }
  }, [currentIndex]);

  const { nodes } = useGLTF(
    "/models/main/MainStudio.glb"
  ) as unknown as GLTFResult;

  const textures = useMainStudioTexture();
  const mats = createMaterial(textures) as Record<
    keyof typeof studioTextures.main,
    THREE.MeshBasicMaterial
  >;

  const [envMaterial, setEnvMaterial] = useState<THREE.MeshBasicMaterial>(
    mats.defaultStudio
  );

  function enterHandler(material: THREE.MeshBasicMaterial, index: number) {
    document.body.style.cursor = "pointer";
    setEnvMaterial(material);
    tlRef.current[index].play();
  }
  function leaveHandler(index: number) {
    document.body.style.cursor = "auto";
    tlRef.current[index].reverse();
  }

  function handleClick(slug: string) {
    router.push(`/shirt/${slug}`);
  }

  const shirt = [
    {
      position: [-0.65, 0.7, -0.45] as [number, number, number],
      rotation: [0, -Math.PI / 9, 0] as [number, number, number],
      material: mats.grayShirt,
      geometry: nodes.Shirt_Gray.geometry,
      hoverMe: mats.grayStudio,
      slug: "gray",
    },

    {
      position: [0, 0.7, 0] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      material: mats.sportShirt,
      geometry: nodes.Shirt_Sport.geometry,
      hoverMe: mats.redStudio,
      slug: "red",
    },
    {
      position: [0.65, 0.7, -0.45] as [number, number, number],
      rotation: [0, Math.PI / 9, 0] as [number, number, number],
      material: mats.whiteShirt,
      geometry: nodes.Shirt_White.geometry,
      hoverMe: mats.whiteStudio,
      slug: "white",
    },
  ];
  useEffect(() => {
    shirt.forEach((s) => {
      router.prefetch(`/shirt/${s.slug}`);
    });
  }, [router]);
  return (
    <group dispose={null} scale={scale}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Environment.geometry}
        material={envMaterial}
      />
      {shirt.map((shirt, i) => (
        <mesh
          ref={(m) => {
            if (!m) return;
            meshRef.current[i] = m;
          }}
          key={i}
          geometry={shirt.geometry}
          material={shirt.material}
          position={shirt.position}
          rotation={shirt.rotation}
          onPointerEnter={() => enterHandler(shirt.hoverMe, i)}
          onPointerLeave={() => leaveHandler(i)}
          onClick={() => handleClick(shirt.slug)}
        />
      ))}
      <mesh
        geometry={nodes.Hitbox.geometry}
        scale={[2.52, 1, 1]}
        visible={false}
        onPointerLeave={() => setEnvMaterial(mats.defaultStudio)}
      />
    </group>
  );
}

useGLTF.preload("/models/main/MainStudio.glb");
