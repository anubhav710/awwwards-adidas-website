import { ShirtType } from "@/lib/textures";
import { View } from "@react-three/drei";
import React from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { FirstWhiteModel } from "../models/FirstWhiteModel";
import { FirstGrayModel } from "../models/FirstGrayModel";
import { FirstSportModel } from "../models/FirstSportModel";
import ThirdModel from "../models/ThirdModel";
import { SecondModel } from "../models/SecondModel";

type Props = {
  shirtType: ShirtType;
};

gsap.registerPlugin(ScrollTrigger);
const Scene = ({ shirtType }: Props) => {
  return (
    <main className="min-h-screen">
      <section id="first-section" className="h-screen">
        <View className="w-dvw h-dvh">
          {shirtType === "white" && <FirstWhiteModel />}
          {shirtType === "gray" && <FirstGrayModel />}
          {shirtType === "sport" && <FirstSportModel />}
        </View>
      </section>
      <section
        id="third-section"
        className="absolute left-0 top-[500vh] h-screen"
      >
        <View className="w-dvw h-dvh">
          <ThirdModel shirtType={shirtType} />
        </View>
      </section>
      <section id="second-section" className="absolute inset-0 -z-10 h-screen">
        <View className="w-dvw h-dvh">
          <SecondModel shirtType={shirtType} />
        </View>
      </section>
    </main>
  );
};

export default Scene;
