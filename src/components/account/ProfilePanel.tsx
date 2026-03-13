interface ProfilePanelProps {
  onBack?: () => void;
}

export default function ProfilePanel({ onBack }: ProfilePanelProps) {
  return (
    <div className="space-y-6">
      {onBack && (
        <button onClick={onBack} className="md:hidden flex items-center gap-1 text-sm text-(--color-muted) hover:text-(--color-dark) mb-2 cursor-pointer">
          ← Back
        </button>
      )}

      <h2 className="text-lg font-bold text-(--color-dark)">Personal Details</h2>

      {/* Avatar + Name */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-(--color-dark) text-white flex items-center justify-center font-bold text-lg">
            AL
          </div>
          <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-(--color-bg2) border border-(--color-border) rounded-full flex items-center justify-center text-xs cursor-pointer hover:bg-(--color-bg3)">
            ✏️
          </button>
        </div>
        <div>
          <div className="font-semibold text-(--color-dark)">Alwyn Santos</div>
          <div className="text-xs text-(--color-muted)">LP-2024-00847</div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-(--color-bg2) border border-(--color-border) rounded-xl p-5 space-y-4">
        {/* First / Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-(--color-muted) mb-1">First Name</label>
            <input
              type="text"
              defaultValue="Alwyn"
              className="w-full px-3 py-2 text-sm bg-(--color-bg) border border-(--color-border) rounded-lg text-(--color-dark)"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-(--color-muted) mb-1">Last Name</label>
            <input
              type="text"
              defaultValue="Santos"
              className="w-full px-3 py-2 text-sm bg-(--color-bg) border border-(--color-border) rounded-lg text-(--color-dark)"
            />
          </div>
        </div>

        {/* Display Name */}
        <div>
          <label className="block text-xs font-medium text-(--color-muted) mb-1">Display Name</label>
          <input
            type="text"
            defaultValue="alwyn_santos"
            className="w-full px-3 py-2 text-sm bg-(--color-bg) border border-(--color-border) rounded-lg text-(--color-dark)"
          />
        </div>

        {/* DOB / Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-(--color-muted) mb-1">Date of Birth</label>
            <input
              type="text"
              defaultValue="1995-06-15"
              className="w-full px-3 py-2 text-sm bg-(--color-bg) border border-(--color-border) rounded-lg text-(--color-dark)"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-(--color-muted) mb-1">Mobile Number</label>
            <input
              type="text"
              defaultValue="+63 917 123 4567"
              className="w-full px-3 py-2 text-sm bg-(--color-bg) border border-(--color-border) rounded-lg text-(--color-dark)"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-(--color-muted) mb-1">Email Address</label>
          <input
            type="email"
            defaultValue="alwyn.santos@email.com"
            className="w-full px-3 py-2 text-sm bg-(--color-bg) border border-(--color-border) rounded-lg text-(--color-dark)"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-xs font-medium text-(--color-muted) mb-1">Address</label>
          <input
            type="text"
            defaultValue="123 Rizal Ave, Brgy. San Antonio"
            className="w-full px-3 py-2 text-sm bg-(--color-bg) border border-(--color-border) rounded-lg text-(--color-dark)"
          />
        </div>

        {/* Province / Zip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-(--color-muted) mb-1">Province</label>
            <input
              type="text"
              defaultValue="Metro Manila"
              className="w-full px-3 py-2 text-sm bg-(--color-bg) border border-(--color-border) rounded-lg text-(--color-dark)"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-(--color-muted) mb-1">Zip Code</label>
            <input
              type="text"
              defaultValue="1008"
              className="w-full px-3 py-2 text-sm bg-(--color-bg) border border-(--color-border) rounded-lg text-(--color-dark)"
            />
          </div>
        </div>
      </div>

      {/* Save */}
      <button className="px-6 py-2.5 rounded-lg bg-(--color-dark) text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer">
        Save Changes
      </button>
    </div>
  );
}
