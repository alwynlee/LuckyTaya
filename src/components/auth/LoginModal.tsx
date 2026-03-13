import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
}

export default function LoginModal({ isOpen, onClose, onSwitchToSignup }: LoginModalProps) {
  const { login } = useAuth();
  const [step, setStep] = useState<1 | 2>(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(1);
      setUsername('');
      setPassword('');
      setOtp(['', '', '', '']);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

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

  const handleLogin = () => {
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
            {step === 1 ? 'Login to your account' : 'Verify your identity'}
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-(--color-muted) mb-1.5">Username or Email</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-(--color-bg3) border border-(--color-border) rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-(--color-muted) focus:outline-none focus:border-(--color-accent)"
                  placeholder="Enter username or email"
                />
              </div>
              <div>
                <label className="block text-sm text-(--color-muted) mb-1.5">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-(--color-bg3) border border-(--color-border) rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-(--color-muted) focus:outline-none focus:border-(--color-accent)"
                  placeholder="Enter password"
                />
              </div>
              <button
                onClick={handleLogin}
                className="w-full bg-(--color-dark) text-white font-semibold text-sm py-2.5 rounded-lg hover:opacity-90 transition-all cursor-pointer"
              >
                Login &rarr;
              </button>
              <p className="text-center text-sm text-(--color-muted)">
                Don&apos;t have an account?{' '}
                <button
                  onClick={onSwitchToSignup}
                  className="text-(--color-accent) hover:underline cursor-pointer"
                >
                  Sign up free
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
