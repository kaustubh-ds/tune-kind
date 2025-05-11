import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../authcontext';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth(); // Use the authContext

  return (
    <nav className="bg-white text-black w-full px-6 py-3 flex justify-between items-center shadow shadow-[0_0_15px_#78aedb] sticky top-0 z-10">
      <Link href="/" className="flex items-center space-x-1">
        <Image src="/tkicon.png" alt="TuneKind Icon" width={30} height={45} className="" />
        <Image src="/tklogo.png" alt="TuneKind Logo" width={100} height={45} className="rounded-sm" />
      </Link>
      <div className="space-x-4 hidden md:flex items-center">
        <a href="/" className="relative group overflow-hidden text-black">
          Home
          <span className="absolute left-0 bottom-0 h-[2px] w-full bg-[#78aedb] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-150 origin-center"></span>
        </a>
        <p>|</p>
        <a href="/about" className="relative group overflow-hidden text-black">
          About
          <span className="absolute left-0 bottom-0 h-[2px] w-full bg-[#78aedb] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-150 origin-center"></span>
        </a>
        <p>|</p>
        <a href="/contact" className="relative group overflow-hidden text-black">
          Contact
          <span className="absolute left-0 bottom-0 h-[2px] w-full bg-[#78aedb] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-150 origin-center"></span>
        </a>
        {isAuthenticated ? (
          <>
            <button 
              onClick={logout} className="relative group border-1 border-[#ff0000] text-red px-4 py-1 rounded-full overflow-hidden transition-all duration-300"
            >
              <span className="absolute inset-0 bg-[#ff0000] scale-x-0 group-hover:scale-x-100 transform origin-center transition-transform duration-300"></span>
              <span className="relative group-hover:text-white transition-colors duration-300">
              Logout
              </span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => (window.location.href = '/login')} className="relative group border-1 border-[#78aedb] text-[#78aedb] px-4 py-1 rounded-full overflow-hidden transition-all duration-300"
            >
              <span className="absolute inset-0 bg-[#78aedb] scale-x-0 group-hover:scale-x-100 transform origin-center transition-transform duration-300"></span>
              <span className="relative group-hover:text-white transition-colors duration-300">
                Login
              </span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
}