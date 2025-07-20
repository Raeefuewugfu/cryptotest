import React, { useState, useMemo } from 'react';
import { mockCoins } from '../data/mockData';
import Card from './ui/Card';
import Sparkline from './ui/Sparkline';
import { Coin } from '../types';

interface MarketsProps {
    onSelectCoin: (coinId: string) => void;
}

const formatCurrency = (value: number, short: boolean = false) => {
    if (short) {
        if (value >= 1_000_000_000_000) return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
        if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
        if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
    }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const PriceChange: React.FC<{ change: number }> = ({ change }) => {
  const isPositive = change >= 0;
  return (
    <span className={`font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
      {isPositive ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
    </span>
  );
};

const Markets: React.FC<MarketsProps> = ({ onSelectCoin }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCoins = useMemo(() => {
    return mockCoins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="p-4 md:p-8">
      <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search coin by name or symbol..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-3 px-4 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>

      <Card className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-700 bg-gray-800/30">
              <tr>
                <th scope="col" className="p-4 text-sm font-semibold">Name</th>
                <th scope="col" className="p-4 text-sm font-semibold">Price</th>
                <th scope="col" className="p-4 text-sm font-semibold hidden sm:table-cell">24h %</th>
                <th scope="col" className="p-4 text-sm font-semibold hidden md:table-cell">Market Cap</th>
                <th scope="col" className="p-4 text-sm font-semibold hidden lg:table-cell">Last 7 Days</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.map((coin, index) => (
                <tr key={coin.id} className="border-b border-gray-800 hover:bg-gray-800/40 transition-colors duration-200 cursor-pointer" onClick={() => onSelectCoin(coin.id)} role="link" tabIndex={0}>
                  <td className="p-4 flex items-center">
                    <img src={coin.logoUrl} alt={coin.name} className="w-8 h-8 mr-4" />
                    <div>
                      <p className="font-bold text-white">{coin.symbol}</p>
                      <p className="text-sm text-gray-500 hidden sm:block">{coin.name}</p>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-white">{formatCurrency(coin.price)}</td>
                  <td className="p-4 hidden sm:table-cell"><PriceChange change={coin.change24h} /></td>
                  <td className="p-4 text-gray-300 hidden md:table-cell">{formatCurrency(coin.marketCap, true)}</td>
                  <td className="p-4 w-32 md:w-48 hidden lg:table-cell">
                    <Sparkline data={coin.sparkline} color={coin.change24h >= 0 ? '#22c55e' : '#ef4444'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Markets;
