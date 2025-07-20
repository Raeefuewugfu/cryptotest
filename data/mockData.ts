import { Coin, PortfolioAsset } from '../types';

const generatePriceHistory = (base: number, days: number, volatility: number) => {
  const history = [];
  let price = base;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    history.push({ time: date.toISOString().split('T')[0], value: price });
    price += (Math.random() - 0.49) * price * volatility;
    price = Math.max(price, 0.01); 
  }
  return history;
};

const generateSparkline = (history: { time: string; value: number }[], points: number) => {
  const fullData = history.map(p => p.value);
  if (fullData.length <= points) return fullData;
  const step = Math.floor(fullData.length / points);
  return Array.from({ length: points }, (_, i) => fullData[i * step]);
};

const bitcoinHistory = generatePriceHistory(68000, 365, 0.03);
const ethereumHistory = generatePriceHistory(3500, 365, 0.04);
const solanaHistory = generatePriceHistory(150, 365, 0.08);
const cardanoHistory = generatePriceHistory(0.45, 365, 0.09);
const dogecoinHistory = generatePriceHistory(0.15, 365, 0.15);
const rippleHistory = generatePriceHistory(0.52, 365, 0.06);

export const mockCoins: Coin[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: bitcoinHistory[bitcoinHistory.length - 1].value,
    change24h: (bitcoinHistory[bitcoinHistory.length - 1].value / bitcoinHistory[bitcoinHistory.length - 2].value - 1) * 100,
    volume24h: 35_000_000_000,
    marketCap: 1_300_000_000_000,
    logoUrl: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25659/svg/color/btc.svg',
    sparkline: generateSparkline(bitcoinHistory.slice(-30), 24),
    priceHistory: bitcoinHistory,
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price: ethereumHistory[ethereumHistory.length - 1].value,
    change24h: (ethereumHistory[ethereumHistory.length - 1].value / ethereumHistory[ethereumHistory.length - 2].value - 1) * 100,
    volume24h: 18_000_000_000,
    marketCap: 420_000_000_000,
    logoUrl: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25659/svg/color/eth.svg',
    sparkline: generateSparkline(ethereumHistory.slice(-30), 24),
    priceHistory: ethereumHistory,
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    price: solanaHistory[solanaHistory.length - 1].value,
    change24h: (solanaHistory[solanaHistory.length - 1].value / solanaHistory[solanaHistory.length - 2].value - 1) * 100,
    volume24h: 3_000_000_000,
    marketCap: 70_000_000_000,
    logoUrl: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25659/svg/color/sol.svg',
    sparkline: generateSparkline(solanaHistory.slice(-30), 24),
    priceHistory: solanaHistory,
  },
    {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    price: cardanoHistory[cardanoHistory.length - 1].value,
    change24h: (cardanoHistory[cardanoHistory.length - 1].value / cardanoHistory[cardanoHistory.length - 2].value - 1) * 100,
    volume24h: 500_000_000,
    marketCap: 16_000_000_000,
    logoUrl: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25659/svg/color/ada.svg',
    sparkline: generateSparkline(cardanoHistory.slice(-30), 24),
    priceHistory: cardanoHistory,
  },
  {
    id: 'dogecoin',
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: dogecoinHistory[dogecoinHistory.length - 1].value,
    change24h: (dogecoinHistory[dogecoinHistory.length - 1].value / dogecoinHistory[dogecoinHistory.length - 2].value - 1) * 100,
    volume24h: 1_200_000_000,
    marketCap: 22_000_000_000,
    logoUrl: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25659/svg/color/doge.svg',
    sparkline: generateSparkline(dogecoinHistory.slice(-30), 24),
    priceHistory: dogecoinHistory,
  },
  {
    id: 'ripple',
    name: 'Ripple',
    symbol: 'XRP',
    price: rippleHistory[rippleHistory.length - 1].value,
    change24h: (rippleHistory[rippleHistory.length - 1].value / rippleHistory[rippleHistory.length - 2].value - 1) * 100,
    volume24h: 1_800_000_000,
    marketCap: 28_000_000_000,
    logoUrl: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25659/svg/color/xrp.svg',
    sparkline: generateSparkline(rippleHistory.slice(-30), 24),
    priceHistory: rippleHistory,
  },
];

export const mockPortfolio: PortfolioAsset[] = [
  { coinId: 'bitcoin', amount: 0.5, avgBuyPrice: 55000 },
  { coinId: 'ethereum', amount: 10, avgBuyPrice: 3000 },
  { coinId: 'solana', amount: 100, avgBuyPrice: 120 },
  { coinId: 'cardano', amount: 10000, avgBuyPrice: 0.55 },
];
