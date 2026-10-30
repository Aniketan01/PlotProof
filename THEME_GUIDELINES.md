# Design & Tailwind Theme Standards

To keep the application looking like an authentic, professional Civic/Government Land Registry portal (and prevent synthetic AI purple/neon styling):

## 1. Color Palette
- **Page Background:** `bg-slate-50` (`#f8fafc`) - Consistent across all pages/components.
- **Card Background:** `bg-white` (`#ffffff`) with `border border-slate-200 shadow-sm`.
- **Government Brand Primary:** `bg-emerald-900` (`#064e3b`) or `bg-teal-900` (`#134e4a`).
- **Accent Action:** `bg-teal-700 hover:bg-teal-800` or `bg-sky-700 hover:bg-sky-800`.
- **Text:**
  - Headings/Primary: `text-slate-900`
  - Subtitles/Secondary: `text-slate-600`
  - Subtle/Timestamps: `text-slate-400`
  - Technical/IDs: `font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded`

## 2. Status Badges
- **Verified / Passed:** `bg-emerald-50 text-emerald-700 border border-emerald-200`
- **Needs Officer Review / Pending:** `bg-amber-50 text-amber-800 border border-amber-200`
- **Rejected / Missing Document:** `bg-rose-50 text-rose-700 border border-rose-200`

## 3. Layout Conventions
- Wrap main screens in:
  `<div className="min-h-screen bg-slate-50 text-slate-900">`
- Inner container:
  `<div className="max-w-7xl mx-auto px-4 py-8">`
- Cards:
  `<div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">`
