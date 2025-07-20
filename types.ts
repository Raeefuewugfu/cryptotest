export interface Coin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  logoUrl: string;
  sparkline: number[];
  priceHistory: { time: string; value: number }[];
}

export interface PortfolioAsset {
  coinId: string;
  amount: number;
  avgBuyPrice: number;
}

export enum Page {
  Dashboard = 'Dashboard',
  Markets = 'Markets',
  Trade = 'Trade',
  Wallet = 'Wallet',
  Profile = 'Profile',
}

export enum OrderType {
  Market = 'Market',
  Limit = 'Limit',
  StopLimit = 'Stop-Limit',
}
