import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

import particles from "../../../data/particlesData_Snow.json";

const BackgroundSnow = ({ containerId, colour }) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (init) {
    return (
      <div
        id={containerId}
        className="relative w-full h-full overflow-hidden"
      >
        <Particles
          id={`${containerId}-particles`}
          options={{
            ...particles,
            background: {
              color: { value: "transparent" },
            },
          }}
          className="absolute top-0 left-0 w-ful h-full pointer-events-none"
          // style={{
          //   position: "absolute",
          //   top: 0,
          //   left: 0,
          //   width: "100%",
          //   height: "100%",
          //   pointerEvents: "none", // Make particles non-interactive
          // }}
        />
      </div>
    );
  }

  return null;
};

export default BackgroundSnow;
