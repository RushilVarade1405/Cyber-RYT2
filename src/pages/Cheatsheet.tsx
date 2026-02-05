import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cheatsheetData, Section, Subsection, Tool, Command } from '../data/cheatsheetData';
;

export default function Cheatsheet() {
  const [activeSection, setActiveSection] = useState<number>(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-green-400"
    >
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-green-900/50"
        >
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent mb-2">
                  {cheatsheetData.title}
                </h1>
                <p className="text-green-700 text-sm font-mono">
                  # {cheatsheetData.description}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-green-600 font-mono">ONLINE</span>
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <motion.aside
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-32 space-y-4">
                <h3 className="text-sm font-bold text-green-500 uppercase tracking-wider mb-4 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  Sections
                </h3>
                {cheatsheetData.sections.map((section: Section, index: number) => (
                  <button
                    key={index}
                    onClick={() => setActiveSection(index)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 font-mono text-sm ${
                      activeSection === index
                        ? 'bg-green-900/30 text-green-400 border border-green-700 shadow-lg shadow-green-900/50'
                        : 'text-green-700 hover:text-green-500 hover:bg-green-950/30 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-3 text-xs opacity-60">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1 line-clamp-2">{section.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.aside>

            {/* Content Area */}
            <motion.main
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-3 space-y-6"
            >
              {/* Section Header */}
              <div className="bg-gradient-to-r from-green-950/50 to-transparent border border-green-900/30 rounded-xl p-6">
                <h2 className="text-3xl font-bold text-green-400 mb-2">
                  {cheatsheetData.sections[activeSection].title}
                </h2>
                <p className="text-green-700 font-mono text-sm">
                  {cheatsheetData.sections[activeSection].description}
                </p>
              </div>

              {/* Subsections */}
              {cheatsheetData.sections[activeSection].subsections?.map((subsection: Subsection, subIdx: number) => (
                <motion.div
                  key={subIdx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: subIdx * 0.1 }}
                  className="bg-gray-900/50 border border-green-900/20 rounded-xl p-6 backdrop-blur-sm"
                >
                  <h3 className="text-2xl font-bold text-green-300 mb-2">
                    {subsection.subtitle}
                  </h3>
                  <p className="text-green-700 text-sm mb-6 font-mono">
                    {subsection.description}
                  </p>

                  {/* Tools */}
                  {subsection.tools && (
                    <div className="space-y-4">
                      {subsection.tools.map((tool: Tool, toolIdx: number) => (
                        <div
                          key={toolIdx}
                          className="bg-black/40 border border-green-800/30 rounded-lg p-5"
                        >
                          <div className="mb-4">
                            <h4 className="text-xl font-bold text-green-400 mb-1">
                              $ {tool.name}
                            </h4>
                            <p className="text-green-700 text-sm">{tool.description}</p>
                            {tool.notes && (
                              <p className="text-yellow-600 text-xs mt-2">⚠ {tool.notes}</p>
                            )}
                          </div>

                          {/* Commands */}
                          <div className="space-y-2">
                            {tool.commands.map((cmd: Command, cmdIdx: number) => (
                              <CommandBlock key={cmdIdx} command={cmd} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Vulnerabilities */}
                  {subsection.vulnerabilities && (
                    <div className="space-y-4 mt-4">
                      {subsection.vulnerabilities.map((vuln: any, vulnIdx: number) => (
                        <div
                          key={vulnIdx}
                          className="bg-red-950/20 border border-red-900/30 rounded-lg p-5"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-xl font-bold text-red-400 mb-1">
                                ⚠ {vuln.name}
                              </h4>
                              <p className="text-red-700 text-sm">{vuln.description}</p>
                            </div>
                            <span className={`px-3 py-1 rounded text-xs font-bold ${getSeverityColor(vuln.severity)} border border-current`}>
                              {vuln.severity}
                            </span>
                          </div>

                          {/* Manual Exploits */}
                          {vuln.manualExploits && vuln.manualExploits.length > 0 && (
                            <div className="mb-4">
                              <h5 className="text-sm font-bold text-orange-400 mb-2">Manual Payloads:</h5>
                              <div className="space-y-2">
                                {vuln.manualExploits.map((exploit: any, expIdx: number) => (
                                  <PayloadBlock key={expIdx} payload={exploit.payload} description={exploit.description} context={exploit.context} />
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Vulnerability Tools */}
                          {vuln.tools && vuln.tools.map((tool: Tool, toolIdx: number) => (
                            <div key={toolIdx} className="mt-4">
                              <h5 className="text-sm font-bold text-green-400 mb-2">
                                Tool: {tool.name}
                              </h5>
                              <div className="space-y-2">
                                {tool.commands.map((cmd: Command, cmdIdx: number) => (
                                  <CommandBlock key={cmdIdx} command={cmd} />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* OWASP Vulnerabilities */}
              {cheatsheetData.sections[activeSection].vulnerabilities && (
                <div className="space-y-4">
                  {cheatsheetData.sections[activeSection].vulnerabilities?.map((vuln: any, vulnIdx: number) => (
                    <motion.div
                      key={vulnIdx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: vulnIdx * 0.1 }}
                      className="bg-yellow-950/20 border border-yellow-900/30 rounded-xl p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-yellow-400 mb-1">
                            #{vuln.rank} {vuln.name}
                          </h3>
                          <p className="text-yellow-700 text-sm">{vuln.description}</p>
                        </div>
                        <span className={`px-3 py-1 rounded text-xs font-bold ${getSeverityColor(vuln.severity)} border border-current`}>
                          {vuln.severity}
                        </span>
                      </div>

                      {vuln.examples && vuln.examples.length > 0 && (
                        <div className="mb-3">
                          <h4 className="text-sm font-bold text-yellow-500 mb-2">Examples:</h4>
                          <ul className="list-disc list-inside space-y-1 text-yellow-700 text-sm">
                            {vuln.examples.map((ex: string, exIdx: number) => (
                              <li key={exIdx}>{ex}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Ports */}
              {cheatsheetData.sections[activeSection].ports && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cheatsheetData.sections[activeSection].ports?.map((port: any, portIdx: number) => (
                    <motion.div
                      key={portIdx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: portIdx * 0.05 }}
                      className="bg-cyan-950/20 border border-cyan-900/30 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-lg font-bold text-cyan-400">Port {port.port}</h4>
                        <span className="text-xs px-2 py-1 bg-cyan-900/30 text-cyan-600 rounded">
                          {port.service}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-cyan-700 mb-1">Vulnerabilities:</p>
                        <ul className="space-y-1">
                          {port.vulnerabilities.map((vuln: string, vulnIdx: number) => (
                            <li key={vulnIdx} className="text-xs text-red-600">• {vuln}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.main>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-green-900/30 bg-black/50 backdrop-blur-xl py-8 mt-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-red-500 font-bold mb-2">⚠ FOR AUTHORIZED SECURITY TESTING ONLY ⚠</p>
            <p className="text-green-700 text-sm font-mono">
              Always obtain proper authorization before testing systems
            </p>
          </div>
        </footer>
      </div>
    </motion.div>
  );
}

// Helper Components
function CommandBlock({ command }: { command: Command }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={copyToClipboard}
      className="group bg-gray-950 border border-green-900/50 rounded-lg p-4 hover:border-green-600 transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <code className="text-green-400 text-sm block mb-2 break-all font-mono">
            {command.command}
          </code>
          <p className="text-green-700 text-xs">→ {command.description}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs px-2 py-1 bg-green-900/30 text-green-600 rounded font-mono">
            {command.category}
          </span>
          <button className="text-green-600 hover:text-green-400 transition-colors">
            {copied ? '✓' : '⎘'}
          </button>
        </div>
      </div>
    </div>
  );
}

function PayloadBlock({ payload, description, context }: { payload: string; description: string; context: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={copyToClipboard}
      className="bg-gray-950 border border-orange-900/50 rounded-lg p-3 hover:border-orange-600 transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <code className="text-orange-400 text-sm block mb-1 break-all font-mono">
            {payload}
          </code>
          <p className="text-orange-700 text-xs">
            → {description} <span className="text-orange-900">({context})</span>
          </p>
        </div>
        <button className="text-orange-600 hover:text-orange-400 transition-colors flex-shrink-0">
          {copied ? '✓' : '⎘'}
        </button>
      </div>
    </div>
  );
}

function getSeverityColor(severity: string): string {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'text-red-500 bg-red-950/30';
    case 'high':
      return 'text-orange-500 bg-orange-950/30';
    case 'medium':
      return 'text-yellow-500 bg-yellow-950/30';
    default:
      return 'text-blue-500 bg-blue-950/30';
  }
}