'use client';

import { useState } from 'react';
import Head from 'next/head';
import Navbar from './components/navbar';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: 'How does TuneKind work?',
      answer:
        'We analyze your Spotify playlist, then recommend the most suitable type of headphone or earphone based on your musical taste.',
    },
    {
      question: 'Is this free?',
      answer:
        'Yes! TuneKind is completely free to use, with no hidden charges or premium gates.',
    },
    {
      question: 'Where do I buy the recommended device?',
      answer:
        'TuneKind recommends the type of device and ideal features, not specific models or stores. Feel free to contact us for more personalized advice!',
    },
  ];

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem('spotifyAccessToken');

    if (!accessToken) {
      window.location.href = '/login';
      return;
    }

    if (!playlistUrl.trim()) {
      setRecommendation(null);
      setExplanation('Please enter the link to your Spotify playlist.');
      return;
    }

    setLoading(true);
    setRecommendation(null);
    setExplanation('');

    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ playlistUrl }),
      });

      const data = await res.json();
      if (data.type) {
        setRecommendation(data);
        setExplanation(
          `Based on your playlist, we recommend the following audio device type and features:`
        );
      } else {
        setExplanation(data.explanation);
      }
    } catch (err) {
      setExplanation('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[url('../public/swbg.png')] bg-white text-black selection:bg-[#78aedb] selection:text-black">
      <Head>
        <title>TuneKind - Find your Kind of Music Device.</title>
        <link rel="icon" href="/tkicon.png" />
      </Head>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center px-4 py-32">
        <h1 className="text-4xl md:text-5xl font-bold text-black">
          <span className="text-[#78aedb]">Tune</span>Kind, Discover Audio Device That Matches <br className="md:hidden" /> Your Taste.
        </h1>

        <p className="text-lg text-gray-600 mt-4 mb-10 max-w-xl">
          Enter the link of your Spotify playlist (must be public) and get a recommendation for the ideal audio device type and features for your sound preferences.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-xl">
          <input
            type="text"
            value={playlistUrl}
            onChange={(e) => setPlaylistUrl(e.target.value)}
            placeholder="Enter Spotify playlist link..."
            className="flex-1 bg-gray border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#78aedb]"
          />
          <button
            onClick={handleSubmit}
            className="group bg-white relative m-1 cursor-pointer overflow-hidden rounded-md border-2 w-40 border-[#78aedb] px-5 py-3 font-sans"
            disabled={loading}
          >
            <span className="ease-in-out absolute top-1/2 h-0 w-64 origin-center -translate-x-20 rotate-45 bg-[#78aedb] transition-all duration-500 group-hover:h-64 group-hover:-translate-y-32"></span>
            <span className="ease relative text-[#78aedb] transition duration-300 group-hover:text-white">
              {loading ? 'Analyzing...' : 'Analyze Playlist'}
            </span>
          </button>
        </div>

        {explanation && (
          <p className="mt-10 text-gray-700 text-sm max-w-xl">{explanation}</p>
        )}

        {recommendation && (
          <div className="mt-8 w-full max-w-xl bg-gray-50 p-6 rounded-xl shadow-md text-left">
            <h3 className="text-xl font-semibold text-black">Recommended Device Type:</h3>
            <p className="text-[#78aedb] mt-2 mb-4 text-lg font-medium">{recommendation.type}</p>

            <h4 className="text-md font-semibold text-black">Ideal Features:</h4>
            <ul className="list-disc pl-6 text-gray-700 mt-2">
              {recommendation.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 text-center text-sm text-gray-600 mt-16">
          <div>
            <span className="block text-2xl font-bold text-[#78aedb]">100%</span>
            Free To Use
          </div>
          <div>
            <span className="block text-2xl font-bold text-[#78aedb]">99.9%</span>
            Taste Accuracy
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-24 w-full max-w-4xl">
          <h2 className="text-3xl font-semibold mb-6 text-black">Why <span className='text-[#78aedb]'>Tune</span>Kind?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-justify">
            <div>
              <h3 className="text-xl font-bold text-[#78aedb]">Personalized</h3>
              <p className="text-sm text-gray-700 mt-2">Your playlist reflects your true taste—we analyze it to recommend what really suits you.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#78aedb]">Data Driven</h3>
              <p className="text-sm text-gray-700 mt-2">No guesses. We use your listening behavior to guide your next audio device purchase.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#78aedb]">Honest Guidance</h3>
              <p className="text-sm text-gray-700 mt-2">No ads, no bias. Just real advice about device types and must-have features.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-24 w-full max-w-4xl">
          <h2 className="text-3xl font-semibold mb-6 text-black">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 py-4 cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-[#78aedb] font-semibold text-left">{faq.question}</h3>
                  {openFAQ === index ? <ChevronUp className="text-[#78aedb]" /> : <ChevronDown className="text-[#78aedb]" />}
                </div>
                <AnimatePresence initial={false}>
                  {openFAQ === index && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-2 text-gray-600 text-sm">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>
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
