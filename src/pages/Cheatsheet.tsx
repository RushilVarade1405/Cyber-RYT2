import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  cheatsheetData, 
  Section, 
  Subsection, 
  Tool, 
  Command,
  Vulnerability,
  ManualExploit,
  ReverseShell,
  XSSType,
  CSRFExploit,
  DeserializationExample,
  OWASPVulnerability,
  Port
} from '../data/cheatsheetData';

export default function Cheatsheet() {
  const [activeSection, setActiveSection] = useState<number>(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-cyan-400"
    >
      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="sticky top-0 z-50 backdrop-blur-xl bg-black/90 border-b border-cyan-900/50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8">
            <div className="flex items-center justify-between mb-3 sm:mb-6">
              <div className="flex-1 min-w-0 mr-3">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-emerald-500 to-cyan-600 bg-clip-text text-transparent mb-1 sm:mb-2 truncate">
                  {cheatsheetData.title}
                </h1>
                <p className="text-cyan-700 text-xs sm:text-sm font-mono truncate">
                  # {cheatsheetData.description}
                </p>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="lg:hidden p-2 rounded-lg bg-cyan-900/30 text-cyan-400 border border-cyan-700 hover:bg-cyan-900/50 transition-colors"
                  aria-label="Toggle menu"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isSidebarOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                  <span className="text-xs text-cyan-600 font-mono">ONLINE</span>
                </div>
              </div>
            </div>

            {/* Mobile Active Section Indicator */}
            <div className="lg:hidden bg-cyan-900/20 border border-cyan-900/40 rounded-lg px-3 py-2">
              <p className="text-xs text-cyan-600 font-mono mb-1">ACTIVE SECTION</p>
              <p className="text-sm text-cyan-400 font-bold truncate">
                {String(activeSection + 1).padStart(2, '0')} / {cheatsheetData.sections[activeSection].title}
              </p>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {/* Sidebar Navigation - Desktop */}
            <motion.aside
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:block lg:col-span-1"
            >
              <div className="sticky top-32 space-y-4">
                <h3 className="text-sm font-bold text-cyan-500 uppercase tracking-wider mb-4 flex items-center">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2" />
                  Sections
                </h3>
                {cheatsheetData.sections.map((section: Section, index: number) => (
                  <button
                    key={index}
                    onClick={() => setActiveSection(index)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 font-mono text-sm ${
                      activeSection === index
                        ? 'bg-cyan-900/30 text-cyan-400 border border-cyan-700 shadow-lg shadow-cyan-900/50'
                        : 'text-cyan-700 hover:text-cyan-500 hover:bg-cyan-950/30 border border-transparent'
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

            {/* Mobile Sidebar Navigation */}
            <AnimatePresence>
              {isSidebarOpen && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsSidebarOpen(false)}
                    className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
                  />
                  
                  {/* Sidebar */}
                  <motion.aside
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="lg:hidden fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-black border-r border-cyan-900/50 z-50 overflow-y-auto"
                  >
                    <div className="p-4 sm:p-6 space-y-4">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-bold text-cyan-500 uppercase tracking-wider flex items-center">
                          <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2" />
                          Sections
                        </h3>
                        <button
                          onClick={() => setIsSidebarOpen(false)}
                          className="p-1.5 rounded-lg text-cyan-600 hover:text-cyan-400 hover:bg-cyan-900/30"
                          aria-label="Close menu"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      {cheatsheetData.sections.map((section: Section, index: number) => (
                        <button
                          key={index}
                          onClick={() => {
                            setActiveSection(index);
                            setIsSidebarOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 font-mono text-sm ${
                            activeSection === index
                              ? 'bg-cyan-900/30 text-cyan-400 border border-cyan-700 shadow-lg shadow-cyan-900/50'
                              : 'text-cyan-700 hover:text-cyan-500 hover:bg-cyan-950/30 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center">
                            <span className="mr-3 text-xs opacity-60">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className="flex-1">{section.title}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.aside>
                </>
              )}
            </AnimatePresence>

            {/* Content Area */}
            <motion.main
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-3 space-y-4 sm:space-y-6"
            >
              {/* Section Header */}
              <div className="bg-gradient-to-r from-cyan-950/50 to-transparent border border-cyan-900/30 rounded-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-400 mb-2">
                  {cheatsheetData.sections[activeSection].title}
                </h2>
                <p className="text-cyan-700 font-mono text-xs sm:text-sm">
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
                  className="bg-gray-900/50 border border-cyan-900/20 rounded-xl p-4 sm:p-6 backdrop-blur-sm"
                >
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-cyan-300 mb-2">
                    {subsection.subtitle}
                  </h3>
                  <p className="text-cyan-700 text-xs sm:text-sm mb-4 sm:mb-6 font-mono">
                    {subsection.description}
                  </p>

                  {/* Tools */}
                  {subsection.tools && (
                    <div className="space-y-3 sm:space-y-4">
                      {subsection.tools.map((tool: Tool, toolIdx: number) => (
                        <div
                          key={toolIdx}
                          className="bg-black/40 border border-cyan-800/30 rounded-lg p-3 sm:p-5"
                        >
                          <div className="mb-3 sm:mb-4">
                            <h4 className="text-base sm:text-lg md:text-xl font-bold text-cyan-400 mb-1 break-words">
                              $ {tool.name}
                            </h4>
                            <p className="text-cyan-700 text-xs sm:text-sm">{tool.description}</p>
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
                    <div className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
                      {subsection.vulnerabilities.map((vuln: Vulnerability, vulnIdx: number) => (
                        <div
                          key={vulnIdx}
                          className="bg-red-950/20 border border-red-900/30 rounded-lg p-3 sm:p-5"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4 gap-2">
                            <div className="flex-1 min-w-0">
                              <h4 className="text-base sm:text-lg md:text-xl font-bold text-red-400 mb-1 break-words">
                                ⚠ {vuln.name}
                              </h4>
                              <p className="text-red-700 text-xs sm:text-sm">{vuln.description}</p>
                            </div>
                            <span className={`px-2 sm:px-3 py-1 rounded text-xs font-bold ${getSeverityColor(vuln.severity)} border border-current self-start flex-shrink-0`}>
                              {vuln.severity}
                            </span>
                          </div>

                          {/* Manual Exploits */}
                          {vuln.manualExploits && vuln.manualExploits.length > 0 && (
                            <div className="mb-3 sm:mb-4">
                              <h5 className="text-xs sm:text-sm font-bold text-orange-400 mb-2">Manual Payloads:</h5>
                              <div className="space-y-2">
                                {vuln.manualExploits.map((exploit: ManualExploit, expIdx: number) => (
                                  <PayloadBlock key={expIdx} payload={exploit.payload} description={exploit.description} context={exploit.context} />
                                ))}
                              </div>
                            </div>
                          )}

                          {/* XSS Types */}
                          {vuln.types && vuln.types.length > 0 && (
                            <div className="mb-3 sm:mb-4">
                              {vuln.types.map((xssType: XSSType, typeIdx: number) => (
                                <div key={typeIdx} className="mb-4">
                                  <h5 className="text-xs sm:text-sm font-bold text-orange-400 mb-2">{xssType.type}:</h5>
                                  <div className="space-y-2">
                                    {xssType.payloads.map((payload, payIdx: number) => (
                                      <PayloadBlock 
                                        key={payIdx} 
                                        payload={payload.payload} 
                                        description={payload.description} 
                                        context={payload.context} 
                                      />
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Payloads */}
                          {vuln.payloads && vuln.payloads.length > 0 && (
                            <div className="mb-3 sm:mb-4">
                              <h5 className="text-xs sm:text-sm font-bold text-orange-400 mb-2">Payloads:</h5>
                              <div className="space-y-2">
                                {vuln.payloads.map((payload, payIdx: number) => (
                                  <PayloadBlock 
                                    key={payIdx} 
                                    payload={payload.payload} 
                                    description={payload.description} 
                                    context={payload.context} 
                                  />
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Reverse Shells */}
                          {vuln.reverseShells && vuln.reverseShells.length > 0 && (
                            <div className="mb-3 sm:mb-4">
                              <h5 className="text-xs sm:text-sm font-bold text-cyan-400 mb-2">Reverse Shells:</h5>
                              <div className="space-y-2">
                                {vuln.reverseShells.map((shell: ReverseShell, shellIdx: number) => (
                                  <div key={shellIdx} className="bg-gray-950 border border-cyan-900/50 rounded-lg p-3">
                                    <h6 className="text-sm font-bold text-cyan-300 mb-1">{shell.name}</h6>
                                    <code className="text-cyan-400 text-xs block mb-1 break-all font-mono leading-relaxed">
                                      {shell.command}
                                    </code>
                                    <p className="text-cyan-700 text-xs">→ {shell.description}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* CSRF Exploits */}
                          {vuln.exploits && vuln.exploits.length > 0 && (
                            <div className="mb-3 sm:mb-4">
                              <h5 className="text-xs sm:text-sm font-bold text-purple-400 mb-2">Exploit Code:</h5>
                              <div className="space-y-3">
                                {vuln.exploits.map((exploit: CSRFExploit, expIdx: number) => (
                                  <div key={expIdx} className="bg-gray-950 border border-purple-900/50 rounded-lg p-3">
                                    <h6 className="text-sm font-bold text-purple-300 mb-2">{exploit.name}</h6>
                                    <pre className="text-purple-400 text-xs overflow-x-auto mb-2 font-mono leading-relaxed bg-black/40 p-3 rounded">
                                      <code>{exploit.code}</code>
                                    </pre>
                                    <p className="text-purple-700 text-xs">→ {exploit.description}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Deserialization Examples */}
                          {vuln.examples && vuln.examples.length > 0 && (
                            <div className="mb-3 sm:mb-4">
                              <h5 className="text-xs sm:text-sm font-bold text-yellow-400 mb-2">Examples:</h5>
                              <div className="space-y-2">
                                {vuln.examples.map((example: DeserializationExample, exIdx: number) => (
                                  <div key={exIdx} className="bg-gray-950 border border-yellow-900/50 rounded-lg p-3">
                                    <h6 className="text-sm font-bold text-yellow-300 mb-1">{example.language}</h6>
                                    <code className="text-yellow-400 text-xs block mb-1 break-all font-mono leading-relaxed">
                                      {example.payload}
                                    </code>
                                    <p className="text-yellow-700 text-xs">→ {example.description}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Vulnerability Notes */}
                          {vuln.notes && (
                            <p className="text-yellow-600 text-xs mt-3">⚠ {vuln.notes}</p>
                          )}

                          {/* Vulnerability Tools */}
                          {vuln.tools && vuln.tools.map((tool: Tool, toolIdx: number) => (
                            <div key={toolIdx} className="mt-3 sm:mt-4">
                              <h5 className="text-xs sm:text-sm font-bold text-cyan-400 mb-2">
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
                <div className="space-y-3 sm:space-y-4">
                  {cheatsheetData.sections[activeSection].vulnerabilities?.map((vuln: OWASPVulnerability, vulnIdx: number) => (
                    <motion.div
                      key={vulnIdx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: vulnIdx * 0.1 }}
                      className="bg-yellow-950/20 border border-yellow-900/30 rounded-xl p-4 sm:p-6"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4 gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-400 mb-1 break-words">
                            #{vuln.rank} {vuln.name}
                          </h3>
                          <p className="text-yellow-700 text-xs sm:text-sm">{vuln.description}</p>
                        </div>
                        <span className={`px-2 sm:px-3 py-1 rounded text-xs font-bold ${getSeverityColor(vuln.severity)} border border-current self-start flex-shrink-0`}>
                          {vuln.severity}
                        </span>
                      </div>

                      {vuln.examples && vuln.examples.length > 0 && (
                        <div className="mb-3">
                          <h4 className="text-xs sm:text-sm font-bold text-yellow-500 mb-2">Examples:</h4>
                          <ul className="list-disc list-inside space-y-1 text-yellow-700 text-xs sm:text-sm">
                            {vuln.examples.map((ex: string, exIdx: number) => (
                              <li key={exIdx} className="break-words">{ex}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {vuln.types && vuln.types.length > 0 && (
                        <div className="mb-3">
                          <h4 className="text-xs sm:text-sm font-bold text-yellow-500 mb-2">Types:</h4>
                          <ul className="list-disc list-inside space-y-1 text-yellow-700 text-xs sm:text-sm">
                            {vuln.types.map((type: string, typeIdx: number) => (
                              <li key={typeIdx} className="break-words">{type}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {vuln.testMethods && vuln.testMethods.length > 0 && (
                        <div className="mb-3">
                          <h4 className="text-xs sm:text-sm font-bold text-yellow-500 mb-2">Test Methods:</h4>
                          <ul className="list-disc list-inside space-y-1 text-yellow-700 text-xs sm:text-sm">
                            {vuln.testMethods.map((method: string, methodIdx: number) => (
                              <li key={methodIdx} className="break-words">{method}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {vuln.payloads && vuln.payloads.length > 0 && (
                        <div className="mb-3">
                          <h4 className="text-xs sm:text-sm font-bold text-yellow-500 mb-2">Payloads:</h4>
                          <div className="space-y-2">
                            {vuln.payloads.map((payload, payIdx: number) => (
                              <PayloadBlock 
                                key={payIdx} 
                                payload={payload.payload} 
                                description={payload.description} 
                                context={payload.context} 
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {vuln.tools && vuln.tools.length > 0 && (
                        <div className="mb-3">
                          <h4 className="text-xs sm:text-sm font-bold text-yellow-500 mb-2">Tools:</h4>
                          <div className="flex flex-wrap gap-2">
                            {vuln.tools.map((tool: string, toolIdx: number) => (
                              <span key={toolIdx} className="px-2 py-1 bg-yellow-900/30 text-yellow-600 text-xs rounded font-mono">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {vuln.covered && (
                        <p className="text-yellow-600 text-xs italic mt-3">
                          📍 {vuln.covered}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Ports */}
              {cheatsheetData.sections[activeSection].ports && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {cheatsheetData.sections[activeSection].ports?.map((port: Port, portIdx: number) => (
                    <motion.div
                      key={portIdx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: portIdx * 0.05 }}
                      className="bg-cyan-950/20 border border-cyan-900/30 rounded-lg p-3 sm:p-4"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-base sm:text-lg font-bold text-cyan-400">Port {port.port}</h4>
                        <span className="text-xs px-2 py-1 bg-cyan-900/30 text-cyan-600 rounded flex-shrink-0 ml-2">
                          {port.service}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-cyan-700 mb-1">Vulnerabilities:</p>
                        <ul className="space-y-1">
                          {port.vulnerabilities.map((vuln: string, vulnIdx: number) => (
                            <li key={vulnIdx} className="text-xs text-red-600 break-words">• {vuln}</li>
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
        <footer className="border-t border-cyan-900/30 bg-black/70 backdrop-blur-xl py-6 sm:py-8 mt-8 sm:mt-12 md:mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-red-500 font-bold text-sm sm:text-base mb-2">⚠ FOR AUTHORIZED SECURITY TESTING ONLY ⚠</p>
            <p className="text-cyan-700 text-xs sm:text-sm font-mono">
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
      className="group bg-gray-950 border border-cyan-900/50 rounded-lg p-3 sm:p-4 hover:border-cyan-600 transition-all cursor-pointer active:scale-[0.98]"
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
        <div className="flex-1 min-w-0">
          <code className="text-cyan-400 text-xs sm:text-sm block mb-2 break-all font-mono leading-relaxed">
            {command.command}
          </code>
          <p className="text-cyan-700 text-xs leading-relaxed">→ {command.description}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 self-start">
          <span className="text-xs px-2 py-1 bg-cyan-900/30 text-cyan-600 rounded font-mono">
            {command.category}
          </span>
          <button className="text-cyan-600 hover:text-cyan-400 transition-colors text-lg">
            {copied ? '✓' : '⧉'}
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
      className="bg-gray-950 border border-orange-900/50 rounded-lg p-3 hover:border-orange-600 transition-all cursor-pointer active:scale-[0.98]"
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
        <div className="flex-1 min-w-0">
          <code className="text-orange-400 text-xs sm:text-sm block mb-1 break-all font-mono leading-relaxed">
            {payload}
          </code>
          <p className="text-orange-700 text-xs leading-relaxed">
            → {description} <span className="text-orange-900">({context})</span>
          </p>
        </div>
        <button className="text-orange-600 hover:text-orange-400 transition-colors flex-shrink-0 self-start text-lg">
          {copied ? '✓' : '⧉'}
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