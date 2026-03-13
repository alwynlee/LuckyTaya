import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function SignupModal({ isOpen, onClose, onSwitchToLogin }: SignupModalProps) {
  const { login } = useAuth();
  const [step, setStep] = useState<1 | 2>(1);
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(1);
      setUsername('');
      setMobile('');
      setPassword('');
      setConfirmPassword('');
      setOtp(['', '', '', '']);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const showMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    setStep(2);
  };

  const handleVerify = () => {
    login();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="animate-modal-in bg-(--color-bg2) border border-(--color-border) rounded-2xl w-full max-w-[420px] mx-4 shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-(--color-bg3) px-6 py-4 border-b border-(--color-border)">
          <p className="font-black text-xl text-white tracking-tight">LuckyTaya</p>
          <p className="text-(--color-muted) text-sm mt-0.5">
            {step === 1 ? 'Create your account' : 'Verify your identity'}
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-(--color-muted) mb-1.5">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-(--color-bg3) border border-(--color-border) rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-(--color-muted) focus:outline-none focus:border-(--color-accent)"
                  placeholder="Choose a username"
                />
              </div>
              <div>
                <label className="block text-sm text-(--color-muted) mb-1.5">Mobile Number</label>
                <div className="flex gap-2">
                  <span className="flex items-center bg-(--color-bg3) border border-(--color-border) rounded-lg px-3 text-sm text-(--color-muted)">
                    +63
                  </span>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="flex-1 bg-(--color-bg3) border border-(--color-border) rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-(--color-muted) focus:outline-none focus:border-(--color-accent)"
                    placeholder="9XX XXX XXXX"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-(--color-muted) mb-1.5">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-(--color-bg3) border border-(--color-border) rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-(--color-muted) focus:outline-none focus:border-(--color-accent)"
                  placeholder="Create a password"
                />
              </div>
              <div>
                <label className="block text-sm text-(--color-muted) mb-1.5">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full bg-(--color-bg3) border rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-(--color-muted) focus:outline-none ${
                    showMismatch
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-(--color-border) focus:border-(--color-accent)'
                  }`}
                  placeholder="Confirm your password"
                />
                {showMismatch && (
                  <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                )}
              </div>
              <button
                onClick={handleContinue}
                disabled={!passwordsMatch}
                className="w-full bg-(--color-dark) text-white font-semibold text-sm py-2.5 rounded-lg hover:opacity-90 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue &rarr;
              </button>
              <p className="text-center text-sm text-(--color-muted)">
                Already have an account?{' '}
                <button
                  onClick={onSwitchToLogin}
                  className="text-(--color-accent) hover:underline cursor-pointer"
                >
                  Login
                </button>
              </p>
            </div>
          ) : (
            <div className="space-y-5 text-center">
              <div className="text-4xl">📱</div>
              <p className="text-sm text-(--color-muted)">
                We sent a 4-digit verification code to your registered mobile number.
              </p>
              <div className="flex justify-center gap-3">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { otpRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="w-12 h-14 bg-(--color-bg3) border border-(--color-border) rounded-lg text-center text-white text-xl font-bold focus:outline-none focus:border-(--color-accent)"
                  />
                ))}
              </div>
              <button
                onClick={handleVerify}
                className="w-full bg-(--color-dark) text-white font-semibold text-sm py-2.5 rounded-lg hover:opacity-90 transition-all cursor-pointer"
              >
                Verify &amp; Login &rarr;
              </button>
              <button className="text-sm text-(--color-accent) hover:underline cursor-pointer">
                Resend code
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
