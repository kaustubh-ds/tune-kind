'use client';

import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent (not really, backend not connected)');
  };

  return (
    <div className="min-h-screen bg-[url('../public/swbg.png')] bg-white text-black selection:bg-[#78aedb] selection:text-black">
      <Head>
        <title>Contact | TuneKind</title>
        <link rel="icon" href="/tkicon.png" />
      </Head>

      {/* Navbar */}
      <Navbar />

      {/* Contact Form */}
      <main className="flex flex-col items-center justify-center px-4 py-32">
        <h1 className="text-4xl md:text-5xl font-bold">
          <span className="text-[#78aedb]">Get in Touch</span> with TuneKind.
        </h1>
        <p className="text-lg text-gray-600 text-center mt-6 max-w-3xl">
        Have questions or feedback? Reach out — TuneKind is here to listen.
        </p>
        <br></br>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white p-8 rounded-lg shadow-[0_0_3px_#78aedb]"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm mb-2">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#78aedb]"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#78aedb]"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-sm mb-2">Message</label>
            <textarea
              name="message"
              id="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#78aedb]"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#78aedb] text-white py-2 rounded-md hover:bg-[#5b97c9] transition"
          >
            Send Message
          </button>
        </form>
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
