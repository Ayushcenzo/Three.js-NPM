export function Overlay() {
  return (
    <div className="scroll-content">
      {/* Section 1 */}
      <section className="h-screen w-full flex items-center justify-end px-[10vw] pointer-all">
        <div className="max-w-xl text-right">
          <h1 className="text-7xl font-black tracking-tighter bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            Nexus Protocol
          </h1>
          <p className="mt-4 text-lg text-zinc-400 font-light">Autonomous Intelligence. Flagship Model.</p>
        </div>
      </section>

      {/* Section 2 */}
      <section className="h-screen w-full flex items-center justify-start px-[10vw] pointer-all">
        <div className="bg-zinc-900/40 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl">
          <h2 className="text-2xl font-bold mb-6">Core Specs</h2>
          <div className="space-y-4 text-zinc-400">
            <div className="flex justify-between w-64 border-b border-white/5 pb-2">
              <span>Weight</span> <span className="text-white">125kg</span>
            </div>
            <div className="flex justify-between w-64">
              <span>Power</span> <span className="text-white">Fusion Cell</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Spacer for disassembly */}
      <div className="h-screen" />
    </div>
  );
}