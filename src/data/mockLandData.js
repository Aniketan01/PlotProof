export const INITIAL_LANDS = [
  {
    id: "LND-2024-001",
    surveyNumber: "SY-452/3A",
    titleDeedNo: "TD-882910-K",
    location: "Green Valley Sector 4, Bangalore",
    area: "2,400 sq.ft (5.5 Cents)",
    currentOwner: "Arun Kumar Sharma",
    ownerNationalId: "IND-UID-9281-4432",
    propertyType: "Residential Plot",
    valuation: "$145,000",
    status: "Verified", // "Verified" | "Transfer Pending" | "Transferred"
    taxClearance: true,
    encumbranceFree: true,
    registrationDate: "2021-04-12",
    coordinates: "12.9716° N, 77.5946° E"
  },
  {
    id: "LND-2024-002",
    surveyNumber: "SY-108/1B",
    titleDeedNo: "TD-440192-M",
    location: "Palm Meadows Ridge, Pune",
    area: "4,800 sq.ft (11 Cents)",
    currentOwner: "Priya Nair",
    ownerNationalId: "IND-UID-1102-8874",
    propertyType: "Commercial Land",
    valuation: "$320,000",
    status: "Transfer Pending",
    taxClearance: true,
    encumbranceFree: true,
    registrationDate: "2019-11-20",
    coordinates: "18.5204° N, 73.8567° E"
  },
  {
    id: "LND-2024-003",
    surveyNumber: "SY-912/7",
    titleDeedNo: "TD-331004-R",
    location: "Sunrise Agro Hills, Nashik",
    area: "2.5 Acres",
    currentOwner: "Rajesh Patil",
    ownerNationalId: "IND-UID-6571-0021",
    propertyType: "Agricultural Farmland",
    valuation: "$95,000",
    status: "Verified",
    taxClearance: true,
    encumbranceFree: true,
    registrationDate: "2018-02-15",
    coordinates: "19.9975° N, 73.7898° E"
  },
  {
    id: "LND-2024-004",
    surveyNumber: "SY-229/4C",
    titleDeedNo: "TD-774431-T",
    location: "Coastal Bay Vista, Kochi",
    area: "3,200 sq.ft (7.3 Cents)",
    currentOwner: "Devika Menon",
    ownerNationalId: "IND-UID-4309-7712",
    propertyType: "Residential Villa Plot",
    valuation: "$210,000",
    status: "Transferred",
    taxClearance: true,
    encumbranceFree: true,
    registrationDate: "2024-08-10",
    coordinates: "9.9312° N, 76.2673° E"
  }
];

export const INITIAL_TRANSFERS = [
  {
    transferId: "TX-9901-TRF",
    landId: "LND-2024-004",
    previousOwner: "Vikramaditya Rao",
    newOwner: "Devika Menon",
    newOwnerNationalId: "IND-UID-4309-7712",
    transferDate: "2024-08-10 14:32:00",
    agreedPrice: "$210,000",
    stampDutyPaid: "$14,700",
    registrarOffice: "Kochi Sub-Registrar Office #4",
    txHash: "0x8fa3...b419c8d2",
    status: "Completed",
    steps: {
      deedDrafted: true,
      surveyorInspected: true,
      encumbranceChecked: true,
      dutyPaid: true,
      registrarApproved: true
    }
  },
  {
    transferId: "TX-9902-TRF",
    landId: "LND-2024-002",
    previousOwner: "Priya Nair",
    newOwner: "Vikram Sethi",
    newOwnerNationalId: "IND-UID-5541-9920",
    transferDate: "2026-10-28 11:15:22",
    agreedPrice: "$320,000",
    stampDutyPaid: "$22,400",
    registrarOffice: "Pune Central Registry Zone B",
    txHash: "0x3ec9...77d19a4f",
    status: "Under Review",
    steps: {
      deedDrafted: true,
      surveyorInspected: true,
      encumbranceChecked: true,
      dutyPaid: true,
      registrarApproved: false
    }
  }
];

