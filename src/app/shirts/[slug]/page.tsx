"use client";

import Indicator from "@/components/common/Indicator";
import Scene from "@/components/ui/Scene";
import { ShirtType } from "@/lib/textures";

import React, { use } from "react";

const page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);
  const shirtType = slug as ShirtType;

  return (
    <>
      <Scene shirtType={shirtType} />
      <Indicator shirtType={shirtType} />
    </>
  );
};

export default page;
