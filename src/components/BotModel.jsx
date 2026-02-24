import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Cylinder, Sphere, Html } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Hover Tooltip ────────────────────────────────────────────────────────────
function HoverTooltip({ title, specs, position }) {
  return (
    <Html position={position} center distanceFactor={6} zIndexRange={[100, 0]}>
      <div className="pointer-events-none bg-black/85 backdrop-blur-xl border border-white/20 rounded-2xl p-4 w-60 shadow-2xl">
        <h4 className="text-[0.6rem] uppercase tracking-widest text-sky-400 font-semibold mb-2">
          {title}
        </h4>
        {specs.map(({ label, value }) => (
          <p key={label} className="text-[0.78rem] text-slate-300 font-light leading-snug mb-1 last:mb-0">
            <span className="text-white font-medium">{label}: </span>{value}
          </p>
        ))}
        <p className="text-[0.6rem] text-zinc-500 mt-2 italic">Hover to inspect • Drag to orbit</p>
      </div>
    </Html>
  );
}

// ─── Scroll Annotation Card ───────────────────────────────────────────────────
function AnnotationCard({ innerRef, title, children }) {
  return (
    <Html center>
      <div
        ref={innerRef}
        style={{ opacity: 0 }}
        className="pointer-events-none flex items-center gap-4 w-[380px]"
      >
        <div className="relative w-14 h-px bg-white/40 shrink-0">
          <span className="absolute left-0 -top-[3px] w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        </div>
        <div className="bg-black/70 backdrop-blur-xl border-l-2 border-white/70 rounded-r-xl p-4 text-left">
          <h4 className="text-[0.6rem] font-semibold uppercase tracking-widest text-zinc-400 mb-2">
            {title}
          </h4>
          {children}
        </div>
      </div>
    </Html>
  );
}

function Spec({ label, value }) {
  return (
    <p className="text-[0.82rem] leading-snug text-slate-200 font-light mb-1 last:mb-0">
      <strong className="font-semibold text-white">{label}: </strong>{value}
    </p>
  );
}

// ─── Materials ────────────────────────────────────────────────────────────────
const whiteArmor = new THREE.MeshStandardMaterial({ color: "#f8f9fa", roughness: 0.1, metalness: 0.1 });
const darkJoint = new THREE.MeshStandardMaterial({ color: "#1f2937", roughness: 0.8, metalness: 0.3 });
const eyeMat = new THREE.MeshStandardMaterial({ color: "#0ea5e9", roughness: 0.2, metalness: 0.8, emissive: "#0ea5e9", emissiveIntensity: 0.5 });
const blackVisor = new THREE.MeshStandardMaterial({ color: "#000000", roughness: 0.3, metalness: 0.8 });
const hoveredMat = new THREE.MeshStandardMaterial({ color: "#bae6fd", roughness: 0.05, metalness: 0.4, emissive: "#38bdf8", emissiveIntensity: 0.15 });

