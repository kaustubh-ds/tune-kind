'use client';

import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-[#78aedb] selection:text-black flex flex-col">
      <Head>
        <title>404 | Page Not Found | TuneKind</title>
        <link rel="icon" href="/tkicon.png" />
      </Head>

      {/* Navbar */}
      <nav className="bg-white text-black w-full px-6 py-4 flex justify-between items-center shadow-[0_0_15px_#78aedb] sticky top-0 z-10">
        <div className="flex items-center">
          <Link href="/">
            <Image src="/tklogo.png" alt="TuneKind Logo" width={125} height={10} className="rounded-sm" />
          </Link>
        </div>
      </nav>

      {/* 404 Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-4 text-[#78aedb]">404</h1>
        <p className="text-xl mb-6 font-medium">Oops — this page doesn’t exist on TuneKind.</p>
        <p className="text-gray-600 mb-10 max-w-md">The song might be lost in the noise, or you took a wrong turn. Let's get you back on track.</p>
        <Link href="/">
          <button className="bg-[#78aedb] text-white px-6 py-2 rounded-md hover:bg-[#5b97c9] transition">
            Go Back Home
          </button>
        </Link>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white w-full py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} TuneKind. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="/error" className="hover:text-[#78aedb] transition">Privacy Policy</a>
            <a href="/error" className="hover:text-[#78aedb] transition">Terms of Service</a>
            <a href="/error" className="hover:text-[#78aedb] transition">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}