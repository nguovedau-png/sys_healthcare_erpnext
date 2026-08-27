'use client';

import React, { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import Image from 'next/image';

const API_URL = 'http://localhost:3000/api/v1';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Implement standard login logic here if needed
    // For now, focusing on Social Login as requested
    setTimeout(() => setLoading(false), 2000);
  };

  const handleSocialLogin = (provider: string) => {
    window.location.href = `${API_URL}/auth/${provider}`;
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

        {/* Hero Section */}
        <div className="w-full md:w-1/2 bg-indigo-600 p-12 text-white flex flex-col justify-center relative">
          <div className="absolute inset-0 bg-indigo-600 opacity-90"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-4">HD System</h1>
            <p className="text-indigo-100 text-lg mb-8">
              Welcome back! Please access your account to continue managing your heavy tasks.
            </p>
            <div className="hidden md:block w-32 h-32 bg-white/10 rounded-full blur-2xl absolute -top-10 -left-10"></div>
            <div className="hidden md:block w-40 h-40 bg-white/10 rounded-full blur-2xl absolute -bottom-10 -right-10"></div>
          </div>
        </div>

        {/* Login Form Section */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Login</h2>
          <p className="text-slate-500 mb-8">Enter your details to sign in</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Processing...' : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px bg-slate-200 flex-1"></div>
            <span className="text-slate-400 text-sm">or continue with</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* Google */}
            <button
              onClick={() => handleSocialLogin('google')}
              className="flex items-center justify-center py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all group"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            {/* Facebook */}
            <button
              onClick={() => handleSocialLogin('facebook')}
              className="flex items-center justify-center py-2.5 border border-slate-200 rounded-lg hover:bg-blue-50 transition-all group"
            >
              <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            {/* TikTok */}
            <button
              onClick={() => handleSocialLogin('tiktok')}
              className="flex items-center justify-center py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all group"
            >
              <img src="https://www.svgrepo.com/show/330699/tiktok.svg" alt="TikTok" className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <div className="mt-8 text-center text-sm text-slate-500">
            Don't have an account? <a href="#" className="text-indigo-600 font-semibold hover:underline">Sign up</a>
          </div>
        </div>
      </div>
    </main>
  );
}
