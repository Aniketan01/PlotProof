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
  Scale
} from 'lucide-react';
import { INITIAL_LANDS, INITIAL_TRANSFERS } from './data/mockLandData';
import './App.css';

export default function App() {
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
    <div className="app-container">
      {/* Top Navbar */}
      <header className="navbar">
        <div className="brand">
          <div className="brand-icon">
            <Building2 size={24} />
          </div>
          <div>
            <h1 className="brand-title">LandChain Portal</h1>
            <p className="brand-subtitle">Digital Land Ownership & Title Transfer Registry</p>
          </div>
        </div>

        <nav className="nav-tabs">
          <button 
            className={`tab-btn ${activeTab === 'parcels' ? 'active' : ''}`}
            onClick={() => setActiveTab('parcels')}
          >
            <MapPin size={17} /> Land Parcels ({lands.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'transfer' ? 'active' : ''}`}
            onClick={() => setActiveTab('transfer')}
          >
            <ArrowRightLeft size={17} /> Initiate Transfer
          </button>
          <button 
            className={`tab-btn ${activeTab === 'ledger' ? 'active' : ''}`}
            onClick={() => setActiveTab('ledger')}
          >
            <History size={17} /> Audit Ledger ({transfers.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'locks' ? 'active' : ''}`}
            onClick={() => setActiveTab('locks')}
          >
            <Lock size={17} /> AI File Locks
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
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

        {/* TAB 4: COLLABORATION & AI FILE LOCKS */}
        {activeTab === 'locks' && (
          <section className="section">
            <div className="section-header">
              <div>
                <h2>AI File Ownership & Coordination Registry</h2>
                <p>Live registry preventing partner AI agents from overwriting locked files.</p>
              </div>
            </div>

            <div className="locks-banner">
              <ShieldCheck size={32} className="shield-icon" />
              <div>
                <h3>Strict Mutual AI Boundary Enforced</h3>
                <p>
                  Files listed below are locked for Partner 1's AI. Partner 2's AI agent must not edit or overwrite them.
                  Partner 2 should place features in separate modules (e.g. <code>src/features/</code>).
                </p>
              </div>
            </div>

            <div className="table-responsive">
              <table className="ledger-table">
                <thead>
                  <tr>
                    <th>File Path</th>
                    <th>Owner</th>
                    <th>Access Level</th>
                    <th>Status</th>
                    <th>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-mono font-bold">AI_FILE_LOCKS.md</td>
                    <td>Partner 1 AI</td>
                    <td>Read-Only for Partner 2</td>
                    <td><span className="lock-tag">LOCKED</span></td>
                    <td>Master boundary & file ownership manifest</td>
                  </tr>
                  <tr>
                    <td className="font-mono font-bold">src/App.jsx</td>
                    <td>Partner 1 AI</td>
                    <td>Read-Only for Partner 2</td>
                    <td><span className="lock-tag">LOCKED</span></td>
                    <td>Core transfer portal UI and state management</td>
                  </tr>
                  <tr>
                    <td className="font-mono font-bold">src/App.css</td>
                    <td>Partner 1 AI</td>
                    <td>Read-Only for Partner 2</td>
                    <td><span className="lock-tag">LOCKED</span></td>
                    <td>Portal styling & layouts</td>
                  </tr>
                  <tr>
                    <td className="font-mono font-bold">src/index.css</td>
                    <td>Partner 1 AI</td>
                    <td>Read-Only for Partner 2</td>
                    <td><span className="lock-tag">LOCKED</span></td>
                    <td>Global design theme variables</td>
                  </tr>
                  <tr>
                    <td className="font-mono font-bold">src/data/mockLandData.js</td>
                    <td>Partner 1 AI</td>
                    <td>Read-Only for Partner 2</td>
                    <td><span className="lock-tag">LOCKED</span></td>
                    <td>Land parcels & transfer records mock data</td>
                  </tr>
                  <tr>
                    <td className="font-mono font-bold">src/features/*</td>
                    <td>Partner 2 (Friend + AI)</td>
                    <td>Full Read/Write</td>
                    <td><span className="open-tag">OPEN FOR FRIEND</span></td>
                    <td>Dedicated folder for new friend modules & extensions</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