// ─── Main Component ───────────────────────────────────────────────────────────
export function BotModel({ onArchitectureChange }) {
  const group = useRef(null);
  const headRef = useRef(null);
  const bodyRef = useRef(null);
  const leftArmRef = useRef(null);
  const rightArmRef = useRef(null);
  const baseRef = useRef(null);

  const headHtml = useRef(null);
  const bodyHtml = useRef(null);
  const armsHtml = useRef(null);
  const baseHtml = useRef(null);

  const [architectureActive, setArchitectureActive] = useState(false);
  const [hoveredPart, setHoveredPart] = useState(null); // "head"|"body"|"leftArm"|"rightArm"|"base"

  const handleHover = (part) => (e) => {
    if (!architectureActive) return;
    e.stopPropagation();
    setHoveredPart(part);
    document.body.style.cursor = "pointer";
  };
  const handleUnhover = () => {
    setHoveredPart(null);
    document.body.style.cursor = "auto";
  };

  useEffect(() => {
    const refs = [group, headRef, bodyRef, leftArmRef, rightArmRef, baseRef];
    if (refs.some((r) => !r.current)) return;

    // Reset all transforms
    group.current.position.set(-3, -1, 0);
    group.current.rotation.set(0, 0, 0);
    [headRef, bodyRef, leftArmRef, rightArmRef, baseRef].forEach((r) =>
      r.current.position.set(0, 0, 0)
    );

    /*
      Scroll proportions: Hero(100vh) + Specs(100vh) + Disassembly(200vh) + Functionality(100vh)
      Timeline: 5 units total
        0-1  : Hero → Specs    (bot moves right)
        1-2  : Specs → Center  (bot moves to center)
        2-3  : Explode apart
        3-4  : Hold exploded   (OrbitControls active here)
        4-5  : Reassemble
    */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-content",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    // Phase 0-1: Hero → Specs
    tl.to(group.current.position, { x: 2.5, y: -2, z: 0.5, ease: "power1.inOut", duration: 1 }, 0)
      .to(group.current.rotation, { y: -Math.PI / 6, ease: "power1.inOut", duration: 1 }, 0);

    // Phase 1-2: Specs → center
    tl.to(group.current.position, { x: 0, y: 0, z: 0, ease: "power2.inOut", duration: 1 }, 1)
      .to(group.current.rotation, { y: 0, ease: "power2.inOut", duration: 1 }, 1);

    // Phase 2-3: Explode parts
    tl.to(headRef.current.position, { y: 2.5, ease: "power2.out", duration: 1 }, 2)
      .to(bodyRef.current.position, { z: -1.5, ease: "power2.out", duration: 1 }, 2)
      .to(leftArmRef.current.position, { x: -2.5, y: 0.8, ease: "power2.out", duration: 1 }, 2)
      .to(rightArmRef.current.position, { x: 2.5, y: 0.8, ease: "power2.out", duration: 1 }, 2)
      .to(baseRef.current.position, { y: -2.5, ease: "power2.out", duration: 1 }, 2);

    // Phase 2.5-3: Show annotations
    const annotations = [headHtml.current, bodyHtml.current, armsHtml.current, baseHtml.current].filter(Boolean);
    if (annotations.length) {
      tl.to(annotations, { opacity: 1, stagger: 0.12, ease: "power1.in", duration: 0.5 }, 2.5);
    }

    // Phase 4: Hide annotations, reassemble
    if (annotations.length) {
      tl.to(annotations, { opacity: 0, duration: 0.3, ease: "power1.out" }, 4);
    }
    tl.to(
      [headRef.current.position, bodyRef.current.position, leftArmRef.current.position, rightArmRef.current.position, baseRef.current.position],
      { x: 0, y: 0, z: 0, ease: "power2.inOut", duration: 1 }, 4
    )
      .to(group.current.rotation, { y: Math.PI * 2, ease: "power1.inOut", duration: 1 }, 4)
      .to(group.current.position, { x: 0, y: 0, z: 0, ease: "power2.inOut", duration: 1 }, 4);

    // Detect architecture section entry
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
      document.body.style.cursor = "auto";
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Idle float — paused during architecture so orbit controls feel stable
  useFrame((state) => {
    if (group.current && !architectureActive) {
      group.current.position.y += Math.sin(state.clock.elapsedTime) * 0.001;
    }
  });

  const wm = (part) => hoveredPart === part ? hoveredMat : whiteArmor;

  return (
    <group ref={group} dispose={null}>

      {/* ── HEAD ── */}
      <group
        ref={headRef}
        onPointerEnter={handleHover("head")}
        onPointerLeave={handleUnhover}
      >
        <Box args={[1.4, 1.2, 1.3]} position={[0, 2.2, 0]} material={wm("head")} castShadow />
        <Cylinder args={[0.3, 0.3, 1.6]} position={[0, 2.2, 0]} rotation={[0, 0, Math.PI / 2]} material={darkJoint} castShadow />
        <Box args={[1.1, 0.6, 0.2]} position={[0, 2.2, 0.6]} material={blackVisor} />
        <Sphere args={[0.15, 32, 32]} position={[-0.3, 2.2, 0.7]} material={eyeMat} />
        <Sphere args={[0.15, 32, 32]} position={[0.3, 2.2, 0.7]} material={eyeMat} />
        <Sphere args={[0.05, 16, 16]} position={[-0.3, 2.2, 0.8]} material={whiteArmor} />
        <Sphere args={[0.05, 16, 16]} position={[0.3, 2.2, 0.8]} material={whiteArmor} />

        {hoveredPart === "head" && architectureActive && (
          <HoverTooltip
            title="Cognitive Core & Optics"
            specs={[
              { label: "Cameras", value: "Dual 48MP Sony IMX, f/1.4, 120Hz LIDAR" },
              { label: "Display", value: "5.5″ Micro-OLED, 2500 nits peak brightness" },
              { label: "CPU", value: "Quantum Neural Engine — 4.2 PB/s" },
            ]}
            position={[2, 2.2, 0]}
          />
        )}
        <group position={[1.8, 2.5, 0]}>
          <AnnotationCard innerRef={headHtml} title="Cognitive Core & Optics">
            <Spec label="Cameras" value="Dual 48MP Sony IMX, f/1.4 aperture, 120Hz LIDAR." />
            <Spec label="Display" value="5.5″ Micro-OLED facial matrix, 2500 nits peak." />
            <Spec label="Processor" value="Quantum Neural Engine — 4.2 PB throughput." />
          </AnnotationCard>
        </group>
      </group>

      {/* ── BODY ── */}
      <group
        ref={bodyRef}
        onPointerEnter={handleHover("body")}
        onPointerLeave={handleUnhover}
      >
        <Cylinder args={[0.2, 0.2, 0.4]} position={[0, 1.5, 0]} material={darkJoint} />
        <Cylinder args={[0.8, 0.9, 1.2, 32]} position={[0, 0.8, 0]} material={wm("body")} castShadow />
        <Sphere args={[0.05, 16, 16]} position={[-0.4, 1.1, 0.8]} material={eyeMat} />
        <Sphere args={[0.05, 16, 16]} position={[0.4, 1.1, 0.8]} material={eyeMat} />

        {hoveredPart === "body" && architectureActive && (
          <HoverTooltip
            title="Thoracic Housing & Power"
            specs={[
              { label: "Battery", value: "15,000mAh Solid-State, 120W wireless" },
              { label: "Chassis", value: "Carbon-Titanium, IP68, 99% impact abs." },
            ]}
            position={[2, 0.8, 0]}
          />
        )}
        <group position={[1.8, 0.8, 0]}>
          <AnnotationCard innerRef={bodyHtml} title="Thoracic Housing & Power">
            <Spec label="Battery" value="15,000mAh Solid-State Lithium-Ceramic, 0-80% in 15 mins." />
            <Spec label="Chassis" value="Cold-forged Carbon-Titanium composite, IP68." />
          </AnnotationCard>
        </group>
      </group>

      {/* ── LEFT ARM ── */}
      <group
        ref={leftArmRef}
        onPointerEnter={handleHover("leftArm")}
        onPointerLeave={handleUnhover}
      >
        <Sphere args={[0.25, 32, 32]} position={[-1.1, 1.2, 0]} material={darkJoint} castShadow />
        <Cylinder args={[0.15, 0.15, 0.6]} position={[-1.3, 0.8, 0]} rotation={[0, 0, Math.PI / 8]} material={wm("leftArm")} castShadow />
        <Sphere args={[0.15, 16, 16]} position={[-1.5, 0.4, 0]} material={darkJoint} />
        <Cylinder args={[0.12, 0.1, 0.6]} position={[-1.4, -0.1, 0.2]} rotation={[Math.PI / 4, 0, -Math.PI / 16]} material={wm("leftArm")} castShadow />
        <Box args={[0.1, 0.2, 0.1]} position={[-1.3, -0.4, 0.4]} material={darkJoint} />
        <Box args={[0.1, 0.2, 0.1]} position={[-1.5, -0.4, 0.4]} material={darkJoint} />

        {hoveredPart === "leftArm" && architectureActive && (
          <HoverTooltip
            title="Left Manipulator"
            specs={[
              { label: "Motors", value: "14× brushless DC, harmonic drives" },
              { label: "Payload", value: "50kg lift, sub-mm tactile resolution" },
            ]}
            position={[-0.5, 0.5, 0]}
          />
        )}
        <group position={[-2.5, 0.8, 0]}>
          <AnnotationCard innerRef={armsHtml} title="Manipulator Appendages">
            <Spec label="Motors" value="14× brushless DC servo, zero-backlash harmonic drives." />
            <Spec label="Payload" value="50kg dynamic lift per arm, force-feedback sensors." />
          </AnnotationCard>
        </group>
      </group>

      {/* ── RIGHT ARM ── */}
      <group
        ref={rightArmRef}
        onPointerEnter={handleHover("rightArm")}
        onPointerLeave={handleUnhover}
      >
        <Sphere args={[0.25, 32, 32]} position={[1.1, 1.2, 0]} material={darkJoint} castShadow />
        <Cylinder args={[0.15, 0.15, 0.6]} position={[1.3, 0.8, 0]} rotation={[0, 0, -Math.PI / 8]} material={wm("rightArm")} castShadow />
        <Sphere args={[0.15, 16, 16]} position={[1.5, 0.4, 0]} material={darkJoint} />
        <Cylinder args={[0.12, 0.1, 0.6]} position={[1.4, -0.1, 0.2]} rotation={[Math.PI / 4, 0, Math.PI / 16]} material={wm("rightArm")} castShadow />
        <Box args={[0.1, 0.2, 0.1]} position={[1.3, -0.4, 0.4]} material={darkJoint} />
        <Box args={[0.1, 0.2, 0.1]} position={[1.5, -0.4, 0.4]} material={darkJoint} />

        {hoveredPart === "rightArm" && architectureActive && (
          <HoverTooltip
            title="Right Manipulator"
            specs={[
              { label: "Motors", value: "14× brushless DC, harmonic drives" },
              { label: "Payload", value: "50kg lift, sub-mm tactile resolution" },
            ]}
            position={[0.5, 0.5, 0]}
          />
        )}
      </group>

      {/* ── BASE / LEGS ── */}
      <group
        ref={baseRef}
        onPointerEnter={handleHover("base")}
        onPointerLeave={handleUnhover}
      >
        <Sphere args={[0.3, 32, 32]} position={[0, 0.1, 0]} material={darkJoint} />
        {/* Left leg */}
        <Cylinder args={[0.15, 0.15, 0.5]} position={[-0.4, -0.3, 0]} material={wm("base")} />
        <Sphere args={[0.15, 16, 16]} position={[-0.4, -0.6, 0]} material={darkJoint} />
        <Cylinder args={[0.15, 0.2, 0.5]} position={[-0.4, -0.9, 0]} material={wm("base")} />
        <Box args={[0.4, 0.2, 0.6]} position={[-0.4, -1.3, 0.1]} material={wm("base")} />
        <Box args={[0.35, 0.1, 0.5]} position={[-0.4, -1.45, 0.1]} material={darkJoint} />
        {/* Right leg */}
        <Cylinder args={[0.15, 0.15, 0.5]} position={[0.4, -0.3, 0]} material={wm("base")} />
        <Sphere args={[0.15, 16, 16]} position={[0.4, -0.6, 0]} material={darkJoint} />
        <Cylinder args={[0.15, 0.2, 0.5]} position={[0.4, -0.9, 0]} material={wm("base")} />
        <Box args={[0.4, 0.2, 0.6]} position={[0.4, -1.3, 0.1]} material={wm("base")} />
        <Box args={[0.35, 0.1, 0.5]} position={[0.4, -1.45, 0.1]} material={darkJoint} />

        {hoveredPart === "base" && architectureActive && (
          <HoverTooltip
            title="Bipedal Locomotion"
            specs={[
              { label: "System", value: "Pneumatic struts + 1000Hz gyro IMU" },
              { label: "Agility", value: "45° inclines, 25 km/h, silent pads" },
            ]}
            position={[0, -0.8, 0]}
          />
        )}
        <group position={[-2.2, -0.8, 0]}>
          <AnnotationCard innerRef={baseHtml} title="Bipedal Locomotion">
            <Spec label="System" value="Adaptive pneumatic struts + 1000Hz gyroscopic IMU." />
            <Spec label="Agility" value="45° inclines, max 25 km/h, silent acoustic pads." />
          </AnnotationCard>
        </group>
      </group>

    </group>
  );
}