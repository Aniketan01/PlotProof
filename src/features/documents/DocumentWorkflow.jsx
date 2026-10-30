import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  Building, 
  FileCheck, 
  ShieldCheck, 
  Receipt, 
  Map, 
  FileSignature, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  ArrowLeft,
  Sparkles,
  Info
} from 'lucide-react';
import BuyerIdWindow from './windows/BuyerIdWindow';

export const WINDOW_DEFINITIONS = [
  { step: 1, id: 'buyer_id', title: 'Buyer ID Proof', docName: 'Aadhaar / PAN', icon: UserCheck, check: 'Format & legal name match' },
  { step: 2, id: 'seller_id', title: 'Seller ID Proof', docName: 'Aadhaar / PAN', icon: Building, check: 'Format & name match with land record' },
  { step: 3, id: 'title_deed', title: 'Sale Deed / Title Deed', docName: 'Original Title Deed', icon: FileCheck, check: 'Seller is the legal freehold owner' },
  { step: 4, id: 'ec_certificate', title: 'Encumbrance Certificate', docName: 'EC Form 15', icon: ShieldCheck, check: 'No mortgage loans or legal disputes' },
  { step: 5, id: 'tax_receipt', title: 'Property Tax Receipt', docName: 'Municipal Receipt', icon: Receipt, check: 'Taxes are paid up to date' },
  { step: 6, id: 'khata_rtc', title: 'Khata / RTC / Survey', docName: 'Bhoomi RTC & Map', icon: Map, check: 'Survey number & demarcated area match' },
  { step: 7, id: 'sale_agreement', title: 'Sale Agreement', docName: 'Registered Agreement', icon: FileSignature, check: 'Price, parties & land details match' }
];

export default function DocumentWorkflow() {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Persistent workflow storage across window navigation
  const [workflowData, setWorkflowData] = useState(() => {
    try {
      const saved = localStorage.getItem('plotproof_document_workflow');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return {
      buyerId: null,
      sellerId: null,
      titleDeed: null,
      ecCertificate: null,
      taxReceipt: null,
      khataRtc: null,
      saleAgreement: null
    };
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('plotproof_document_workflow', JSON.stringify(workflowData));
    } catch (e) {
      // ignore
    }
  }, [workflowData]);

  // Update specific window state
  const updateFormData = (windowKey, data) => {
    setWorkflowData(prev => ({
      ...prev,
      [windowKey]: data
    }));
  };

  const handleResetCurrentWindow = () => {
    if (confirm("Are you sure you want to clear Window 1 fields?")) {
      updateFormData('buyerId', null);
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      {/* 7-Step Progress Navigator */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 mb-4 border-b border-slate-100 gap-2">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wide flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              Statutory 7-Window Document Verification Pipeline
            </h2>
            <p className="text-xs text-slate-600">
              Complete each window sequentially. Information is retained automatically across steps.
            </p>
          </div>
          <div className="text-xs font-mono bg-slate-50 border border-slate-200 px-3 py-1 rounded text-slate-700">
            Active Window: <b className="text-emerald-900">{currentStep} of 7</b>
          </div>
        </div>

        {/* Horizontal Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {WINDOW_DEFINITIONS.map((def) => {
            const Icon = def.icon;
            const isCurrent = currentStep === def.step;
            const isCompleted = currentStep > def.step || (def.step === 1 && workflowData.buyerId?.isVerified);

            return (
              <button
                key={def.step}
                type="button"
                onClick={() => {
                  // Only allow navigating to visited or completed steps
                  if (def.step <= currentStep || isCompleted) {
                    setCurrentStep(def.step);
                  }
                }}
                className={`text-left p-2.5 rounded-lg border transition-all text-xs flex flex-col justify-between ${
                  isCurrent 
                    ? 'border-emerald-700 bg-emerald-50/70 ring-1 ring-emerald-700' 
                    : isCompleted
                      ? 'border-emerald-200 bg-white hover:bg-slate-50'
                      : 'border-slate-200 bg-slate-50/50 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className={`w-6 h-6 rounded flex items-center justify-center ${
                    isCurrent 
                      ? 'bg-emerald-900 text-white' 
                      : isCompleted 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isCompleted && !isCurrent ? (
                      <CheckCircle2 size={14} className="text-emerald-700" />
                    ) : (
                      <Icon size={13} />
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 font-bold">
                    0{def.step}
                  </span>
                </div>

                <div>
                  <span className="font-bold text-slate-900 block truncate leading-tight">
                    {def.title}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono block truncate">
                    {def.docName}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active Window Screen */}
      {currentStep === 1 && (
        <BuyerIdWindow
          formData={workflowData}
          updateFormData={updateFormData}
          onNext={() => setCurrentStep(2)}
          onReset={handleResetCurrentWindow}
        />
      )}

      {/* Placeholder for Subsequent Windows (Waiting for User's explicit prompt) */}
      {currentStep > 1 && (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 mx-auto rounded-full bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center">
            <Clock size={28} />
          </div>
          <div>
            <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-200">
              Awaiting User Instructions for Window {currentStep}
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-2">
              Window {currentStep}: {WINDOW_DEFINITIONS.find(w => w.step === currentStep)?.title}
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto mt-1 leading-relaxed">
              System check: <b>{WINDOW_DEFINITIONS.find(w => w.step === currentStep)?.check}</b>.
              Per development rules, this window will be built immediately upon receiving your specific instructions!
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs px-4 py-2 rounded border border-slate-300 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Window 1 (Buyer ID)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

