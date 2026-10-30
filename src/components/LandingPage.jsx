import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  FileCheck2, 
  ArrowRight, 
  Scale, 
  Search, 
  UserCheck, 
  CheckCircle2, 
  ScrollText, 
  Clock, 
  FileText,
  BadgeCheck,
  ChevronRight
} from 'lucide-react';

export default function LandingPage({ setCurrentView }) {
  return (
    <div className="bg-slate-50 text-slate-800 font-sans">
      
      {/* OFFICIAL CIVIC HERO SECTION - CLEAN, PROFESSIONAL, NO DARK AI GRADIENTS */}
      <section className="bg-white border-b border-slate-200 py-16 lg:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          
          <div className="max-w-3xl">
            {/* Government Authority Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Government of Karnataka • Land Revenue & Registration Portal</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Digital Land Ownership Transfer & Title Verification System
            </h1>

            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              A secure, paperless verification platform for property buyers, sellers, and sub-registrars. Upload sale deeds, verify nil-encumbrance status, conduct instant cadastral survey cross-checks, and track conveyance orders in real time.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setCurrentView('signup')}
                className="px-6 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-xl text-sm shadow-sm transition flex items-center gap-2.5 cursor-pointer"
              >
                <span>Apply as Citizen Buyer</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentView('login')}
                className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-sm border border-slate-300 transition flex items-center gap-2 cursor-pointer"
              >
                <UserCheck className="w-4 h-4 text-slate-600" />
                <span>Existing User / Officer Sign In</span>
              </button>
            </div>
          </div>

          {/* Key Metrics / Highlights Grid */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-slate-200">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <div className="text-2xl font-bold text-slate-900">100%</div>
              <div className="text-xs font-semibold text-emerald-800 mt-1 uppercase tracking-wider">Nil Encumbrance</div>
              <p className="text-xs text-slate-500 mt-1">Zero mortgage liens or pending court litigation</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <div className="text-2xl font-bold text-slate-900">7-Point</div>
              <div className="text-xs font-semibold text-emerald-800 mt-1 uppercase tracking-wider">Statutory Checks</div>
              <p className="text-xs text-slate-500 mt-1">OCR title verification & survey coordinate matching</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <div className="text-2xl font-bold text-slate-900">&lt; 24 Hours</div>
              <div className="text-xs font-semibold text-emerald-800 mt-1 uppercase tracking-wider">Officer Approval</div>
              <p className="text-xs text-slate-500 mt-1">Streamlined Sub-Registrar review desk</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <div className="text-2xl font-bold text-slate-900">Tamper-Proof</div>
              <div className="text-xs font-semibold text-emerald-800 mt-1 uppercase tracking-wider">Audit Ledger</div>
              <p className="text-xs text-slate-500 mt-1">Immutable transfer certificates and transaction logs</p>
            </div>
          </div>

        </div>
      </section>

      {/* THREE STAKEHOLDER ROLES (From Project Spec) */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
            Role-Based Access
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
            Designed for Citizens, Landowners & Revenue Officers
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Complies with statutory workflow mandated by the Land Revenue & Title Registration department.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Buyer */}
          <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-bold text-sm mb-5">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900">Citizen Buyer</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Registers with Aadhaar / PAN, enters survey details, uploads sale deed & EC documents, and tracks clearance status.
              </p>
              <div className="mt-5 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Aadhaar / PAN identity match</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Automatic stamp duty computation</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Real-time milestone tracking</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('signup')}
              className="mt-7 w-full py-2.5 bg-slate-100 hover:bg-emerald-800 hover:text-white text-slate-800 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              Sign Up as Buyer →
            </button>
          </div>

          {/* Seller */}
          <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-teal-100 text-teal-800 rounded-xl flex items-center justify-center font-bold text-sm mb-5">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900">Landowner / Seller</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Confirms deed conveyance, uploads seller identity proofs, and validates current title deed ownership against survey databases.
              </p>
              <div className="mt-5 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2 text-teal-800">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>Chain of title legal verification</span>
                </div>
                <div className="flex items-center gap-2 text-teal-800">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>Property tax clearance proof</span>
                </div>
                <div className="flex items-center gap-2 text-teal-800">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>Sale agreement endorsement</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('signup')}
              className="mt-7 w-full py-2.5 bg-slate-100 hover:bg-teal-800 hover:text-white text-slate-800 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              Enter as Seller →
            </button>
          </div>

          {/* Officer */}
          <div className="bg-white border border-emerald-300 rounded-2xl p-7 shadow-xs flex flex-col justify-between bg-emerald-50/20">
            <div>
              <div className="w-10 h-10 bg-emerald-800 text-white rounded-xl flex items-center justify-center font-bold text-sm mb-5">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900">Sub-Registrar Officer</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Authorized Revenue Department administrators review flagged documents, inspect survey discrepancies, and issue final transfer orders.
              </p>
              <div className="mt-5 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2 text-emerald-900 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Officer decision desk (Approve / Reject)</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-900 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Audit log of all officer actions</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-900 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Issue digital transfer certificate</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('login')}
              className="mt-7 w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition cursor-pointer"
            >
              Officer Desk Login →
            </button>
          </div>
        </div>
      </section>

      {/* 7 DOCUMENTS STATUTORY VERIFICATION (From Project PDF) */}
      <section id="statutory-docs" className="py-16 px-6 bg-slate-100 border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          
          <div className="mb-10">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Statutory Documentation
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">
              7 Mandatory Documents Cross-Checked by the System
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Documents are extracted via OCR and cross-referenced with government land-records dummy database.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Buyer ID Proof (Aadhaar / PAN)", desc: "Format validation, name spelling match, and photo identity verification." },
              { title: "Seller ID Proof", desc: "Format match and statutory owner verification with the registered cadastral record." },
              { title: "Sale Deed / Title Deed", desc: "Verifies lawful ownership chain and absence of disputed co-heir claims." },
              { title: "Encumbrance Certificate (EC)", desc: "Confirms nil bank mortgage liens, court attachments, or secondary debt charges." },
              { title: "Property Tax Receipt", desc: "Verifies municipal / panchayat real estate property taxes are paid up to date." },
              { title: "Khata / RTC / Survey Records", desc: "Ensures survey number, demarcation boundaries, and recorded land area match." },
            ].map((d, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 flex items-start gap-3.5">
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-bold px-2 py-1 rounded">
                  0{i + 1}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{d.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-8 px-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-4 h-4 text-emerald-800" />
            <span className="font-semibold text-slate-800">
              Karnataka Land Records & Title Conveyance Authority
            </span>
          </div>
          <div>
            © 2026 Department of Revenue. All rights reserved. Protected under Land Registration Acts.
          </div>
        </div>
      </footer>

    </div>
  );
}
