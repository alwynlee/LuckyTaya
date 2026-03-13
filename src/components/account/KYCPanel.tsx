interface KYCPanelProps {
  onBack?: () => void;
}

export default function KYCPanel({ onBack }: KYCPanelProps) {
  return (
    <div className="space-y-6">
      {onBack && (
        <button onClick={onBack} className="md:hidden flex items-center gap-1 text-sm text-(--color-muted) hover:text-(--color-dark) mb-2 cursor-pointer">
          ← Back
        </button>
      )}

      <h2 className="text-lg font-bold text-(--color-dark)">Verification / KYC</h2>

      {/* Status Card */}
      <div className="bg-(--color-bg2) border border-(--color-border) rounded-xl p-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-(--color-dark)">Verification Status</div>
          <div className="text-xs text-(--color-muted) mt-0.5">Complete all 3 items to verify your account</div>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-amber-50 text-amber-600 font-medium">
          Unverified
        </span>
      </div>

      {/* Step 1: Government ID */}
      <div className="bg-(--color-bg2) border border-(--color-border) rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-(--color-dark) text-white text-xs flex items-center justify-center font-bold">1</span>
          <h3 className="text-sm font-semibold text-(--color-dark)">Government ID</h3>
        </div>

        <div>
          <label className="block text-xs font-medium text-(--color-muted) mb-1">ID Type</label>
          <select className="w-full px-3 py-2 text-sm bg-(--color-bg) border border-(--color-border) rounded-lg text-(--color-dark) cursor-pointer">
            <option>Select ID type...</option>
            <option>Philippine Passport</option>
            <option>Driver's License</option>
            <option>PhilSys National ID</option>
            <option>SSS ID</option>
            <option>UMID</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border-2 border-dashed border-(--color-border) rounded-xl p-6 text-center cursor-pointer hover:bg-(--color-bg3) transition-colors">
            <div className="text-2xl mb-2">📄</div>
            <div className="text-sm font-medium text-(--color-dark)">Front Side</div>
            <div className="text-xs text-(--color-muted) mt-1">Click to upload</div>
          </div>
          <div className="border-2 border-dashed border-(--color-border) rounded-xl p-6 text-center cursor-pointer hover:bg-(--color-bg3) transition-colors">
            <div className="text-2xl mb-2">📄</div>
            <div className="text-sm font-medium text-(--color-dark)">Back Side</div>
            <div className="text-xs text-(--color-muted) mt-1">Click to upload</div>
          </div>
        </div>

        <button className="px-5 py-2 rounded-lg bg-(--color-dark) text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer">
          Submit ID
        </button>
      </div>

      {/* Step 2: Selfie Verification */}
      <div className="bg-(--color-bg2) border border-(--color-border) rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-(--color-dark) text-white text-xs flex items-center justify-center font-bold">2</span>
          <h3 className="text-sm font-semibold text-(--color-dark)">Selfie Verification</h3>
        </div>

        <div className="border-2 border-dashed border-(--color-border) rounded-xl p-8 text-center cursor-pointer hover:bg-(--color-bg3) transition-colors">
          <div className="text-3xl mb-2">🤳</div>
          <div className="text-sm font-medium text-(--color-dark)">Selfie with your ID</div>
          <div className="text-xs text-(--color-muted) mt-1">Hold your ID next to your face. Click to upload.</div>
        </div>

        <button className="px-5 py-2 rounded-lg bg-(--color-dark) text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer">
          Submit Selfie
        </button>
      </div>

      {/* Step 3: Proof of Billing */}
      <div className="bg-(--color-bg2) border border-(--color-border) rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-(--color-dark) text-white text-xs flex items-center justify-center font-bold">3</span>
          <h3 className="text-sm font-semibold text-(--color-dark)">Proof of Billing</h3>
        </div>

        <div>
          <label className="block text-xs font-medium text-(--color-muted) mb-1">Document Type</label>
          <select className="w-full px-3 py-2 text-sm bg-(--color-bg) border border-(--color-border) rounded-lg text-(--color-dark) cursor-pointer">
            <option>Select document type...</option>
            <option>Electric Bill</option>
            <option>Water Bill</option>
            <option>Internet / Cable Bill</option>
            <option>Bank Statement</option>
          </select>
        </div>

        <div className="border-2 border-dashed border-(--color-border) rounded-xl p-8 text-center cursor-pointer hover:bg-(--color-bg3) transition-colors">
          <div className="text-3xl mb-2">📎</div>
          <div className="text-sm font-medium text-(--color-dark)">Upload Document</div>
          <div className="text-xs text-(--color-muted) mt-1">Click to upload (PDF, JPG, PNG)</div>
        </div>

        <button className="px-5 py-2 rounded-lg bg-(--color-dark) text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer">
          Submit Document
        </button>
      </div>
    </div>
  );
}
