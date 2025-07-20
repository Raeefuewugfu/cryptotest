import React, { useMemo } from 'react';
import Card from './ui/Card';
import { mockCoins, mockPortfolio } from '../data/mockData';
import { Coin } from '../types';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { ICONS } from '../constants';

const formatCurrency = (value: number) => {
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
    <span className={`flex items-center text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
      {isPositive ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
    </span>
  );
};

const QuickActionButton: React.FC<{icon: React.ReactNode, label: string}> = ({ icon, label }) => (
    <button className="flex flex-col items-center justify-center space-y-2 p-4 bg-gray-800/50 rounded-xl hover:bg-indigo-600/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
      <div className="p-3 bg-gray-900/50 rounded-full text-indigo-400">{icon}</div>
      <span className="font-semibold text-sm text-white">{label}</span>
    </button>
);

const TopMovers: React.FC = () => {
    const sortedCoins = [...mockCoins].sort((a, b) => b.change24h - a.change24h).slice(0, 3);
    const fallenCoins = [...mockCoins].sort((a, b) => a.change24h - b.change24h).slice(0, 3);
    return (
        <Card className="h-full">
            <h3 className="text-xl font-bold text-white mb-4">Market Movers</h3>
            <div className="space-y-4">
                <div>
                    <h4 className="font-semibold text-green-400 mb-2">Top Gainers</h4>
                    {sortedCoins.map(coin => (
                        <div key={coin.id} className="flex items-center justify-between py-2">
                            <div className="flex items-center">
                                <img src={coin.logoUrl} alt={coin.name} className="w-8 h-8 mr-3"/>
                                <div>
                                    <p className="font-semibold text-white">{coin.symbol}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-white">{formatCurrency(coin.price)}</p>
                                <PriceChange change={coin.change24h} />
                            </div>
                        </div>
                    ))}
                </div>
                 <div>
                    <h4 className="font-semibold text-red-400 mb-2">Top Losers</h4>
                    {fallenCoins.map(coin => (
                        <div key={coin.id} className="flex items-center justify-between py-2">
                            <div className="flex items-center">
                                <img src={coin.logoUrl} alt={coin.name} className="w-8 h-8 mr-3"/>
                                <div>
                                    <p className="font-semibold text-white">{coin.symbol}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-white">{formatCurrency(coin.price)}</p>
                                <PriceChange change={coin.change24h} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    )
}

const Dashboard: React.FC = () => {
  const { totalBalance, dailyProfitLoss, dailyProfitLossPercent, portfolioDistribution } = useMemo(() => {
    let totalBalance = 0;
    let previousDayBalance = 0;

    const portfolioDistribution = mockPortfolio.map(asset => {
      const coin = mockCoins.find(c => c.id === asset.coinId);
      if (!coin) return null;
      const value = asset.amount * coin.price;
      const prevValue = asset.amount * coin.priceHistory[coin.priceHistory.length - 2].value;
      totalBalance += value;
      previousDayBalance += prevValue;
      return {
        name: coin.symbol,
        value: value,
        color: coin.id === 'bitcoin' ? '#f7931a' : coin.id === 'ethereum' ? '#627eea' : coin.id === 'solana' ? '#9945FF' : '#00C49F'
      };
    }).filter(Boolean) as {name: string, value: number, color: string}[];

    const dailyProfitLoss = totalBalance - previousDayBalance;
    const dailyProfitLossPercent = previousDayBalance > 0 ? (dailyProfitLoss / previousDayBalance) * 100 : 0;

    return { totalBalance, dailyProfitLoss, dailyProfitLossPercent, portfolioDistribution };
  }, []);

  return (
    <div className="p-4 md:p-8 space-y-8">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card className="col-span-1">
            <h3 className="text-gray-400 text-sm font-medium">Total Balance</h3>
            <p className="text-2xl md:text-3xl font-bold text-white mt-1">{formatCurrency(totalBalance)}</p>
          </Card>
          <Card className="col-span-1">
            <h3 className="text-gray-400 text-sm font-medium">24h P/L</h3>
            <p className={`text-2xl md:text-3xl font-bold mt-1 ${dailyProfitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {dailyProfitLoss >= 0 ? '+' : ''}{formatCurrency(dailyProfitLoss)}
            </p>
          </Card>
          <Card className="col-span-1 lg:col-span-2">
              <h3 className="text-gray-400 text-sm font-medium">Quick Actions</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-2">
                <QuickActionButton icon={<div className="w-6 h-6">{ICONS.trade}</div>} label="Trade" />
                <QuickActionButton icon={<div className="w-6 h-6">{ICONS.deposit}</div>} label="Deposit" />
                <QuickActionButton icon={<div className="w-6 h-6">{ICONS.withdraw}</div>} label="Withdraw" />
                <QuickActionButton icon={<div className="w-6 h-6">{ICONS.settings}</div>} label="Settings" />
              </div>
          </Card>
        </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">Portfolio Allocation</h3>
            <div style={{width: '100%', height: 350}}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie data={portfolioDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={80} outerRadius={140} fill="#8884d8" paddingAngle={5} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                            {portfolioDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: number) => formatCurrency(value)}
                            contentStyle={{ 
                                backgroundColor: 'rgba(31, 41, 55, 0.8)', 
                                borderColor: 'rgba(55, 65, 81, 1)',
                                backdropFilter: 'blur(5px)',
                             }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </Card>
        <TopMovers />
      </div>
    </div>
  );
};

export default Dashboard;
