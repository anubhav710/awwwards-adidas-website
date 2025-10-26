"use client";

import ScrollIndicator from "@/components/common/scrollIndicator";
import Scene from "@/components/ui/Scene";
import { ShirtType } from "@/lib/textures";

import React, { use } from "react";

const page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);
  const shirtType = slug as ShirtType;

  return (
    <>
      <Scene shirtType={shirtType} />
      <ScrollIndicator shirtType={shirtType} />
    </>
  );
};

export default page;
