'use client';

import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../components/navbar';
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-[url('../public/swbg.png')] bg-white text-black selection:bg-[#78aedb] selection:text-black">
      <Head>
        <title>About | TuneKind</title>
        <link rel="icon" href="/tkicon.png" />
      </Head>

      {/* Navbar */}
      <Navbar />

      {/* About Content */}
      <main className="flex flex-col items-center justify-center text-center px-6 py-32">
        <h1 className="text-4xl md:text-5xl font-bold">
          <span className="text-[#78aedb]">About</span> TuneKind
        </h1>
        <p className="text-lg text-gray-600 mt-6 max-w-3xl">
        TuneKind is a unique audio profiling tool that helps you choose the best earphones or headphones — based on what you  
        <span className='text-[#78aedb]'><b> actually listen</b></span> to.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl text-left">
          <div className="bg-white p-6 shadow-[0_0_5px_#78aedb] rounded-lg">
            <h2 className="text-2xl font-semibold text-[#78aedb] mb-4">Our Mission</h2>
            <p className="text-gray-700">
            Your music tastes reflect your listening habits, whether it's bass-heavy tracks, soft acoustic tunes, energetic workout playlists, or chill ambient sessions. By analyzing your public Spotify playlist, TuneKind recommends the ideal type of audio gear and features — like sound signature, driver type, noise cancellation, or comfort level — that suit your personal sound experience.
            </p>
          </div>
          <div className="bg-white p-6 shadow-[0_0_5px_#78aedb] rounded-lg">
            <h2 className="text-2xl font-semibold text-[#78aedb] mb-4">How It Works</h2>
            <p className="text-gray-700">
            Just paste a public Spotify playlist link. All thanks to Spotify's Web API, we can break down the musical features and audio characteristics, then suggest the type of audio device that best matches your unique taste.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-2 gap-6 text-center text-sm text-gray-600">
          <div>
            <span className="block text-2xl font-bold text-[#78aedb]">100%</span>
            Free To Use
          </div>
          <div>
            <span className="block text-2xl font-bold text-[#78aedb]">99.9%</span>
            Taste Accuracy
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white w-full mt-20 py-6 px-6">
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
