import { Link } from "react-router-dom";

export default function Sherlock() {
  return (
<div className="px-10 py-16 max-w-7xl mx-auto text-white">

      {/* ===============================
          BACK TO TOOLS LINK
      =============================== */}
      <Link
        to="/tools"
        className="inline-block mb-6 text-cyan-400 hover:underline"
      >
        ← Back to Tools
      </Link>

      {/* ===============================
          TITLE
      =============================== */}
      <h1 className="text-5xl font-bold mb-6 text-cyan-400">
        Sherlock (Username OSINT Tool)
      </h1>

      {/* ===============================
    BADGES & ICONS
=============================== */}
<div className="flex flex-wrap gap-3 mb-10">

  <span className="px-3 py-1 text-sm rounded-full 
    bg-green-600/20 text-green-400 border border-green-500/30">
    Beginner Friendly
  </span>

  <span className="px-3 py-1 text-sm rounded-full 
    bg-yellow-600/20 text-yellow-400 border border-yellow-500/30">
    Intermediate
  </span>

  <span className="px-3 py-1 text-sm rounded-full 
    bg-red-600/20 text-red-400 border border-red-500/30">
    Advanced
  </span>

  <span className="px-3 py-1 text-sm rounded-full 
    bg-purple-600/20 text-purple-400 border border-purple-500/30">
    Password Cracking
  </span>

  <span className="px-3 py-1 text-sm rounded-full 
    bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
    Hash Analysis
  </span>

  <span className="px-3 py-1 text-sm rounded-full 
    bg-orange-600/20 text-orange-400 border border-orange-500/30">
    Ethical Hacking
  </span>

</div>

      {/* ===============================
    WHAT IS SHERLOCK
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    What is Sherlock?
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    <strong>Sherlock</strong> is an open-source <strong>OSINT (Open Source Intelligence)</strong> tool
    designed to identify and locate <strong>usernames across a large number of social media platforms,
    forums, and public websites</strong>. Instead of manually checking each website one by one,
    Sherlock automates the process and performs it efficiently within seconds.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    The primary goal of Sherlock is to help security researchers, ethical hackers, investigators,
    and students understand a person’s <strong>online presence and digital footprint</strong>.
    Many users reuse the same username on different platforms, and Sherlock helps uncover
    where that username appears publicly on the internet.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    Sherlock works by sending requests to supported websites and analyzing their responses
    to determine whether a username exists or not. It clearly displays results as
    <strong>Found</strong> or <strong>Not Found</strong>, along with direct profile links when available.
    This makes analysis fast, simple, and beginner-friendly.
  </p>

  <p className="text-gray-300 leading-relaxed">
    It is important to note that Sherlock <strong>does not hack accounts, bypass authentication,
    or access private data</strong>. It only searches for information that is already
    publicly accessible on the web. When used ethically and legally, Sherlock is a powerful
    reconnaissance tool for learning OSINT techniques and understanding how publicly exposed
    online identities can be.
  </p>
</section>

      {/* ===============================
    WHAT SHERLOCK DOES
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    What Does Sherlock Do?
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    Sherlock performs <strong>username reconnaissance</strong> by automatically checking whether
    a specific username exists on <strong>hundreds of social media platforms, forums, and public websites</strong>.
    Instead of manually visiting each site, Sherlock does this work in an automated and systematic way.
  </p>

  <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-3 mb-4">
    <li>
      <strong>Searches usernames across multiple websites:</strong>  
      Sherlock tests a given username against many popular platforms such as social networks,
      developer communities, discussion forums, and content-sharing sites.
    </li>

    <li>
      <strong>Detects reused usernames:</strong>  
      Many people reuse the same username on different platforms. Sherlock helps identify
      these reused identities, which is useful for OSINT and digital footprint analysis.
    </li>

    <li>
      <strong>Analyzes digital footprints:</strong>  
      By showing where a username appears online, Sherlock helps investigators understand
      how visible a user is on the internet and what information may be publicly exposed.
    </li>

    <li>
      <strong>Supports cybersecurity investigations:</strong>  
      Security professionals use Sherlock during the reconnaissance phase to gather
      preliminary information before deeper technical analysis.
    </li>

    <li>
      <strong>Assists ethical hackers and researchers:</strong>  
      Ethical hackers, students, and researchers use Sherlock to learn OSINT techniques,
      perform case studies, and understand real-world reconnaissance workflows.
    </li>
  </ul>

  <p className="text-gray-300 leading-relaxed">
    Overall, Sherlock helps convert a simple username into valuable intelligence by
    organizing publicly available information in a clear, structured, and easy-to-read format.
  </p>
</section>

      {/* ===============================
    USING SHERLOCK IN LINUX
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Using Sherlock in Linux
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    Sherlock is designed to run on <strong>Linux-based operating systems</strong> and is
    commonly used on platforms such as <strong>Kali Linux</strong>, <strong>Ubuntu</strong>,
    and <strong>Parrot OS</strong>. Since these operating systems are widely used in
    cybersecurity and ethical hacking, Sherlock fits naturally into Linux-based
    reconnaissance workflows.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    The tool is written in <strong>Python</strong> and requires <strong>Python 3</strong> to function
    correctly. Linux systems usually come with Python pre-installed, which makes
    setting up Sherlock straightforward for beginners. Additional Python libraries
    are used by Sherlock to send web requests and analyze responses from websites.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    To use Sherlock in Linux, the user needs to <strong>clone the official GitHub repository</strong>
    and install the required dependencies listed in the project. Once installed,
    Sherlock can be executed directly from the terminal by providing a username
    as input.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    Sherlock is a <strong>command-line tool</strong>, meaning all interactions are done
    through the terminal. This makes it lightweight, fast, and suitable for both
    beginners and advanced users. The output clearly shows which websites contain
    the searched username and which do not, along with direct profile links when available.
  </p>

  <p className="text-gray-300 leading-relaxed">
    Because Linux offers better control over networking, scripting, and automation,
    Sherlock is often combined with other OSINT tools during investigations.
    When used ethically, it becomes a powerful part of the reconnaissance phase
    in cybersecurity analysis.
  </p>
</section>

      {/* ===============================
    INSTALLATION STEPS
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Installation Steps
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    Follow the steps below to install Sherlock on a Linux system. These steps are
    suitable for beginners and work on most Linux distributions such as Kali Linux,
    Ubuntu, and Parrot OS.
  </p>

  <div className="bg-gray-900 rounded-lg p-5 space-y-3 text-sm text-gray-200 font-mono">
    <p>
      <span className="text-cyan-400">Step 1:</span> Clone the official Sherlock repository
    </p>
    <p>git clone https://github.com/sherlock-project/sherlock.git</p>

    <p>
      <span className="text-cyan-400">Step 2:</span> Move into the Sherlock directory
    </p>
    <p>cd sherlock</p>

    <p>
      <span className="text-cyan-400">Step 3:</span> Install required Python dependencies
    </p>
    <p>pip install -r requirements.txt</p>
  </div>

  <p className="text-gray-300 leading-relaxed mt-4">
    After completing these steps, Sherlock will be successfully installed on your system
    and ready to use. You can verify the installation by running the help command to
    display available options.
  </p>
</section>

      {/* ===============================
    SHERLOCK COMMANDS
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Sherlock Commands
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    Below are some commonly used Sherlock commands. These commands help perform
    username reconnaissance in different ways, similar to how Nmap uses flags
    to control scan behavior.
  </p>

  <div className="overflow-x-auto">
    <table className="w-full border border-gray-700 text-sm">
      <thead className="bg-gray-800 text-cyan-300">
        <tr>
          <th className="px-4 py-3 border border-gray-700 w-1/2">
            Command
          </th>
          <th className="px-4 py-3 border border-gray-700 w-1/2">
            Explanation (Beginner Friendly)
          </th>
        </tr>
      </thead>

      <tbody className="text-gray-300 leading-relaxed">
        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            python3 sherlock.py username
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Searches the given username across all supported websites and
            displays whether the username exists or not.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            python3 sherlock.py user1 user2
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Searches multiple usernames at the same time, useful for
            comparing different online identities.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            python3 sherlock.py username --print-found
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Displays only the websites where the username was found,
            hiding all “not found” results for cleaner output.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            python3 sherlock.py username --csv
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Saves the scan results in CSV format, which can be opened
            in spreadsheet applications for further analysis.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            python3 sherlock.py username --json
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Saves the output in JSON format, useful for automation
            or integration with other tools.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            python3 sherlock.py --help
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Displays all available commands, options, and flags
            supported by Sherlock.
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <p className="text-gray-300 leading-relaxed mt-4">
    Understanding these commands allows users to control how Sherlock searches,
    filters, and stores results, making investigations more efficient and organized.
  </p>
</section>

     {/* ===============================
    STEP BY STEP USING SHERLOCK
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Step-by-Step Using Sherlock
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    The following step-by-step guide explains how to use Sherlock from start to finish.
    This workflow is suitable for beginners and reflects a real-world OSINT
    reconnaissance process.
  </p>

  <ol className="list-decimal list-inside text-gray-300 leading-relaxed space-y-4">
    <li>
      <strong>Open the Linux terminal:</strong>  
      Start by opening the terminal in your Linux system such as Kali Linux,
      Ubuntu, or Parrot OS. All Sherlock commands are executed through the terminal.
    </li>

    <li>
      <strong>Navigate to the Sherlock directory:</strong>  
      Use the <code className="text-cyan-400">cd</code> command to move into the folder
      where Sherlock was installed.
      <br />
      <span className="font-mono text-sm text-gray-400">
        cd sherlock
      </span>
    </li>

    <li>
      <strong>Run Sherlock with a username:</strong>  
      Execute Sherlock by providing the username you want to investigate.
      Sherlock will begin checking multiple websites automatically.
      <br />
      <span className="font-mono text-sm text-gray-400">
        python3 sherlock.py username
      </span>
    </li>

    <li>
      <strong>Analyze the results:</strong>  
      Sherlock will display results indicating whether the username was
      <strong> found</strong> or <strong> not found</strong> on each website.
      If found, a direct link to the profile will be shown.
    </li>

    <li>
      <strong>Filter or save the output (optional):</strong>  
      To make analysis easier, you can filter only found results or
      save the output in CSV or JSON format for documentation or reporting.
    </li>
  </ol>

  <p className="text-gray-300 leading-relaxed mt-4">
    By following these steps, users can systematically gather publicly available
    username information and understand how Sherlock fits into an OSINT
    reconnaissance workflow.
  </p>
</section>

      {/* ===============================
    IMPORTANT NOTE
=============================== */}
<section className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
  <h2 className="text-xl font-semibold mb-3 text-red-400">
    ⚠ Legal & Ethical Warning
  </h2>

  <p className="text-gray-300 leading-relaxed">
    Sherlock should be used <strong>only for lawful OSINT and
    reconnaissance purposes</strong>. Using Sherlock to harass,
    stalk, or invade the privacy of individuals without consent
    is unethical and may be illegal under cyber and privacy laws.
  </p>
</section>

    </div>
  );
}
