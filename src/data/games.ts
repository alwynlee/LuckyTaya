export interface Game {
  id: string;
  name: string;
  category: string;
  emoji: string;
  jackpot: string;
  badge?: 'hot' | 'new';
}

export const featuredGames: Game[] = [
  { id: '1', name: 'Golden Dragon', category: 'Slots', emoji: '\uD83D\uDC09', jackpot: '\u20B188,000', badge: 'hot' },
  { id: '2', name: 'Lucky Clover', category: 'Scratch', emoji: '\uD83C\uDF40', jackpot: '\u20B120,000', badge: 'new' },
  { id: '3', name: 'Taya Roulette', category: 'Table', emoji: '\uD83C\uDFB1', jackpot: '\u20B15,000' },
  { id: '4', name: 'Diamond Rush', category: 'Slots', emoji: '\uD83D\uDC8E', jackpot: '\u20B1150,000', badge: 'hot' },
  { id: '5', name: 'Poker Blitz', category: 'Cards', emoji: '\uD83C\uDCCF', jackpot: '\u20B135,000' },
  { id: '6', name: 'Bullseye Bonus', category: 'Instant', emoji: '\uD83C\uDFAF', jackpot: '\u20B110,000', badge: 'new' },
];

export const allGames: Game[] = [
  ...featuredGames,
  { id: '7', name: 'Star Fortune', category: 'Slots', emoji: '\uD83C\uDF1F', jackpot: '\u20B145,000' },
  { id: '8', name: 'Mega Slots', category: 'Slots', emoji: '\uD83C\uDFB0', jackpot: '\u20B1200,000', badge: 'hot' },
  { id: '9', name: 'Blackjack Live', category: 'Live Dealer', emoji: '\uD83C\uDCA1', jackpot: '\u20B150,000', badge: 'new' },
  { id: '10', name: 'Lucky Dice', category: 'Instant', emoji: '\uD83C\uDFB2', jackpot: '\u20B18,000' },
  { id: '11', name: 'Red Lantern', category: 'Slots', emoji: '\uD83C\uDFEE', jackpot: '\u20B175,000' },
  { id: '12', name: 'Baccarat Royal', category: 'Live Dealer', emoji: '\uD83C\uDCCF', jackpot: '\u20B130,000' },
];

export const casinoCategories = ['All', 'Slots', 'Table Games', 'Scratch Cards', 'Live Dealer', 'Instant Win'];
