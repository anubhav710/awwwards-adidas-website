"use client";
import { ShirtType } from "@/lib/textures";
import { View } from "@react-three/drei";
import React from "react";
import { FirstWhiteModel } from "../models/FirstWhiteModel";
import { FirstGrayModel } from "../models/FirstGrayModel";
import { FirstSportModel } from "../models/FirstSportModel";
import { SecondModel } from "../models/SecondModel";
import ThirdModel from "../models/ThirdModel";

type Props = {
  shirtType: ShirtType;
};

const Scene = ({ shirtType }: Props) => {
  return (
    <main className="min-h-screen">
      <section id="first-secton" className="h-screen">
        <View className="w-dvw h-dvh">
          {shirtType === "white" && <FirstWhiteModel />}
          {shirtType === "gray" && <FirstGrayModel />}
          {shirtType === "sport" && <FirstSportModel />}
        </View>
      </section>
      <section id="second-secton" className="h-screen bg-black">
        <View className="w-dvw h-dvh">
          <SecondModel shirtType={shirtType} />
        </View>
      </section>
      <section id="third-secton" className="h-screen">
        <View className="w-dvw h-dvh">
          <ThirdModel shirtType={shirtType} />
        </View>
      </section>
    </main>
  );
};

export default Scene;
