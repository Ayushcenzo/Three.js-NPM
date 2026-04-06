import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function BotModel({ onArchitectureChange }) {
  const { nodes, materials } = useGLTF('/robot.glb');

  const group = useRef(null);
  const headRef = useRef(null);
  const bodyRef = useRef(null);
  const leftArmRef = useRef(null);
  const rightArmRef = useRef(null);
  const baseRef = useRef(null);

  const [architectureActive, setArchitectureActive] = useState(false);

  useEffect(() => {
    const refs = [group, headRef, bodyRef, leftArmRef, rightArmRef, baseRef];
    if (refs.some((r) => !r.current)) return;

    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      let { isMobile } = context.conditions;

      group.current.position.set(isMobile ? 0 : -2.5, isMobile ? -1.2 : -2.2, isMobile ? 3 : 3);
      group.current.rotation.set(0, Math.PI / 8, 0);
      
      [headRef, bodyRef, leftArmRef, rightArmRef, baseRef].forEach((r) =>
        r.current.position.set(0, 0, 0)
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".scroll-content",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      tl.to(group.current.position, { 
          x: isMobile ? 0 : 1.8, 
          y: isMobile ? -1.2 : -2, 
          z: isMobile ? 1.5 : 1.8, 
          ease: "power1.inOut", 
          duration: 1 
        }, 0)
        .to(group.current.rotation, { y: -Math.PI / 6, ease: "power1.inOut", duration: 1 }, 0);

      tl.to(group.current.position, { x: 0, y: -1.2, z: 0, ease: "power2.inOut", duration: 1 }, 1)
        .to(group.current.rotation, { y: 0, ease: "power2.inOut", duration: 1 }, 1);

      tl.to(headRef.current.position, { y: 1.5, ease: "power2.out", duration: 1 }, 2)
        .to(bodyRef.current.position, { z: -1.5, ease: "power2.out", duration: 1 }, 2)
        .to(leftArmRef.current.position, { x: -1.5, y: 0.5, ease: "power2.out", duration: 1 }, 2)
        .to(rightArmRef.current.position, { x: 1.5, y: 0.5, ease: "power2.out", duration: 1 }, 2)
        .to(baseRef.current.position, { y: -1.5, ease: "power2.out", duration: 1 }, 2);

      tl.to(
        [headRef.current.position, bodyRef.current.position, leftArmRef.current.position, rightArmRef.current.position, baseRef.current.position],
        { x: 0, y: 0, z: 0, ease: "power2.inOut", duration: 1 }, 3
      )
        .to(group.current.rotation, { y: Math.PI * 2, ease: "power1.inOut", duration: 1 }, 3);

    });

    ScrollTrigger.create({
      trigger: ".disassembly-section",
      start: "top 65%",
      end: "bottom 35%",
      onToggle: (self) => {
        setArchitectureActive(self.isActive);
        onArchitectureChange?.(self.isActive);
      },
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [onArchitectureChange]);

  useFrame((state) => {
    if (group.current && !architectureActive) {
      group.current.position.y += Math.sin(state.clock.elapsedTime) * 0.001;
    }
  });

  const scale = 0.22;
  const position = [0, -1, 0];
  const rotation = [-Math.PI / 2, 0, 0];

  return (
    <group ref={group} dispose={null}>
      <group ref={headRef}>
        <mesh scale={scale} position={position} rotation={rotation} geometry={nodes['Cube003_Material002_0'].geometry} material={materials['Material.002']} />
      </group>
      <group ref={bodyRef}>
        <mesh scale={scale} position={position} rotation={rotation} geometry={nodes['Cube003_Material003_0'].geometry} material={materials['Material.003']} />
      </group>
      <group ref={leftArmRef}>
        <mesh scale={scale} position={position} rotation={rotation} geometry={nodes['Cube003_Material001_0'].geometry} material={materials['Material.001']} />
      </group>
      <group ref={rightArmRef}>
        <mesh scale={scale} position={position} rotation={rotation} geometry={nodes['Cube003_Material005_0'].geometry} material={materials['Material.005']} />
      </group>
      <group ref={baseRef}>
        <mesh scale={scale} position={position} rotation={rotation} geometry={nodes['Cube003_Alpha_Joints_MAT_0'].geometry} material={materials['Alpha_Joints_MAT']} />
      </group>
    </group>
  );
}

useGLTF.preload('/robot.glb');