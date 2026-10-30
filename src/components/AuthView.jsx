import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Mail, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Fingerprint,
  Scale,
  Sparkles,
  Phone
} from 'lucide-react';

export default function AuthView({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState('buyer'); // 'buyer' | 'seller' | 'officer'
  const [authMethod, setAuthMethod] = useState('password'); // 'password' | 'otp'
  
  // Form fields
  const [fullName, setFullName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [password, setPassword] = useState('');
  
  // OTP state
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('849201');

  // Quick 1-click Demo Fill
  const handleQuickDemo = (demoRole) => {
    setRole(demoRole);
    if (demoRole === 'buyer') {
      setEmailOrPhone('anand.verma@citizen.in');
      setFullName('Anand Verma');
      setNationalId('IND-UID-8839-2210');
      setPassword('CitizenPass@2026');
    } else if (demoRole === 'seller') {
      setEmailOrPhone('priya.nair@property.in');
      setFullName('Priya Nair');
      setNationalId('IND-UID-1102-8874');
      setPassword('SellerPass@2026');
    } else {
      setEmailOrPhone('registrar.zone1@rev.gov.in');
      setFullName('Sub-Registrar S. K. Kulkarni');
      setNationalId('GOV-OFF-4402');
      setPassword('OfficerSecure#99');
    }
    setOtpSent(false);
  };

  const handleSendOtp = () => {
    if (!emailOrPhone) {
      alert("Enter email or mobile number first.");
      return;
    }
    const mockCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(mockCode);
    setOtpSent(true);
    setOtpCode('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (authMethod === 'otp' && otpSent && otpCode !== generatedOtp) {
      alert(`Invalid OTP. Use test OTP: ${generatedOtp}`);
      return;
    }

    const userProfile = {
      name: fullName || (role === 'officer' ? 'Sub-Registrar S. K. Kulkarni' : emailOrPhone.split('@')[0]),
      emailOrPhone,
      nationalId: nationalId || (role === 'officer' ? 'GOV-OFF-4402' : 'IND-UID-9281-0021'),
      role,
      department: role === 'officer' ? 'Department of Land Revenue & Registration' : 'Citizen Portal',
      loginTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    onLoginSuccess(userProfile);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-800">
      
      {/* Top Header */}
      <header className="bg-emerald-950 text-white border-b border-emerald-900/60 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-800/40 p-2.5 rounded-lg border border-emerald-700/50">
              <Building2 className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-tight text-white">
                Land Ownership & Title Registry
              </h1>
              <p className="text-xs text-emerald-300/70">
                Government of Karnataka • Department of Revenue
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-200/80">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Secure Citizen Authentication</span>
          </div>
        </div>
      </header>

      {/* Main Form Center */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden">
          
          {/* Card Top: Role Segmented Control */}
          <div className="p-4 bg-slate-100/70 border-b border-slate-200">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 text-center">
              Select Your Role
            </p>
            <div className="grid grid-cols-3 gap-1.5 bg-slate-200/70 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setRole('buyer')}
                className={`py-2 text-xs font-semibold rounded-lg transition ${
                  role === 'buyer' 
                    ? 'bg-white text-emerald-900 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Buyer
              </button>
              <button
                type="button"
                onClick={() => setRole('seller')}
                className={`py-2 text-xs font-semibold rounded-lg transition ${
                  role === 'seller' 
                    ? 'bg-white text-emerald-900 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Seller
              </button>
              <button
                type="button"
                onClick={() => setRole('officer')}
                className={`py-2 text-xs font-semibold rounded-lg transition ${
                  role === 'officer' 
                    ? 'bg-emerald-900 text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Officer
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Heading */}
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {isSignUp ? 'Create Citizen Account' : 'Welcome back'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {role === 'officer' 
                  ? 'Access registrar verification desk and approval pipeline'
                  : isSignUp 
                  ? 'Register with Aadhaar / PAN for verified property transactions'
                  : 'Enter credentials to access your land deeds and applications'}
              </p>
            </div>

            {/* Quick Demo Fill - minimal and clean */}
            <div className="flex items-center justify-between bg-amber-50/60 border border-amber-200/70 rounded-lg px-3 py-2 text-xs">
              <span className="text-amber-800 font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Quick demo:
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('buyer')}
                  className="px-2 py-0.5 bg-white border border-amber-300 text-amber-900 rounded font-medium hover:bg-amber-100/50"
                >
                  Buyer
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('seller')}
                  className="px-2 py-0.5 bg-white border border-amber-300 text-amber-900 rounded font-medium hover:bg-amber-100/50"
                >
                  Seller
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('officer')}
                  className="px-2 py-0.5 bg-white border border-amber-300 text-amber-900 rounded font-medium hover:bg-amber-100/50"
                >
                  Officer
                </button>
              </div>
            </div>

            {/* Auth Method Toggle: Password vs OTP (Login only) */}
            {!isSignUp && (
              <div className="flex border-b border-slate-200 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setAuthMethod('password')}
                  className={`flex-1 pb-2 border-b-2 transition ${
                    authMethod === 'password'
                      ? 'border-emerald-800 text-emerald-900'
                      : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Password Login
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('otp')}
                  className={`flex-1 pb-2 border-b-2 transition ${
                    authMethod === 'otp'
                      ? 'border-emerald-800 text-emerald-900'
                      : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Instant OTP Login
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name (Sign Up only) */}
              {isSignUp && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Kumar Verma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
                  />
                </div>
              )}

              {/* Email / Phone */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">
                  {authMethod === 'otp' ? 'Mobile Number / Email' : 'Email or Mobile Number'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={role === 'officer' ? 'officer.kulkarni@gov.in' : 'name@example.com or 9876543210'}
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
                />
              </div>

              {/* National ID (Sign up only) */}
              {isSignUp && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">
                    Aadhaar / National ID (UID / PAN)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="IND-UID-8839-2210"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
                  />
                </div>
              )}

              {/* Password (if Password method) */}
              {(isSignUp || authMethod === 'password') && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-600">Password</label>
                    {!isSignUp && (
                      <button type="button" onClick={() => setAuthMethod('otp')} className="text-[11px] text-emerald-800 hover:underline">
                        Forgot? Use OTP
                      </button>
                    )}
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
                  />
                </div>
              )}

              {/* OTP Method */}
              {authMethod === 'otp' && !isSignUp && (
                <div className="space-y-2 pt-1">
                  {!otpSent ? (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="w-full py-2.5 px-3 border border-emerald-300 bg-emerald-50/60 hover:bg-emerald-100/60 text-emerald-900 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Send 6-Digit Verification OTP</span>
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-emerald-800 font-medium">Enter 6-digit OTP:</span>
                        <button
                          type="button"
                          onClick={() => setOtpCode(generatedOtp)}
                          className="text-[11px] text-emerald-700 underline font-medium"
                        >
                          Autofill: {generatedOtp}
                        </button>
                      </div>
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="000000"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        className="w-full text-center tracking-widest font-mono text-base py-2 border border-emerald-300 rounded-lg bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-lg text-sm shadow-sm transition flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                <span>{isSignUp ? 'Create Citizen Account' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Toggle sign in / sign up */}
            <div className="pt-2 text-center text-xs text-slate-500">
              {isSignUp ? (
                <p>
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="font-semibold text-emerald-800 hover:underline"
                  >
                    Sign in here
                  </button>
                </p>
              ) : (
                <p>
                  New to Land Registry?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className="font-semibold text-emerald-800 hover:underline"
                  >
                    Register citizen account
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Clean Bottom Footer */}
      <footer className="py-4 text-center text-xs text-slate-400 border-t border-slate-200/60">
        © 2026 Karnataka Land Records & Title Conveyance Authority • All rights reserved
      </footer>
    </div>
  );
}
