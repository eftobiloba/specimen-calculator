// components/Navbar.tsx

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="text-white text-2l font-semibold">
            <Link href="/">Specimen Calculator</Link>
          </div>

          {/* Links */}
          <div className="flex space-x-6">
            <Link href="https://github.com/eftobiloba" className="text-white hover:text-gray-300 transition duration-200">Github</Link>
            <Link href="/entries" className="text-white hover:text-gray-300 transition duration-200">Entries</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
