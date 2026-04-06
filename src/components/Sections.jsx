export function HeroSection() {
  return (
    <section className="w-screen h-[100dvh] flex flex-col justify-end md:flex-row md:items-center md:justify-end px-6 md:px-[10vw] pointer-events-auto pb-24 md:pb-0">
      <div className="max-w-[600px] text-center md:text-left mt-auto md:mt-0">
        <h1 className="text-5xl md:text-[5.5rem] font-extrabold tracking-[-0.04em] leading-[1.1] mb-6 bg-gradient-to-b from-[#f97316] to-[#ea580c] bg-clip-text text-transparent">
          Project Nexus
        </h1>
        <p className="text-base md:text-[1.4rem] font-light text-zinc-400 leading-relaxed tracking-[-0.01em]">
          The pinnacle of autonomous mobility and synthetic intelligence. Scroll down to
          review the operational specs and structural integrity of the Mk. IV platform.
        </p>
      </div>
    </section>
  );
}

export function SpecsSection() {
  const specs = [
    { label: "Designation", value: "Mk. IV Nexus" },
    { label: "Chassis",     value: "Obsidian Polymer Blend" },
    { label: "Joints",      value: "Titanium-Tungsten Alloy" },
    { label: "Energy Core", value: "High-Yield Thermo Dynamo" },
    { label: "Optics",      value: "360° Neural-Infrared LIDAR" },
  ];

  return (
    <section className="w-screen h-screen flex items-center justify-start px-[10vw] pointer-events-auto">
      <div className="max-w-[450px] bg-[rgba(20,20,25,0.3)] backdrop-blur-[40px] border border-[#ea580c]/30 shadow-[0_30px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] p-12 rounded-3xl">
        <h2 className="text-3xl md:text-[2.5rem] font-semibold tracking-[-0.03em] leading-[1.2] mb-8 text-white">
          Hardware Specs
        </h2>
        <ul className="list-none space-y-0">
          {specs.map(({ label, value }) => (
            <li
              key={label}
              className="flex flex-col md:flex-row md:justify-between text-sm md:text-[1.1rem] text-zinc-400 border-b border-white/[0.05] py-3 md:py-4 gap-1 md:gap-0"
            >
              <span className="text-white font-normal">{label}</span>
              <span className="md:text-right text-zinc-500 md:text-zinc-400">{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function DisassemblySection() {
  return (
    <section className="disassembly-section w-screen h-[200vh] flex justify-center items-start pt-[15vh] px-[10vw] pointer-events-none">
      <h2 className="text-4xl md:text-[5rem] font-semibold tracking-[-0.04em] leading-[1.1] text-center uppercase opacity-80 bg-gradient-to-b from-white to-zinc-600 bg-clip-text text-transparent">
        Material Deconstruction
      </h2>
    </section>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="w-[350px] bg-[rgba(20,20,25,0.3)] backdrop-blur-[40px] border border-white/[0.05] shadow-[0_30px_60px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] p-10 rounded-3xl my-6 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:bg-[rgba(30,30,35,0.6)] hover:border-[#ea580c]/50">
      <h3 className="text-xl md:text-[1.4rem] font-semibold leading-[1.2] text-white tracking-[-0.02em] mb-4">
        {title}
      </h3>
      <p className="text-sm md:text-base leading-relaxed text-zinc-400 font-light">
        {description}
      </p>
    </div>
  );
}

export function FunctionalitySection() {
  const leftCards = [
    {
      title: "All-Terrain Locomotion",
      description: "Advanced gyroscopic stabilization and reinforced bipedal joints allow operation in 45° steep or jagged environments.",
    },
    {
      title: "Kinetic Deflection",
      description: "Outer Obsidian-Polymer shell diffuses impact forces across the chassis, nullifying blunt force trauma.",
    },
  ];

  const rightCards = [
    {
      title: "Synthetic Cognition",
      description: "Evaluates mission parameters dynamically, bypassing standard hardcoded loops for genuine adaptive solutions.",
    },
    {
      title: "Silent Operation",
      description: "Proprietary acoustic dampeners in all articulated joints render movement virtually undetectable at 20 meters.",
    },
  ];

  return (
    <section className="w-screen h-screen flex items-center justify-between px-[10vw] pointer-events-auto max-md:flex-col max-md:justify-center max-md:gap-4 max-md:pt-[5vh]">
      <div className="flex flex-col">
        {leftCards.map((c) => (
          <FeatureCard key={c.title} {...c} />
        ))}
      </div>
      <div className="flex flex-col">
        {rightCards.map((c) => (
          <FeatureCard key={c.title} {...c} />
        ))}
      </div>
    </section>
  );
}
