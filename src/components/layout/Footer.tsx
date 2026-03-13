const gameLinks = ['Slots', 'Live Casino', 'Table Games', 'Royal Derby', 'Bilyarbet', 'Sportsbook'];
const accountLinks = ['My Account', 'Deposit', 'Withdraw', 'Transaction History', 'Bonuses'];
const supportLinks = ['Help Center', 'Live Chat', 'Contact Us', 'FAQs', 'Terms & Conditions', 'Privacy Policy'];

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-border">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="font-black text-white tracking-widest text-lg mb-3">LuckyTaya</div>
            <p className="text-muted text-sm leading-relaxed">
              Your premier online gaming destination. Play responsibly and enjoy a wide range of casino games, sports betting, and more.
            </p>
          </div>

          {/* Games */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">Games</h4>
            <ul className="space-y-2">
              {gameLinks.map((link) => (
                <li key={link}>
                  <span className="text-muted text-sm hover:text-white transition-colors cursor-pointer">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">Account</h4>
            <ul className="space-y-2">
              {accountLinks.map((link) => (
                <li key={link}>
                  <span className="text-muted text-sm hover:text-white transition-colors cursor-pointer">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link}>
                  <span className="text-muted text-sm hover:text-white transition-colors cursor-pointer">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Responsible Gaming */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="text-center space-y-3">
            <p className="text-muted text-xs font-semibold uppercase tracking-wider">Responsible Gaming</p>
            <p className="text-muted text-xs leading-relaxed max-w-2xl mx-auto">
              PAGCOR COA NO. XX-XXXX-XX. This site is for users aged 21 and above only. If you or someone you know has a gambling problem, please contact PAGCOR&apos;s Responsible Gaming Program or seek help from a rehabilitation center.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-muted">
              <span>National Center for Mental Health</span>
              <span className="text-border">|</span>
              <span>DoH Treatment &amp; Rehabilitation Centers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted text-xs">&copy; 2026 LuckyTaya. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="bg-bg2 border border-border text-muted text-[10px] font-bold px-2 py-1 rounded">
              21+ Only
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
