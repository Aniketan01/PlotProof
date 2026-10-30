import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  User, 
  Mail, 
  Lock, 
  Fingerprint, 
  ArrowRight, 
  CheckCircle2, 
  Scale, 
  Sparkles,
  Phone,
  FileCheck,
  AlertCircle
} from 'lucide-react';

export default function AuthPage({ initialMode = 'login', onLoginSuccess, setCurrentView }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [role, setRole] = useState('buyer'); // 'buyer' | 'seller' | 'officer'
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' | 'otp'

  // Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [password, setPassword] = useState('');
  
  // OTP state
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('849201');

  // Quick 1-click Demo Fill
  const handleQuickDemo = (demoRole) => {
    setRole(demoRole);
    setMode('login');
    if (demoRole === 'buyer') {
      setEmail('anand.verma@citizen.in');
      setPassword('CitizenPass@2026');
      setFullName('Anand Verma');
      setNationalId('IND-UID-8839-2210');
      setPhone('9845012345');
    } else if (demoRole === 'seller') {
      setEmail('priya.nair@property.in');
      setPassword('SellerPass@2026');
      setFullName('Priya Nair');
      setNationalId('IND-UID-1102-8874');
      setPhone('9880098765');
    } else {
      setEmail('registrar.zone1@rev.gov.in');
      setPassword('OfficerSecure#99');
      setFullName('Sub-Registrar S. K. Kulkarni');
      setNationalId('GOV-OFF-4402');
      setPhone('9448011223');
    }
    setOtpSent(false);
  };

  const handleSendOtp = () => {
    if (!email && !phone) {
      alert("Please enter your email or mobile number.");
      return;
    }
    const mockCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(mockCode);
    setOtpSent(true);
    setOtpCode('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === 'login' && loginMethod === 'otp' && otpSent && otpCode !== generatedOtp) {
      alert(`Invalid OTP code. Please enter the test OTP: ${generatedOtp}`);
      return;
    }

    const userProfile = {
      name: fullName || (role === 'officer' ? 'Sub-Registrar S. K. Kulkarni' : (email.split('@')[0] || 'Citizen User')),
      email: email || 'citizen@portal.gov.in',
      phone: phone || '9876543210',
      nationalId: nationalId || (role === 'officer' ? 'GOV-OFF-4402' : 'IND-UID-8839-2210'),
      role,
      department: role === 'officer' ? 'Sub-Registrar Office, Zone 1' : 'Citizen Land Conveyance',
      loginTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    onLoginSuccess(userProfile);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-100 flex items-center justify-center p-6 lg:p-12 text-slate-800">
      
      {/* LARGE DESKTOP DUAL-COLUMN CONTAINER */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* LEFT COLUMN: CIVIC & DEMO PANEL (5 COLS) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Government of Karnataka</span>
            </div>

            <h3 className="text-2xl lg:text-3xl font-extrabold text-white leading-tight">
              Land Title Verification & Transfer Authority
            </h3>
            <p className="text-sm text-emerald-200/80 mt-3 leading-relaxed">
              Official digital conveyance gateway under the Karnataka Land Revenue Act. Fully synchronized with Bhoomi & Kaveri databases.
            </p>

            {/* Checklist */}
            <div className="mt-8 space-y-3.5 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Automated Nil-Encumbrance & Lien Check</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Multi-document OCR & RTC Boundary Cross-check</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Sub-Registrar Digital Clearance Certificate</span>
              </div>
            </div>
          </div>

          {/* Quick Demo Logins in Left Panel - Keeps Form 100% spacious */}
          <div className="relative z-10 mt-10 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 mb-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Quick Demo Testing (1-Click Fill):</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('buyer')}
                className="py-2 px-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition cursor-pointer text-center"
              >
                👤 Buyer
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('seller')}
                className="py-2 px-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition cursor-pointer text-center"
              >
                🔑 Seller
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('officer')}
                className="py-2 px-2 bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-600/40 rounded-lg text-xs font-medium transition cursor-pointer text-center"
              >
                ⚖️ Officer
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SPACIOUS DESKTOP FORM (7 COLS) */}
        <div className="lg:col-span-7 p-8 lg:p-14 bg-white flex flex-col justify-center">
          
          {/* Top Segmented Role Selection */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Select Operating Role
              </label>
              <span className="text-xs text-emerald-700 font-semibold">
                {role === 'officer' ? 'Sub-Registrar Officer' : role === 'seller' ? 'Landowner Seller' : 'Citizen Buyer'}
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setRole('buyer')}
                className={`py-2.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                  role === 'buyer'
                    ? 'bg-white text-emerald-900 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Citizen Buyer
              </button>
              <button
                type="button"
                onClick={() => setRole('seller')}
                className={`py-2.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                  role === 'seller'
                    ? 'bg-white text-emerald-900 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Landowner Seller
              </button>
              <button
                type="button"
                onClick={() => setRole('officer')}
                className={`py-2.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                  role === 'officer'
                    ? 'bg-emerald-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Registrar Officer
              </button>
            </div>
          </div>

          {/* Form Header */}
          <div className="mb-6">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              {mode === 'signup' ? 'Create Citizen Account' : 'Sign in to Portal'}
            </h2>
            <p className="text-sm text-slate-500 mt-1.5">
              {mode === 'signup' 
                ? 'Register with your verified National ID to access title transfers and deed uploads.'
                : 'Enter your credentials to manage property registrations and view clearance status.'}
            </p>
          </div>

          {/* Login method switcher (only in login mode) */}
          {mode === 'login' && (
            <div className="flex border-b border-slate-200 mb-6 text-sm font-semibold">
              <button
                type="button"
                onClick={() => setLoginMethod('password')}
                className={`pb-3 pr-6 border-b-2 transition cursor-pointer ${
                  loginMethod === 'password'
                    ? 'border-emerald-800 text-emerald-900'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                Password Login
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('otp')}
                className={`pb-3 px-6 border-b-2 transition cursor-pointer ${
                  loginMethod === 'otp'
                    ? 'border-emerald-800 text-emerald-900'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                OTP Instant Login
              </button>
            </div>
          )}

          {/* ACTUAL FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* FULL NAME (Sign Up only) */}
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Full Legal Name (as on Government ID) *
                </label>
                <div className="relative">
                  <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Kumar Verma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 bg-white"
                  />
                </div>
              </div>
            )}

            {/* EMAIL / PHONE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Registered Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Mobile Number (for SMS Alerts)
                </label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* AADHAAR / NATIONAL ID (Sign up only) */}
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Aadhaar / National Identity (UID / PAN) *
                </label>
                <div className="relative">
                  <Fingerprint className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="IND-UID-8839-2210"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 text-sm border border-slate-300 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 bg-white"
                  />
                </div>
              </div>
            )}

            {/* PASSWORD (When password method is selected) */}
            {(mode === 'signup' || loginMethod === 'password') && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Password *
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setLoginMethod('otp')}
                      className="text-xs text-emerald-800 font-semibold hover:underline"
                    >
                      Use OTP Login instead
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 bg-white"
                  />
                </div>
              </div>
            )}

            {/* OTP FLOW (When OTP method is selected) */}
            {mode === 'login' && loginMethod === 'otp' && (
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
                {!otpSent ? (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-lg text-sm transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Send 6-Digit OTP to Registered Phone/Email</span>
                  </button>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-900 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        OTP Dispatched!
                      </span>
                      <button
                        type="button"
                        onClick={() => setOtpCode(generatedOtp)}
                        className="text-emerald-800 font-bold underline hover:text-emerald-950"
                      >
                        Autofill Test Code: <b>{generatedOtp}</b>
                      </button>
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="000000"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="w-full text-center tracking-widest font-mono text-lg py-2.5 border border-emerald-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                )}
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-base shadow-sm transition flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <span>{mode === 'signup' ? 'Complete Registration & Access Portal' : 'Authenticate & Sign In'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* TOGGLE LOGIN / SIGNUP */}
          <div className="mt-8 pt-6 border-t border-slate-200 text-center text-sm text-slate-600">
            {mode === 'signup' ? (
              <p>
                Already have a registered account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-emerald-800 hover:underline cursor-pointer"
                >
                  Sign in here →
                </button>
              </p>
            ) : (
              <p>
                Need to register for land title transactions?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="font-bold text-emerald-800 hover:underline cursor-pointer"
                >
                  Register new citizen account →
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

