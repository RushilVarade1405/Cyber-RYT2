import { Link } from "react-router-dom";

export default function Ethics() {
  return (
    <div className="px-10 py-16 max-w-5xl mx-auto text-white">

      <Link to="/cyber-laws" className="text-cyan-400 hover:underline">
        ← Back to Cyber Laws
      </Link>

      <h1 className="text-5xl font-bold mt-4 mb-6 text-cyan-400">
        Cyber Ethics
      </h1>

      <p className="text-gray-300 leading-relaxed mb-8">
        Cyber ethics refers to the moral guidelines that govern responsible and
        safe behavior while using digital technologies and the internet.
      </p>

      <h2 className="text-2xl font-semibold text-cyan-300 mb-4">
        Principles of Cyber Ethics
      </h2>

      <ul className="list-disc list-inside text-gray-300 space-y-3">
        <li>Respect privacy of others</li>
        <li>No unauthorized access</li>
        <li>Use technology responsibly</li>
        <li>Avoid spreading harmful content</li>
        <li>Follow laws and regulations</li>
      </ul>
    </div>
  );
}
