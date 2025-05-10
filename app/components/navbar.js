import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('spotifyAccessToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('spotifyAccessToken');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  return (
    <nav className="bg-white text-black w-full px-6 py-4 flex justify-between items-center shadow shadow-[0_0_15px_#78aedb] sticky top-0 z-10">
      <Link href="/">
        <Image src="/tklogo.png" alt="TuneKind Logo" width={125} height={10} className="rounded-sm" />
      </Link>
      <div className="space-x-4 hidden md:flex">
        <a href="/about" className="relative group overflow-hidden text-black">
          About
          <span className="absolute left-0 bottom-0 h-[2px] w-full bg-[#78aedb] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
        </a>
        <p>|</p>
        <a href="/contact" className="relative group overflow-hidden text-black">
          Contact
          <span className="absolute left-0 bottom-0 h-[2px] w-full bg-[#78aedb] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
        </a>
        {isAuthenticated ? (
          <>
            <p>|</p>
            <button onClick={handleLogout} className="relative group overflow-hidden text-black">
              Logout
              <span className="absolute left-0 bottom-0 h-[2px] w-full bg-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </button>
          </>
        ) : (
          <>
            <p>|</p>
            <a href="/login" className="relative group overflow-hidden text-black">
              Login
              <span className="absolute left-0 bottom-0 h-[2px] w-full bg-[#78aedb] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </a>
          </>
        )}
      </div>
    </nav>
  );
}