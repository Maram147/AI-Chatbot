"use client";
import Image from "next/image";
import ChatBox from "./components/ChatBox";
import React, { useState } from 'react';
import { useEffect, useMemo } from "react";
import { loadSlim } from "@tsparticles/slim";
import Particles, { initParticlesEngine } from "@tsparticles/react";

export default function Home() {
  const [init, setInit] = useState(false);
   useEffect(() => {
      initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      }).then(() => {
        setInit(true);
      });
    }, []);
     const particlesLoaded = (container) => {
      console.log(container);
    };
  
  const options = useMemo(
      () => ({
        background: {
          color: {
            value: "#0b0a0c",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 6,
            straight: false,
          },
          number: {
            density: {
              enable: true,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }),
      [],
    );
  return (
      <main className="flex h-screen flex-col items-center justify-center relative">
  <Particles
    id="tsparticles"
    particlesLoaded={particlesLoaded}
    options={options}
    className="absolute top-0 left-0 w-full h-full -z-10"
  />
  <div className="relative z-10">
    <ChatBox />
  </div>
</main>

      
  );
}
