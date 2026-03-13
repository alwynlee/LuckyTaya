import { useState, useEffect } from 'react';

interface TCModalProps {
  isOpen: boolean;
  onAccept: () => void;
}

export default function TCModal({ isOpen, onAccept }: TCModalProps) {
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setAgreed(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="animate-modal-in bg-(--color-bg2) border border-(--color-border) rounded-2xl w-full max-w-[420px] mx-4 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-(--color-bg3) px-6 py-4 border-b border-(--color-border)">
          <p className="font-black text-xl text-white tracking-tight">LuckyTaya</p>
          <p className="text-(--color-muted) text-sm mt-0.5">Before we start, just a few T&amp;Cs</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-(--color-muted)">
            Please read and understand our{' '}
            <a
              href="#"
              className="text-(--color-accent) hover:underline"
            >
              Responsible Gambling Policy
            </a>{' '}
            before continuing.
          </p>

          <div>
            <p className="text-sm text-white font-semibold mb-2">The following persons cannot register:</p>
            <ul className="space-y-1.5 text-sm text-(--color-muted) list-disc list-inside">
              <li>Government officials and employees</li>
              <li>Members of the AFP and PNP</li>
              <li>Persons under 21 years of age</li>
              <li>Persons listed in the National Database of Restricted Persons (NDRP)</li>
            </ul>
          </div>

          <p className="text-sm text-(--color-muted)">
            This platform is regulated by{' '}
            <a
              href="https://pagcor.ph"
              target="_blank"
              rel="noopener noreferrer"
              className="text-(--color-accent) hover:underline"
            >
              PAGCOR
            </a>
            .
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 space-y-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-(--color-accent) cursor-pointer"
            />
            <span className="text-sm text-(--color-muted)">
              I am 21 years of age or older and agree to the Terms and Conditions.
            </span>
          </label>
          <button
            onClick={onAccept}
            disabled={!agreed}
            className="w-full bg-(--color-dark) text-white font-semibold text-sm py-2.5 rounded-lg hover:opacity-90 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue to LuckyTaya &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
