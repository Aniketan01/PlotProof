import React from 'react';
import { Building2, Home, FileText, LogIn, UserPlus } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, currentUser, onLogout }) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand */}
        <div 
          onClick={() => setCurrentView('home')} 
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="bg-emerald-800 text-white p-2.5 rounded-xl shadow-xs flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">PlotProof</span>
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded uppercase">
                Gov Portal
              </span>
            </div>
            <p className="text-xs text-slate-500">Government of Karnataka • Dept. of Revenue</p>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button 
            onClick={() => setCurrentView('home')}
            className={`flex items-center gap-1.5 transition cursor-pointer hover:text-emerald-800 ${
              currentView === 'home' ? 'text-emerald-800 font-bold' : ''
            }`}
          >
            <Home className="w-4 h-4" />
            Home
          </button>
          
          <button 
            onClick={() => setCurrentView('portal')}
            className={`flex items-center gap-1.5 transition cursor-pointer hover:text-emerald-800 ${
              currentView === 'portal' ? 'text-emerald-800 font-bold' : ''
            }`}
          >
            <FileText className="w-4 h-4" />
            Land Parcels
          </button>

          <a 
            href="#statutory-docs" 
            onClick={() => { if (currentView !== 'home') setCurrentView('home'); }}
            className="hover:text-emerald-800 transition cursor-pointer"
          >
            Required Documents
          </a>
        </nav>

        {/* Right Auth Buttons */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div 
                onClick={() => setCurrentView('portal')}
                className="cursor-pointer text-right"
              >
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 justify-end">
                  <span>{currentUser.name}</span>
                  <span className="text-[10px] uppercase px-1.5 py-0.2 rounded font-bold bg-emerald-100 text-emerald-800">
                    {currentUser.role}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-400">{currentUser.nationalId}</div>
              </div>
              
              <button
                onClick={() => setCurrentView('portal')}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold transition cursor-pointer"
              >
                Dashboard →
              </button>

              <button
                onClick={onLogout}
                className="px-3 py-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 rounded-lg text-xs font-medium border border-slate-200 transition cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setCurrentView('login')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  currentView === 'login'
                    ? 'bg-slate-100 text-slate-900 border border-slate-300'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <LogIn className="w-3.5 h-3.5 text-slate-600" />
                Login
              </button>

              <button
                onClick={() => setCurrentView('signup')}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-emerald-800 hover:bg-emerald-900 text-white transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Sign Up
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
