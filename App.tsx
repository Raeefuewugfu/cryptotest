import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Markets from './components/Markets';
import Trade from './components/Trade';
import Wallet from './components/Wallet';
import Profile from './components/Profile';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import { Page } from './types';
import { mockCoins } from './data/mockData';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.Dashboard);
  const [selectedCoinId, setSelectedCoinId] = useState<string>(mockCoins[0].id);

  const handleSelectCoin = useCallback((coinId: string) => {
    setSelectedCoinId(coinId);
    setActivePage(Page.Trade);
  }, []);

  const renderContent = () => {
    switch (activePage) {
      case Page.Dashboard:
        return <Dashboard />;
      case Page.Markets:
        return <Markets onSelectCoin={handleSelectCoin} />;
      case Page.Trade:
        return <Trade coinId={selectedCoinId} />;
      case Page.Wallet:
        return <Wallet />;
      case Page.Profile:
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0D1117] bg-grid-gray-700/[0.2] text-gray-200">
       <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      
      <div className="flex-1 md:ml-64 flex flex-col h-screen">
        <Header activePage={activePage} setActivePage={setActivePage} />
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0 z-10">
          {renderContent()}
        </main>
        <BottomNav activePage={activePage} setActivePage={setActivePage} />
      </div>

    </div>
  );
};

export default App;
