// ─── Hero Section ─────────────────────────────────────────────────────────────
export function HeroSection() {
  return (
    <section className="w-screen h-screen flex items-center justify-end px-[10vw] pointer-events-auto">
      <div className="max-w-[600px]">
        <h1 className="text-[5.5rem] font-extrabold tracking-[-0.04em] leading-[1.1] mb-6 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
          Nexus
        </h1>
        <p className="text-[1.4rem] font-light text-zinc-400 leading-relaxed tracking-[-0.01em]">
          The next generation of autonomous robotic assistants. Scroll down to
          discover the intricate engineering and unparalleled functionality of
          our flagship model.
        </p>
      </div>
    </section>
  );
}

// ─── Specs Section ────────────────────────────────────────────────────────────
export function SpecsSection() {
  const specs = [
    { label: "Height",    value: "1.8 Meters" },
    { label: "Weight",    value: "125 kg (Carbon-Titanium)" },
    { label: "Processor", value: "Quantum Neural Net v4" },
    { label: "Power",     value: "Micro-Fusion Battery (10yr)" },
    { label: "Vision",    value: "360° LIDAR + Infrared" },
  ];

  return (
    <section className="w-screen h-screen flex items-center justify-start px-[10vw] pointer-events-auto">
      <div className="max-w-[450px] bg-[rgba(20,20,25,0.3)] backdrop-blur-[40px] border border-white/[0.08] shadow-[0_30px_60px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] p-12 rounded-3xl">
        <h2 className="text-[2.5rem] font-semibold tracking-[-0.03em] mb-8 text-white">
          Core Specifications
        </h2>
        <ul className="list-none space-y-0">
          {specs.map(({ label, value }) => (
            <li
              key={label}
              className="flex justify-between text-[1.1rem] text-zinc-400 border-b border-white/[0.05] py-4"
            >
              <span className="text-white font-normal">{label}</span>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── Disassembly Section ──────────────────────────────────────────────────────
export function DisassemblySection() {
  return (
    <section className="w-screen h-[200vh] flex justify-center items-start pt-[15vh] px-[10vw] pointer-events-none">
      <h2 className="text-[5rem] font-semibold tracking-[-0.04em] text-center uppercase opacity-80 bg-gradient-to-b from-white to-transparent bg-clip-text text-transparent">
        Modular Architecture
      </h2>
    </section>
  );
}

// ─── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({ title, description }) {
  return (
    <div className="w-[350px] bg-[rgba(20,20,25,0.3)] backdrop-blur-[40px] border border-white/[0.08] shadow-[0_30px_60px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] p-10 rounded-3xl my-6 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:bg-[rgba(30,30,35,0.4)] hover:border-white/[0.15]">
      <h3 className="text-[1.4rem] font-semibold text-white tracking-[-0.02em] mb-4">
        {title}
      </h3>
      <p className="text-base leading-relaxed text-zinc-400 font-light">
        {description}
      </p>
    </div>
  );
}

// ─── Functionality Section ────────────────────────────────────────────────────
export function FunctionalitySection() {
  const leftCards = [
    {
      title: "Autonomous Navigation",
      description: "Real-time pathfinding and dynamic obstacle avoidance using combined sensor fusion.",
    },
    {
      title: "Tactile Manipulation",
      description: "Precision-engineered fingertips capable of handling fragile objects or lifting up to 500kg.",
    },
  ];

  const rightCards = [
    {
      title: "Adaptive Learning",
      description: "Constantly updates operational parameters based on environmental interactions.",
    },
    {
      title: "Universal Protocol",
      description: "Interfaces seamlessly with external smart devices, IoT networks, and industrial machinery.",
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
