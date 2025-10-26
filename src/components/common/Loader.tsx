import { Html, useProgress } from "@react-three/drei";
import Bars from "./Bars";
import { useEffect, useState } from "react";

function waitForSeconds(seconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

const LoadingSkeleton = () => {
  const { active, progress } = useProgress();
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Ensure minimum 5 seconds display
    waitForSeconds(7).then(() => {
      if (isMounted) setMinTimeElapsed(true);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Hide only when BOTH conditions are met:
  // 1. Model loading is complete (!active means loading finished)
  // 2. Minimum 5 seconds have elapsed
  const shouldHide = !active && minTimeElapsed;

  if (shouldHide) return null;

  return (
    <Html position={[0, 0.7, 0]} center prepend>
      <div className="flex items-center justify-center bg-black w-screen h-screen">
        <div className="flex flex-col items-center w-40 md:w-3xs mt-5 gap-4">
          <Bars />
          <div className="w-full">
            <p className="mt-2 text-sm text-white/50 text-center">loading</p>
          </div>
        </div>
      </div>
    </Html>
  );
};

export default LoadingSkeleton;
