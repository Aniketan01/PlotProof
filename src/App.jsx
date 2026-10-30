import React, { useState } from 'react';
import { 
  Building2, 
  ArrowRightLeft, 
  History, 
  ShieldCheck, 
  Search, 
  MapPin, 
  FileCheck2, 
  Lock, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  UserCheck,
  Hash,
  Scale,
  LogOut,
  User,
  ArrowLeft
} from 'lucide-react';
import { INITIAL_LANDS, INITIAL_TRANSFERS } from './data/mockLandData';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import './App.css';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'login' | 'signup' | 'portal'
  const [activeTab, setActiveTab] = useState('parcels'); // 'parcels' | 'transfer' | 'ledger' | 'locks'
  const [lands, setLands] = useState(INITIAL_LANDS);
  const [transfers, setTransfers] = useState(INITIAL_TRANSFERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Transfer form state
  const [selectedLandId, setSelectedLandId] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [buyerGovId, setBuyerGovId] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [agreedPrice, setAgreedPrice] = useState('');
  const [surveyorApproved, setSurveyorApproved] = useState(false);
  const [taxCleared, setTaxCleared] = useState(false);
  const [encumbranceVerified, setEncumbranceVerified] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  // Quick initiate from land card
  const handleInitiateTransfer = (land) => {
    if (!currentUser) {
      alert("Please sign in or create an account to execute statutory title conveyance for this parcel.");
      setCurrentView('login');
      return;
    }
    setSelectedLandId(land.id);
    setAgreedPrice(land.valuation.replace(/[^0-9]/g, ''));
    setTaxCleared(land.taxClearance);
    setEncumbranceVerified(land.encumbranceFree);
    setActiveTab('transfer');
    setSuccessMsg(null);
  };

  const selectedLand = lands.find((l) => l.id === selectedLandId);

  // Submit transfer
  const handleSubmitTransfer = (e) => {
    e.preventDefault();

    if (!selectedLand) {
      alert("Please select a parcel.");
      return;
    }
    if (!buyerName || !buyerGovId) {
      alert("Please enter transferee/buyer details.");
      return;
    }
    if (!surveyorApproved || !taxCleared || !encumbranceVerified) {
      alert("All legal verifications (Surveyor, Tax, Encumbrance) must be certified.");
      return;
    }

    const priceNum = Number(agreedPrice) || 100000;
    const stampDuty = Math.round(priceNum * 0.07);
    const randomHex = Math.random().toString(16).substring(2, 10);
    const newTxId = `TX-${Math.floor(1000 + Math.random() * 9000)}-TRF`;

    const newTransferRecord = {
      transferId: newTxId,
      landId: selectedLand.id,
      previousOwner: selectedLand.currentOwner,
      newOwner: buyerName,
      newOwnerNationalId: buyerGovId,
      transferDate: new Date().toISOString().replace('T', ' ').substring(0, 19),
      agreedPrice: `$${priceNum.toLocaleString()}`,
      stampDutyPaid: `$${stampDuty.toLocaleString()}`,
      registrarOffice: "Central Land Registry Authority",
      txHash: `0x${randomHex}...${Math.random().toString(16).substring(2, 10)}`,
      status: "Completed",
      steps: {
        deedDrafted: true,
        surveyorInspected: true,
        encumbranceChecked: true,
        dutyPaid: true,
        registrarApproved: true
      }
    };

    // Update land owner and status
    const updatedLands = lands.map((item) => {
      if (item.id === selectedLand.id) {
        return {
          ...item,
          currentOwner: buyerName,
          ownerNationalId: buyerGovId,
          status: "Transferred",
          registrationDate: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    });

    setLands(updatedLands);
    setTransfers([newTransferRecord, ...transfers]);
    setSuccessMsg({
      txId: newTxId,
      landId: selectedLand.id,
      buyer: buyerName,
      txHash: newTransferRecord.txHash
    });

    // Reset inputs
    setBuyerName('');
    setBuyerGovId('');
    setBuyerEmail('');
    setSurveyorApproved(false);
  };

  // Filter lands
  const filteredLands = lands.filter((l) => {
    const matchesSearch = 
      l.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.currentOwner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.surveyNumber.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterStatus === 'ALL') return matchesSearch;
    return matchesSearch && l.status === filterStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      {/* Top Navbar across all views */}
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        currentUser={currentUser} 
        onLogout={() => {
          setCurrentUser(null);
          setCurrentView('home');
        }} 
      />

      {/* VIEW 1: LANDING PAGE */}
      {currentView === 'home' && (
        <LandingPage setCurrentView={setCurrentView} />
      )}

      {/* VIEW 2: LOGIN PAGE (PC DESKTOP SPHERICAL) */}
      {currentView === 'login' && (
        <AuthPage 
          initialMode="login" 
          setCurrentView={setCurrentView}
          onLoginSuccess={(user) => {
            setCurrentUser(user);
            setCurrentView('portal');
            if (user.role === 'buyer') {
              setBuyerName(user.name);
              setBuyerGovId(user.nationalId);
            }
          }} 
        />
      )}

      {/* VIEW 3: SIGNUP PAGE (PC DESKTOP SPHERICAL) */}
      {currentView === 'signup' && (
        <AuthPage 
          initialMode="signup" 
          setCurrentView={setCurrentView}
          onLoginSuccess={(user) => {
            setCurrentUser(user);
            setCurrentView('portal');
            if (user.role === 'buyer') {
              setBuyerName(user.name);
              setBuyerGovId(user.nationalId);
            }
          }} 
        />
      )}

      {/* VIEW 4: PORTAL DASHBOARD */}
      {currentView === 'portal' && (
        <div className="app-container">
          {/* Clean Civic Sub Navigation Bar for Portal Tabs */}
          <div className="bg-white border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                currentUser?.role === 'officer' 
                  ? 'bg-amber-50 text-amber-900 border-amber-200' 
                  : currentUser?.role === 'seller'
                  ? 'bg-teal-50 text-teal-900 border-teal-200'
                  : currentUser?.role === 'buyer'
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}>
                {currentUser ? `${currentUser.role.toUpperCase()} WORKSPACE` : 'PUBLIC DIRECTORY'}
              </span>
              <span className="text-xs text-slate-500 hidden sm:inline">
                {currentUser ? currentUser.department : 'Official Title Deed & Cadastral Registry'}
              </span>
            </div>

            <nav className="flex items-center gap-2">
              <button 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeTab === 'parcels' 
                    ? 'bg-emerald-800 text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                onClick={() => setActiveTab('parcels')}
              >
                <MapPin size={15} /> Land Parcels ({lands.length})
              </button>
              <button 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeTab === 'transfer' 
                    ? 'bg-emerald-800 text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                onClick={() => {
                  if (!currentUser) {
                    alert("Please sign in or create an account to initiate title conveyance.");
                    setCurrentView('login');
                  } else {
                    setActiveTab('transfer');
                  }
                }}
              >
                <ArrowRightLeft size={15} /> Initiate Transfer
              </button>
              <button 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeTab === 'ledger' 
                    ? 'bg-emerald-800 text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                onClick={() => setActiveTab('ledger')}
              >
                <History size={15} /> Audit Ledger ({transfers.length})
              </button>
            </nav>
          </div>

          <main className="main-content">
        {/* TAB 1: PARCELS LIST */}
        {activeTab === 'parcels' && (
          <section className="section">
            <div className="section-header">
              <div>
                <h2>Registered Land Parcels</h2>
                <p>View verified cadastral records, title deeds, and current ownership status.</p>
              </div>
              <div className="filter-controls">
                <div className="search-box">
                  <Search size={18} className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search by Parcel ID, Survey #, Owner, City..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select 
                  className="status-filter"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="ALL">All Statuses</option>
                  <option value="Verified">Verified Only</option>
                  <option value="Transfer Pending">Transfer Pending</option>
                  <option value="Transferred">Transferred</option>
                </select>
              </div>
            </div>

            <div className="parcel-grid">
              {filteredLands.map((land) => (
                <div key={land.id} className="parcel-card">
                  <div className="card-top">
                    <span className="parcel-id">{land.id}</span>
                    <span className={`status-badge ${land.status.toLowerCase().replace(' ', '-')}`}>
                      {land.status}
                    </span>
                  </div>

                  <h3 className="parcel-title">{land.propertyType}</h3>
                  <div className="detail-row">
                    <span className="label">Survey Number:</span>
                    <span className="value font-mono">{land.surveyNumber}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Title Deed:</span>
                    <span className="value font-mono">{land.titleDeedNo}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Location:</span>
                    <span className="value">{land.location}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Area / Size:</span>
                    <span className="value">{land.area}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Registered Owner:</span>
                    <span className="value highlight">{land.currentOwner}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Est. Valuation:</span>
                    <span className="value font-bold">{land.valuation}</span>
                  </div>

                  <div className="card-tags">
                    <span className="tag verified">✓ Tax Cleared</span>
                    <span className="tag verified">✓ Encumbrance Free</span>
                  </div>

                  <div className="card-actions">
                    <button 
                      className="btn-transfer-action"
                      onClick={() => handleInitiateTransfer(land)}
                    >
                      <ArrowRightLeft size={16} /> Transfer Ownership
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 2: TRANSFER REQUEST */}
        {activeTab === 'transfer' && (
          <section className="section form-section">
            <div className="section-header">
              <div>
                <h2>Deed Ownership Transfer Execution</h2>
                <p>Transfer real estate title deed with legal statutory compliance and immutable record generation.</p>
              </div>
            </div>

            {successMsg && (
              <div className="success-banner">
                <CheckCircle2 size={24} className="success-icon" />
                <div>
                  <strong>Transfer Succeeded & Recorded!</strong>
                  <p>Deed for Parcel <b>{successMsg.landId}</b> transferred to <b>{successMsg.buyer}</b>.</p>
                  <p className="tx-hash">Transaction Hash: <code>{successMsg.txHash}</code></p>
                </div>
                <button 
                  className="btn-view-ledger"
                  onClick={() => setActiveTab('ledger')}
                >
                  View in Audit Ledger →
                </button>
              </div>
            )}

            <form onSubmit={handleSubmitTransfer} className="transfer-form">
              {/* Parcel selection */}
              <div className="form-group">
                <label>1. Select Land Parcel to Transfer *</label>
                <select 
                  value={selectedLandId} 
                  onChange={(e) => {
                    setSelectedLandId(e.target.value);
                    const l = lands.find((x) => x.id === e.target.value);
                    if (l) {
                      setAgreedPrice(l.valuation.replace(/[^0-9]/g, ''));
                      setTaxCleared(l.taxClearance);
                      setEncumbranceVerified(l.encumbranceFree);
                    }
                  }}
                  required
                >
                  <option value="">-- Choose Land Parcel --</option>
                  {lands.map((land) => (
                    <option key={land.id} value={land.id}>
                      {land.id} — {land.location} (Owner: {land.currentOwner} | {land.valuation})
                    </option>
                  ))}
                </select>
              </div>

              {selectedLand && (
                <div className="selected-summary">
                  <h4>Selected Parcel Summary:</h4>
                  <div className="summary-grid">
                    <div><b>Current Owner:</b> {selectedLand.currentOwner}</div>
                    <div><b>Owner ID:</b> {selectedLand.ownerNationalId}</div>
                    <div><b>Title Deed:</b> {selectedLand.titleDeedNo}</div>
                    <div><b>Survey #:</b> {selectedLand.surveyNumber}</div>
                    <div><b>Area:</b> {selectedLand.area}</div>
                    <div><b>Valuation:</b> {selectedLand.valuation}</div>
                  </div>
                </div>
              )}

              {/* Transferee / Buyer Details */}
              <div className="form-subheading">
                <UserCheck size={18} />
                <h3>2. Transferee (New Owner) Details</h3>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Full Legal Name *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Anand Mahindra" 
                    value={buyerName} 
                    onChange={(e) => setBuyerName(e.target.value)} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Government National ID / SSN / UID *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. IND-UID-8839-2210" 
                    value={buyerGovId} 
                    onChange={(e) => setBuyerGovId(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    placeholder="transferee@example.com" 
                    value={buyerEmail} 
                    onChange={(e) => setBuyerEmail(e.target.value)} 
                  />
                </div>
                <div className="form-group">
                  <label>Agreed Consideration / Sale Price ($) *</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 150000" 
                    value={agreedPrice} 
                    onChange={(e) => setAgreedPrice(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              {/* Compliance & Checklist */}
              <div className="form-subheading">
                <Scale size={18} />
                <h3>3. Statutory & Registry Verifications</h3>
              </div>

              <div className="checklist-box">
                <label className="checkbox-item">
                  <input 
                    type="checkbox" 
                    checked={surveyorApproved} 
                    onChange={(e) => setSurveyorApproved(e.target.checked)} 
                  />
                  <span>
                    <b>Certified Cadastral Survey & Boundary Verification:</b> Licensed Land Surveyor has verified boundary markers and physical demarcations.
                  </span>
                </label>
                <label className="checkbox-item">
                  <input 
                    type="checkbox" 
                    checked={encumbranceVerified} 
                    onChange={(e) => setEncumbranceVerified(e.target.checked)} 
                  />
                  <span>
                    <b>Nil Encumbrance Certificate (EC):</b> Title has zero mortgage liens, pending court litigation, or secondary claims.
                  </span>
                </label>
                <label className="checkbox-item">
                  <input 
                    type="checkbox" 
                    checked={taxCleared} 
                    onChange={(e) => setTaxCleared(e.target.checked)} 
                  />
                  <span>
                    <b>Municipal & Land Tax Clearance:</b> All municipal real estate tax dues paid in full up to current fiscal year.
                  </span>
                </label>
              </div>

              <div className="duty-calc-card">
                <div>
                  <span className="duty-title">Calculated Stamp Duty & Registration Fee (7%):</span>
                  <p className="duty-desc">Mandatory statutory government treasury deposit for title conveyance.</p>
                </div>
                <div className="duty-amount">
                  ${Math.round((Number(agreedPrice) || 0) * 0.07).toLocaleString()}
                </div>
              </div>

              <button type="submit" className="btn-execute-transfer">
                <FileCheck2 size={18} /> Sign & Execute Ownership Transfer
              </button>
            </form>
          </section>
        )}

        {/* TAB 3: AUDIT LEDGER */}
        {activeTab === 'ledger' && (
          <section className="section">
            <div className="section-header">
              <div>
                <h2>Immutable Land Transfer Ledger</h2>
                <p>Auditable historical records of completed and pending deed transfers.</p>
              </div>
            </div>

            <div className="table-responsive">
              <table className="ledger-table">
                <thead>
                  <tr>
                    <th>Transfer ID</th>
                    <th>Parcel ID</th>
                    <th>Previous Owner</th>
                    <th>New Registered Owner</th>
                    <th>Sale Price</th>
                    <th>Duty Paid</th>
                    <th>Transfer Timestamp</th>
                    <th>Tx Hash</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transfers.map((tx) => (
                    <tr key={tx.transferId}>
                      <td className="font-mono font-bold text-accent">{tx.transferId}</td>
                      <td className="font-mono">{tx.landId}</td>
                      <td>{tx.previousOwner}</td>
                      <td className="highlight-cell">
                        <b>{tx.newOwner}</b>
                        <small className="subtext">{tx.newOwnerNationalId}</small>
                      </td>
                      <td className="font-bold">{tx.agreedPrice}</td>
                      <td>{tx.stampDutyPaid}</td>
                      <td className="subtext">{tx.transferDate}</td>
                      <td>
                        <span className="tx-hash-badge" title={tx.txHash}>
                          <Hash size={12} /> {tx.txHash}
                        </span>
                      </td>
                      <td>
                        <span className={`pill ${tx.status === 'Completed' ? 'pill-success' : 'pill-warning'}`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
    )}
  </div>
  );
}
