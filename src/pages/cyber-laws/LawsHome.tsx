import { Link } from "react-router-dom";

export default function LawsHome() {
  return (
<div className="px-10 py-16 max-w-7xl mx-auto text-white">


      <h1 className="text-5xl font-bold mb-6 text-cyan-400">
        Cyber Laws
      </h1>

      <p className="text-gray-300 max-w-3xl mb-12 leading-relaxed">
        Cyber Laws are legal frameworks designed to regulate digital activities,
        protect users, prevent cyber crimes, and ensure safe use of computers,
        networks, and the internet.
      </p>

      <div className="grid md:grid-cols-2 gap-6">

        <Link to="/cyber-laws/cyber-crimes"
          className="p-6 rounded-xl bg-black/40 border border-gray-700 hover:border-cyan-400 transition">
          <h2 className="text-xl font-semibold text-cyan-300 mb-2">
            Cyber Crimes
          </h2>
          <p className="text-gray-400">
            Types of cyber crimes, real-world examples, and legal consequences.
          </p>
        </Link>

        <Link to="/cyber-laws/it-act"
          className="p-6 rounded-xl bg-black/40 border border-gray-700 hover:border-cyan-400 transition">
          <h2 className="text-xl font-semibold text-cyan-300 mb-2">
            IT Act, 2000
          </h2>
          <p className="text-gray-400">
            Overview of India’s Information Technology Act and key sections.
          </p>
        </Link>

        <Link to="/cyber-laws/ethics"
          className="p-6 rounded-xl bg-black/40 border border-gray-700 hover:border-cyan-400 transition">
          <h2 className="text-xl font-semibold text-cyan-300 mb-2">
            Cyber Ethics
          </h2>
          <p className="text-gray-400">
            Moral principles and responsible behavior in cyberspace.
          </p>
        </Link>

      </div>
    </div>
  );
}
