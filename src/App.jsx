import { Suspense, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import { BotModel } from "./components/BotModel";
import { DynamicStars } from "./components/DynamicStars";
import {
  HeroSection,
  SpecsSection,
  DisassemblySection,
  FunctionalitySection,
} from "./components/Sections";

function App() {
  const [architectureActive, setArchitectureActive] = useState(false);
  const orbitRef = useRef(null);

  return (
    // overflow-x-hidden fixes the width bleed issue
    <div className="relative w-full max-w-[100vw] overflow-x-hidden bg-[#030407] text-white">

      {/* ── Fixed 3D Canvas ── */}
      <div
        className="fixed inset-0 z-[1] transition-[pointer-events] duration-300"
        style={{ pointerEvents: architectureActive ? "auto" : "none" }}
      >
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <color attach="background" args={["#0b0f19"]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 3, 2]}   intensity={50} color="#ffffff" distance={20} decay={2} />
          <pointLight position={[-5, -3, 2]} intensity={20} color="#38bdf8" distance={20} decay={2} />

          {/* OrbitControls — only active during architecture section */}
          <OrbitControls
            ref={orbitRef}
            enabled={architectureActive}
            enableZoom={true}
            enablePan={false}
            minDistance={4}
            maxDistance={14}
            dampingFactor={0.08}
            enableDamping
            rotateSpeed={0.6}
            // Reset to default on deactivation
            makeDefault={false}
          />

          <Suspense fallback={null}>
            <Environment preset="city" />
            <BotModel onArchitectureChange={setArchitectureActive} />
            <ContactShadows
              position={[0, -2.5, 0]}
              opacity={0.6}
              scale={10}
              blur={2}
              far={4}
            />
            <DynamicStars />
          </Suspense>
        </Canvas>
      </div>

      {/* ── Orbit hint badge — shown only in architecture section ── */}
      {architectureActive && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[10] flex items-center gap-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2 text-xs text-zinc-400 pointer-events-none select-none animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          Drag to orbit · Scroll to continue
        </div>
      )}

      {/* ── Scrollable Content ── */}
      <div
        className="relative z-[2] scroll-content"
        style={{ pointerEvents: architectureActive ? "none" : "auto" }}
      >
        <HeroSection />
        <SpecsSection />
        <DisassemblySection />
        <FunctionalitySection />
      </div>

    </div>
  );
}

export default App;