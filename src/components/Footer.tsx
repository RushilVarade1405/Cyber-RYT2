export default function Footer() {
  return (
    <footer className="border-t border-cyan-500/20 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()}{" "}
        <a
          href="https://github.com/RushilVarade1405"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 font-semibold hover:underline"
        >
          RYTNIX
        </a>{" "}
        &{" "}
        <a
          href="https://github.com/CRUSVEDER"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 font-semibold hover:underline"
        >
          CRUSVEDER
        </a>
        . All rights reserved.
      </div>
    </footer>
  );
}
