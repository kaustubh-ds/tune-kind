'use client';

import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function Login() {
    const handleLogin = () => {
        const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
        const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
        const scope = 'playlist-read-private playlist-read-collaborative';
        const state = Math.random().toString(36).substring(2, 15); // Random state for security

        const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;

        console.log('Generated Authorization URL:', authUrl);

        window.location.href = authUrl;
    };

    return (
        <div className="min-h-screen bg-[url('../public/swbg.png')] flex flex-col justify-between bg-white text-black selection:bg-[#78aedb] selection:text-black">
            <Head>
                <title>Login - TuneKind</title>
                <link rel="icon" href="/tkicon.png" />
            </Head>

            {/* Navbar */}
            <Navbar />

            {/* Login Content */}
            <main className="flex-grow flex flex-col items-center justify-center px-4 py-24 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                    Connect your <span className="text-[#78aedb]">Spotify</span> to begin
                </h1>
                <p className="text-lg text-gray-600 mb-10 max-w-md">
                    We’ll analyze your playlist to recommend your ideal audio device. Let’s get started!
                </p>
                <button
                    onClick={handleLogin}
                    className="group bg-white relative m-1 cursor-pointer overflow-hidden rounded-md border-2 w-48 border-[#78aedb] px-6 py-3 font-sans"
                >
                    <span className="ease-in-out absolute top-1/2 h-0 w-64 origin-center -translate-x-20 rotate-45 bg-[#78aedb] transition-all duration-500 group-hover:h-64 group-hover:-translate-y-32"></span>
                    <span className="ease relative text-[#78aedb] transition duration-300 group-hover:text-white">
                        Login with Spotify
                    </span>
                </button>
            </main>

            {/* Footer */}
            <footer className="bg-black text-white w-full mt-10 py-6 px-6">
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
