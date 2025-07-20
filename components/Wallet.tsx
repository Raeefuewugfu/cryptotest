import React, { useMemo } from 'react';
import Card from './ui/Card';
import { mockPortfolio, mockCoins } from '../data/mockData';
import { ICONS } from '../constants';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

const Wallet: React.FC = () => {
  const { assets, totalValue } = useMemo(() => {
    const assets = mockPortfolio.map(asset => {
      const coin = mockCoins.find(c => c.id === asset.coinId);
      if (!coin) return null;
      const currentValue = asset.amount * coin.price;
      const totalCost = asset.amount * asset.avgBuyPrice;
      const pnl = currentValue - totalCost;
      const pnlPercent = (pnl / totalCost) * 100;
      return {
        ...asset,
        coin,
        currentValue,
        pnl,
        pnlPercent,
      };
    }).filter(Boolean);

    const totalValue = assets.reduce((sum, asset) => sum + (asset?.currentValue || 0), 0);

    return { assets, totalValue };
  }, []);

  return (
    <div className="p-4 md:p-8">
      <Card className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h3 className="text-gray-400 text-sm font-medium">Total Portfolio Value</h3>
          <p className="text-3xl md:text-4xl font-bold text-white mt-1">{formatCurrency(totalValue)}</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition">
            {ICONS.deposit}
            <span>Deposit</span>
          </button>
          <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition">
            {ICONS.withdraw}
            <span>Withdraw</span>
          </button>
        </div>
      </Card>

      <Card className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-700 bg-gray-800/30">
              <tr>
                <th scope="col" className="p-4">Asset</th>
                <th scope="col" className="p-4 hidden sm:table-cell">Holdings</th>
                <th scope="col" className="p-4">Value</th>
                <th scope="col" className="p-4 hidden md:table-cell">P/L</th>
                <th scope="col" className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.map(asset => {
                if (!asset || !asset.coin) return null;
                const isPositive = asset.pnl >= 0;
                return (
                  <tr key={asset.coinId} className="border-b border-gray-800">
                    <td className="p-4 flex items-center">
                      <img src={asset.coin.logoUrl} alt={asset.coin.name} className="w-8 h-8 mr-4" />
                      <div>
                        <p className="font-bold text-white">{asset.coin.name}</p>
                        <p className="text-sm text-gray-500">{asset.coin.symbol}</p>
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <p className="font-semibold text-white">{asset.amount} {asset.coin.symbol}</p>
                      <p className="text-sm text-gray-400">Avg. {formatCurrency(asset.avgBuyPrice)}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-white">{formatCurrency(asset.currentValue)}</p>
                      <span className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        {isPositive ? '+' : ''}{asset.pnlPercent.toFixed(2)}%
                      </span>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                       <p className={`font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                         {isPositive ? '+' : ''}{formatCurrency(asset.pnl)}
                       </p>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button className="p-2 bg-gray-700/50 rounded-md hover:bg-gray-600/50 transition" aria-label="Trade asset">
                          {ICONS.trade}
                        </button>
                         <button className="p-2 bg-gray-700/50 rounded-md hover:bg-gray-600/50 transition" aria-label="Deposit asset">
                          {ICONS.deposit}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Wallet;
