export default function Start() {
  return (
    <div className="px-10 py-16 max-w-6xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-6">
        Get Started with <span className="text-cyan-400">Cyber World</span>
      </h1>

      <p className="text-gray-300 max-w-3xl mb-10">
        This page gives you a clear starting path if you are new to
        cybersecurity. Follow the steps below in order to build strong
        fundamentals.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="p-6 rounded-xl bg-[#0b1224] border border-cyan-500/20">
          <h3 className="text-cyan-400 font-semibold mb-2">Step 1</h3>
          <p className="text-gray-300">
            Learn Linux basics: commands, file system, permissions.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[#0b1224] border border-cyan-500/20">
          <h3 className="text-cyan-400 font-semibold mb-2">Step 2</h3>
          <p className="text-gray-300">
            Understand cybersecurity tools and attack fundamentals.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[#0b1224] border border-cyan-500/20">
          <h3 className="text-cyan-400 font-semibold mb-2">Step 3</h3>
          <p className="text-gray-300">
            Move to cryptography, blockchain, and practice platforms.
          </p>
        </div>
      </div>
    </div>
  );
}
