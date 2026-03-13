import { useState } from 'react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-[90px] md:bottom-6 right-6 z-[998] w-[52px] h-[52px] rounded-full bg-dark border-2 border-border flex items-center justify-center cursor-pointer shadow-lg grayscale hover:scale-110 transition-transform"
      >
        <span className="text-2xl">💬</span>
      </div>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-[158px] md:bottom-[74px] right-6 z-[998] w-[300px] bg-white border-2 border-border rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-bg3 px-4 py-4 flex items-center gap-3 border-b border-border">
            <div className="w-[38px] h-[38px] rounded-full bg-bg2 border-2 border-dashed border-border flex items-center justify-center text-xl grayscale">
              🎧
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold">LuckyTaya Support</div>
              <div className="text-xs text-muted">Online now</div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-transparent border-none text-muted text-xl cursor-pointer"
            >
              ×
            </button>
          </div>

          {/* Body */}
          <div className="px-4 py-4">
            <div className="bg-bg2 border border-dashed border-border rounded-lg rounded-bl-sm px-3 py-2.5 text-sm leading-relaxed max-w-[85%] mb-2.5">
              👋 Hi there! How can we help you today?
            </div>
            <div className="flex flex-col gap-2">
              {['💳 Deposit / Withdrawal help', '🔐 Account & login issues', '💬 Talk to a live agent'].map(label => (
                <button
                  key={label}
                  className="bg-bg border border-border text-[#1a1a1a] rounded-full px-3.5 py-2 text-xs cursor-pointer text-left hover:bg-bg2 transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-border flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-bg border border-border rounded-full px-3.5 py-2 text-sm font-[Inter,sans-serif] outline-none text-[#1a1a1a]"
            />
            <button className="w-9 h-9 rounded-full bg-dark border-none cursor-pointer text-white flex-shrink-0 flex items-center justify-center">
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
