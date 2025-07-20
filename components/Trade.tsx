import React, { useState, useMemo } from 'react';
import Card from './ui/Card';
import PriceChart from './ui/PriceChart';
import { mockCoins } from '../data/mockData';
import { OrderType } from '../types';

interface TradeProps {
  coinId: string;
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
};

const TabButton: React.FC<{label: string, active: boolean, onClick: ()=>void, colorClass: string}> = ({label, active, onClick, colorClass}) => (
    <button 
        onClick={onClick}
        className={`w-1/2 py-3 text-lg font-bold transition-colors focus:outline-none ${active ? `${colorClass} border-b-2 ${colorClass.replace('text', 'border')}` : 'text-gray-400 hover:text-white'}`}
    >
        {label}
    </button>
);

const TimeframeButton: React.FC<{label: string, active: boolean, onClick: ()=>void}> = ({label, active, onClick}) => (
    <button onClick={onClick} className={`px-3 py-1 text-sm rounded-md transition-colors ${active ? 'bg-indigo-600 text-white' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'}`}>
        {label}
    </button>
)

const Trade: React.FC<TradeProps> = ({ coinId }) => {
  const [orderSide, setOrderSide] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<OrderType>(OrderType.Market);
  const [amount, setAmount] = useState('');
  const [limitPrice, setLimitPrice] = useState('');
  const [stopPrice, setStopPrice] = useState('');
  const [timeframe, setTimeframe] = useState('1M');

  const coin = mockCoins.find(c => c.id === coinId);

  const chartData = useMemo(() => {
    if (!coin) return [];
    const history = coin.priceHistory;
    switch(timeframe) {
        case '1D': return history.slice(-1);
        case '7D': return history.slice(-7);
        case '1M': return history.slice(-30);
        case '1Y': return history.slice(-365);
        default: return history.slice(-30);
    }
  }, [coin, timeframe]);

  if (!coin) {
    return (
      <div className="p-8 text-center h-full flex flex-col justify-center items-center">
        <h1 className="text-2xl text-white font-bold">Please select a coin</h1>
        <p className="text-gray-400">Navigate to the Markets page to select a coin to trade.</p>
      </div>
    );
  }

  const isPositive = coin.change24h >= 0;
  const total = Number(amount) * (orderType === OrderType.Market ? coin.price : Number(limitPrice) || 0);

  return (
    <div className="p-4 md:p-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Chart and Info Section */}
      <div className="lg:col-span-3 flex flex-col">
        <header className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <img src={coin.logoUrl} alt={coin.name} className="w-10 h-10 md:w-12 md:h-12 mr-4" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center">{coin.name} <span className="text-base md:text-lg text-gray-400 ml-2">{coin.symbol}</span></h1>
              <p className="text-xl md:text-2xl font-semibold text-white">{formatCurrency(coin.price)}</p>
            </div>
          </div>
          <div className={`text-base md:text-lg font-bold px-3 py-1 rounded-md ${isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {isPositive ? '▲' : '▼'} {Math.abs(coin.change24h).toFixed(2)}%
          </div>
        </header>
        <div className="flex items-center space-x-2 mb-4">
            {['1D', '7D', '1M', '1Y'].map(tf => <TimeframeButton key={tf} label={tf} active={timeframe === tf} onClick={()=> setTimeframe(tf)} />)}
        </div>
        <div className="flex-grow h-64 md:h-auto">
          <PriceChart data={chartData} color={isPositive ? '#22c55e' : '#ef4444'} />
        </div>
      </div>

      {/* Trade Form Section */}
      <div className="lg:col-span-2">
        <Card className="h-full">
          <div className="flex border-b border-gray-700">
            <TabButton label="Buy" active={orderSide === 'buy'} onClick={() => setOrderSide('buy')} colorClass="text-green-400" />
            <TabButton label="Sell" active={orderSide === 'sell'} onClick={() => setOrderSide('sell')} colorClass="text-red-400" />
          </div>
          
          <div className="flex justify-around my-4">
             {Object.values(OrderType).map(type => 
                <button key={type} onClick={() => setOrderType(type)} className={`px-4 py-1 rounded-md text-sm font-semibold transition ${orderType === type ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}>{type}</button>
             )}
          </div>

          <div className="space-y-4">
            {orderType === OrderType.StopLimit && (
                 <div>
                    <label className="text-sm font-medium text-gray-400">Stop Price</label>
                    <input type="number" value={stopPrice} onChange={e => setStopPrice(e.target.value)} placeholder={`e.g. ${formatCurrency(coin.price * 0.99).substring(1)}`} className="mt-1 w-full bg-gray-900/50 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
            )}
            {orderType !== OrderType.Market && (
                 <div>
                    <label className="text-sm font-medium text-gray-400">Limit Price</label>
                    <input type="number" value={limitPrice} onChange={e => setLimitPrice(e.target.value)} placeholder={`e.g. ${formatCurrency(coin.price * 0.98).substring(1)}`} className="mt-1 w-full bg-gray-900/50 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-400">Amount</label>
              <div className="relative mt-1">
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">{coin.symbol}</span>
              </div>
            </div>
            <div className="text-sm text-gray-500 space-y-2 pt-2">
                <div className="flex justify-between"><span>Total</span> <span>~{formatCurrency(total)}</span></div>
                <div className="flex justify-between"><span>Fee (0.1%)</span> <span>{formatCurrency(total * 0.001)}</span></div>
            </div>
            <button className={`w-full py-3 rounded-lg text-lg font-bold transition-transform transform hover:scale-[1.02] ${orderSide === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}>
              {orderSide === 'buy' ? `Buy ${coin.symbol}` : `Sell ${coin.symbol}`}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Trade;
