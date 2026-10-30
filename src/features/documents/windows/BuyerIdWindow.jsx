import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Eye, 
  Trash2, 
  RefreshCw, 
  ShieldCheck, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';

export default function BuyerIdWindow({ 
  formData, 
  updateFormData, 
  onNext, 
  onReset 
}) {
  // Local state initialized from master workflow formData for seamless state retention
  const initial = formData.buyerId || {
    idType: 'aadhaar_pan', // 'aadhaar' | 'pan' | 'aadhaar_pan'
    fullName: '',
    aadhaarNumber: '',
    panNumber: '',
    dob: '',
    gender: 'male',
    mobileNumber: '',
    email: '',
    address: '',
    state: 'Karnataka',
    pinCode: '',
    consentAadhaar: false,
    consentLegal: false,
    uploadedFile: null,
    ocrExtracted: null,
    isVerified: false
  };

  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [isScanningOcr, setIsScanningOcr] = useState(false);
  const [ocrSuccess, setOcrSuccess] = useState(false);

  // Sync to parent master workflow state on any change
  useEffect(() => {
    updateFormData('buyerId', form);
  }, [form]);

  // Validation rules
  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full Legal Name as on Govt ID is mandatory.";
    } else if (form.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters.";
    }

    // Aadhaar check (12 digits, optional dashes/spaces)
    if (form.idType === 'aadhaar' || form.idType === 'aadhaar_pan') {
      const cleanAadhaar = form.aadhaarNumber.replace(/[\s-]/g, '');
      if (!cleanAadhaar) {
        newErrors.aadhaarNumber = "Aadhaar number is required.";
      } else if (!/^\d{12}$/.test(cleanAadhaar)) {
        newErrors.aadhaarNumber = "Aadhaar must be exactly 12 numerical digits (e.g. 8839 2210 4491).";
      }
    }

    // PAN check (5 letters, 4 digits, 1 letter)
    if (form.idType === 'pan' || form.idType === 'aadhaar_pan') {
      const cleanPan = form.panNumber.trim().toUpperCase();
      if (!cleanPan) {
        newErrors.panNumber = "PAN number is required.";
      } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(cleanPan)) {
        newErrors.panNumber = "Invalid PAN format. Standard format: 5 letters, 4 digits, 1 letter (e.g. ABCDE1234F).";
      }
    }

    if (!form.dob) {
      newErrors.dob = "Date of Birth is required.";
    } else {
      // Check legal age >= 18
      const birthDate = new Date(form.dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        newErrors.dob = "Buyer must be at least 18 years old for statutory land title conveyance.";
      }
    }

    if (!form.mobileNumber) {
      newErrors.mobileNumber = "10-digit mobile number is required.";
    } else if (!/^[6-9]\d{9}$/.test(form.mobileNumber.replace(/[\s-]/g, ''))) {
      newErrors.mobileNumber = "Please enter a valid 10-digit Indian mobile number.";
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.uploadedFile) {
      newErrors.uploadedFile = "Please upload a scanned copy of Buyer ID proof (PDF / JPG / PNG).";
    }

    if (!form.consentAadhaar) {
      newErrors.consentAadhaar = "Consent for identity authentication under the Registration Act is required.";
    }

    if (!form.consentLegal) {
      newErrors.consentLegal = "You must certify the accuracy of the provided identity details.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Simulate File Upload & OCR Extraction
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit. Please upload an optimized file.");
      return;
    }

    const uploadedInfo = {
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      type: file.type || 'application/pdf',
      lastModified: new Date().toLocaleDateString()
    };

    setIsScanningOcr(true);
    setOcrSuccess(false);

    // Simulate realistic 800ms OCR scanning & validation
    setTimeout(() => {
      const detectedName = form.fullName || "Anand Mahindra";
      const detectedAadhaar = form.aadhaarNumber || "8839 2210 4491";
      const detectedPan = form.panNumber || "AAACA1042M";

      const ocrResult = {
        extractedName: detectedName,
        extractedAadhaar: detectedAadhaar,
        extractedPan: detectedPan,
        nameMatchScore: 98.5,
        formatStatus: "VALID_GOVT_SPEC",
        tamperCheck: "PASSED_ZERO_ANOMALIES",
        securitySeal: "UIDAI_DIGITAL_SIGNATURE_VERIFIED",
        scanConfidence: 96
      };

      setForm(prev => ({
        ...prev,
        uploadedFile: uploadedInfo,
        ocrExtracted: ocrResult,
        isVerified: true
      }));

      setIsScanningOcr(false);
      setOcrSuccess(true);
      setErrors(prev => ({ ...prev, uploadedFile: null }));
    }, 750);
  };

  // Quick preset test auto-filler
  const handleAutoFillSample = () => {
    setForm(prev => ({
      ...prev,
      idType: 'aadhaar_pan',
      fullName: 'Anand Mahindra',
      aadhaarNumber: '8839 2210 4491',
      panNumber: 'AAACA1042M',
      dob: '1975-05-01',
      gender: 'male',
      mobileNumber: '9845012345',
      email: 'anand.mahindra@example.com',
      address: 'Plot 42, 100ft Road, Indiranagar',
      state: 'Karnataka',
      pinCode: '560038',
      consentAadhaar: true,
      consentLegal: true,
      uploadedFile: {
        name: 'Aadhaar_PAN_Combined_Verified.pdf',
        size: '1.42 MB',
        type: 'application/pdf',
        lastModified: '2026-10-30'
      },
      ocrExtracted: {
        extractedName: 'Anand Mahindra',
        extractedAadhaar: '8839 2210 4491',
        extractedPan: 'AAACA1042M',
        nameMatchScore: 100,
        formatStatus: 'VALID_GOVT_SPEC',
        tamperCheck: 'PASSED_ZERO_ANOMALIES',
        securitySeal: 'UIDAI_DIGITAL_SIGNATURE_VERIFIED',
        scanConfidence: 99
      },
      isVerified: true
    }));
    setErrors({});
    setOcrSuccess(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      {/* Window Top Banner */}
      <div className="bg-emerald-900 text-white px-6 py-5 border-b border-emerald-950 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-800 border border-emerald-700 flex items-center justify-center text-emerald-200 shadow-inner">
            <UserCheck size={22} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-bold">
                Window 1 of 7
              </span>
              <span className="bg-emerald-800 text-emerald-200 text-[10px] font-mono px-2 py-0.2 rounded border border-emerald-700">
                Statutory ID Verification
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              Buyer Identification Proof (Aadhaar / PAN)
            </h2>
            <p className="text-xs text-emerald-200/80">
              System checks: <b>National ID Format verification</b> & <b>Legal Transferee Name Match</b>
            </p>
          </div>
        </div>

        {/* Quick Sample Auto-fill for Testing */}
        <button
          type="button"
          onClick={handleAutoFillSample}
          className="bg-emerald-800 hover:bg-emerald-700 text-emerald-100 text-xs px-3.5 py-1.5 rounded-md border border-emerald-700 flex items-center gap-1.5 transition-colors self-start sm:self-auto font-medium shadow-2xs"
          title="Auto-fill verified buyer data for rapid testing"
        >
          <Sparkles size={14} className="text-emerald-300" />
          <span>Auto-fill Sample Buyer</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Verification Check Notice */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 flex items-start space-x-3 text-xs">
          <Info size={18} className="text-emerald-800 shrink-0 mt-0.5" />
          <div className="text-slate-700 leading-relaxed">
            <strong className="text-slate-900 block font-mono text-[11px] uppercase">
              System Verification Criteria:
            </strong>
            The automated verification engine validates the 12-digit Aadhaar / 10-character PAN syntax, verifies the transferee's legal majority (18+ years), and executes OCR character matching between the uploaded document scan and the entered legal name.
          </div>
        </div>

        {/* Section 1: ID Document Category Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-900 uppercase font-mono tracking-wide mb-2">
            1. Select Identity Proof Document Category *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'aadhaar_pan', title: 'Both Aadhaar & PAN', badge: 'Recommended', desc: 'Highest verification trust score & instantaneous title clearance' },
              { id: 'aadhaar', title: 'Aadhaar Card Only', badge: 'UIDAI', desc: '12-digit Biometric Unique Identity document' },
              { id: 'pan', title: 'Income Tax PAN Only', badge: 'IT Dept', desc: '10-character alphanumeric Permanent Account Number' }
            ].map((opt) => (
              <label
                key={opt.id}
                className={`flex flex-col p-3.5 rounded-lg border cursor-pointer transition-all ${
                  form.idType === opt.id
                    ? 'border-emerald-700 bg-emerald-50/50 ring-1 ring-emerald-700'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900">{opt.title}</span>
                  <input
                    type="radio"
                    name="idType"
                    value={opt.id}
                    checked={form.idType === opt.id}
                    onChange={(e) => setForm({ ...form, idType: e.target.value })}
                    className="text-emerald-800 focus:ring-emerald-700"
                  />
                </div>
                <span className="text-[11px] text-slate-500 leading-normal">{opt.desc}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Section 2: Personal & Identity Details */}
        <div>
          <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wide mb-3 flex items-center gap-1.5 pb-2 border-b border-slate-100">
            <UserCheck size={15} className="text-emerald-800" />
            2. Transferee (Buyer) Demographic & National ID Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Legal Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase font-mono mb-1">
                Full Legal Name (Exact Match with Govt ID) *
              </label>
              <input
                type="text"
                placeholder="e.g. Anand Mahindra"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className={`w-full text-xs bg-slate-50 border rounded-md p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-700 transition-colors ${
                  errors.fullName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                }`}
              />
              {errors.fullName && <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>}
            </div>

            {/* Aadhaar Number (if selected) */}
            {(form.idType === 'aadhaar' || form.idType === 'aadhaar_pan') && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase font-mono mb-1">
                  Aadhaar Number (12 Digits) *
                </label>
                <input
                  type="text"
                  placeholder="8839 2210 4491"
                  maxLength={14}
                  value={form.aadhaarNumber}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, '').substring(0, 12);
                    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
                    setForm({ ...form, aadhaarNumber: formatted });
                  }}
                  className={`w-full text-xs font-mono bg-slate-50 border rounded-md p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-700 transition-colors ${
                    errors.aadhaarNumber ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                  }`}
                />
                {errors.aadhaarNumber && <p className="text-[11px] text-rose-600 mt-1">{errors.aadhaarNumber}</p>}
              </div>
            )}

            {/* PAN Number (if selected) */}
            {(form.idType === 'pan' || form.idType === 'aadhaar_pan') && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase font-mono mb-1">
                  Income Tax PAN Card Number *
                </label>
                <input
                  type="text"
                  placeholder="e.g. AAACA1042M"
                  maxLength={10}
                  value={form.panNumber}
                  onChange={(e) => setForm({ ...form, panNumber: e.target.value.toUpperCase() })}
                  className={`w-full text-xs font-mono uppercase bg-slate-50 border rounded-md p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-700 transition-colors ${
                    errors.panNumber ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                  }`}
                />
                {errors.panNumber && <p className="text-[11px] text-rose-600 mt-1">{errors.panNumber}</p>}
              </div>
            )}

            {/* Date of Birth */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase font-mono mb-1">
                Date of Birth * (Legal Age 18+)
              </label>
              <input
                type="date"
                value={form.dob}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
                className={`w-full text-xs bg-slate-50 border rounded-md p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-700 transition-colors ${
                  errors.dob ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                }`}
              />
              {errors.dob && <p className="text-[11px] text-rose-600 mt-1">{errors.dob}</p>}
            </div>

            {/* Gender Radio */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase font-mono mb-1.5">
                Gender *
              </label>
              <div className="flex items-center space-x-4 pt-1">
                {[
                  { id: 'male', label: 'Male' },
                  { id: 'female', label: 'Female' },
                  { id: 'other', label: 'Other / Non-Binary' }
                ].map((g) => (
                  <label key={g.id} className="flex items-center space-x-1.5 text-xs text-slate-800 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value={g.id}
                      checked={form.gender === g.id}
                      onChange={(e) => setForm({ ...form, gender: e.target.value })}
                      className="text-emerald-800 focus:ring-emerald-700"
                    />
                    <span>{g.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase font-mono mb-1">
                Mobile Number (Linked with UIDAI / Bank) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-mono text-slate-400">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="9845012345"
                  value={form.mobileNumber}
                  onChange={(e) => setForm({ ...form, mobileNumber: e.target.value.replace(/\D/g, '') })}
                  className={`w-full text-xs font-mono bg-slate-50 border rounded-md pl-11 pr-3 py-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-700 transition-colors ${
                    errors.mobileNumber ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                  }`}
                />
              </div>
              {errors.mobileNumber && <p className="text-[11px] text-rose-600 mt-1">{errors.mobileNumber}</p>}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase font-mono mb-1">
                Email Address (For Statutory Notifications)
              </label>
              <input
                type="email"
                placeholder="transferee@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-md p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
              {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Address Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 uppercase font-mono mb-1">
                Permanent Residential Address (as on ID proof) *
              </label>
              <input
                type="text"
                placeholder="Door/Flat No, Street, Layout, Ward"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase font-mono mb-1">
                Postal PIN Code *
              </label>
              <input
                type="text"
                maxLength={6}
                placeholder="560038"
                value={form.pinCode}
                onChange={(e) => setForm({ ...form, pinCode: e.target.value.replace(/\D/g, '') })}
                className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>
          </div>
        </div>

        {/* Section 3: File Upload & Live OCR Extraction */}
        <div>
          <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wide mb-3 flex items-center gap-1.5 pb-2 border-b border-slate-100">
            <UploadCloud size={15} className="text-emerald-800" />
            3. Upload Scanned Buyer ID Document & Run OCR Format Verification *
          </h3>

          {!form.uploadedFile ? (
            <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
              errors.uploadedFile ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300 bg-slate-50/60 hover:bg-slate-50'
            }`}>
              <UploadCloud size={32} className="mx-auto text-emerald-800 mb-2" />
              <div className="text-xs font-bold text-slate-800 mb-1">
                Drag and drop your ID proof scan here, or browse files
              </div>
              <p className="text-[11px] text-slate-500 mb-3">
                Supported formats: <b>PDF, JPG, PNG</b> (Max File Size: <b>5 MB</b>). Clear color scan recommended.
              </p>

              <label className="inline-flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs px-4 py-2 rounded-md cursor-pointer transition-colors shadow-2xs">
                <FileText size={14} />
                <span>Select ID File from Computer</span>
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              {errors.uploadedFile && <p className="text-[11px] text-rose-600 mt-2">{errors.uploadedFile}</p>}
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <FileText size={18} />
                  </div>
                  <div>
                    <span className="font-mono font-bold text-xs text-slate-900 block">
                      {form.uploadedFile.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Size: {form.uploadedFile.size} • Uploaded on {form.uploadedFile.lastModified}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setForm({ ...form, uploadedFile: null, ocrExtracted: null, isVerified: false })}
                  className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors text-xs flex items-center gap-1"
                  title="Remove document"
                >
                  <Trash2 size={14} />
                  <span className="text-[11px]">Remove</span>
                </button>
              </div>

              {/* OCR Scanning Progress / Result Card */}
              {isScanningOcr && (
                <div className="bg-white border border-slate-200 rounded p-3 flex items-center space-x-3 text-xs">
                  <RefreshCw size={16} className="animate-spin text-emerald-800 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">Running Intelligent OCR Parsing...</span>
                    <span className="text-slate-500 text-[11px]">
                      Extracting full legal name, national ID checksum, and biometric watermark confidence.
                    </span>
                  </div>
                </div>
              )}

              {ocrSuccess && form.ocrExtracted && (
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between border-b border-emerald-200/80 pb-2">
                    <span className="font-mono font-bold text-emerald-950 flex items-center gap-1.5 uppercase text-[11px]">
                      <CheckCircle2 size={14} className="text-emerald-700" />
                      OCR Verification Result: Passed ({form.ocrExtracted.scanConfidence}% Confidence)
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-300 font-bold">
                      {form.ocrExtracted.formatStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Name on Scanned ID:</span>
                      <span className="font-bold text-slate-900">{form.ocrExtracted.extractedName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Name Match Score:</span>
                      <span className="font-bold text-emerald-800">
                        {form.ocrExtracted.nameMatchScore}% Match
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Security Tamper Check:</span>
                      <span className="font-bold text-emerald-800">{form.ocrExtracted.tamperCheck}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Section 4: Legal Undertakings & Checkboxes */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
          <label className="flex items-start space-x-2.5 cursor-pointer text-xs text-slate-800">
            <input
              type="checkbox"
              checked={form.consentAadhaar}
              onChange={(e) => setForm({ ...form, consentAadhaar: e.target.checked })}
              className="mt-0.5 text-emerald-800 focus:ring-emerald-700 rounded"
            />
            <span className="leading-relaxed">
              <b>Statutory Authentication Consent:</b> I voluntarily submit my identity document details for statutory validation under the Registration Act, 1908 and Information Technology Act, 2000 for land ownership conveyance.
            </span>
          </label>
          {errors.consentAadhaar && <p className="text-[11px] text-rose-600 pl-6">{errors.consentAadhaar}</p>}

          <label className="flex items-start space-x-2.5 cursor-pointer text-xs text-slate-800">
            <input
              type="checkbox"
              checked={form.consentLegal}
              onChange={(e) => setForm({ ...form, consentLegal: e.target.checked })}
              className="mt-0.5 text-emerald-800 focus:ring-emerald-700 rounded"
            />
            <span className="leading-relaxed">
              <b>Accuracy Undertaking:</b> I certify that the name and credentials entered match my official government identity records without any fraudulent impersonation or misrepresentation.
            </span>
          </label>
          {errors.consentLegal && <p className="text-[11px] text-rose-600 pl-6">{errors.consentLegal}</p>}
        </div>

        {/* Form Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={onReset}
            className="text-slate-600 hover:text-slate-800 font-medium text-xs px-3.5 py-2 rounded border border-slate-300 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 self-start sm:self-auto"
          >
            <RotateCcw size={13} />
            <span>Reset Window 1</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs px-5 py-2.5 rounded-md transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Validate & Save Window 1 (Next: Seller ID)</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
