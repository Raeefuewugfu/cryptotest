import React from 'react';
import { Page } from '../types';
import { ICONS } from '../constants';

interface BottomNavProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: Page;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${
        isActive ? 'text-indigo-400' : 'text-gray-500 hover:text-indigo-400'
      }`}
    >
      {icon}
      <span className={`text-xs mt-1 font-medium ${isActive ? 'text-indigo-400' : 'text-gray-500'}`}>{label}</span>
    </button>
  );
};


const BottomNav: React.FC<BottomNavProps> = ({ activePage, setActivePage }) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-gray-900/80 backdrop-blur-xl border-t border-gray-800 flex justify-around">
        <NavItem
          icon={ICONS.dashboard}
          label={Page.Dashboard}
          isActive={activePage === Page.Dashboard}
          onClick={() => setActivePage(Page.Dashboard)}
        />
        <NavItem
          icon={ICONS.markets}
          label={Page.Markets}
          isActive={activePage === Page.Markets}
          onClick={() => setActivePage(Page.Markets)}
        />
        <NavItem
          icon={ICONS.trade}
          label={Page.Trade}
          isActive={activePage === Page.Trade}
          onClick={() => setActivePage(Page.Trade)}
        />
        <NavItem
          icon={ICONS.wallet}
          label={Page.Wallet}
          isActive={activePage === Page.Wallet}
          onClick={() => setActivePage(Page.Wallet)}
        />
        <NavItem
          icon={ICONS.profile}
          label={Page.Profile}
          isActive={activePage === Page.Profile}
          onClick={() => setActivePage(Page.Profile)}
        />
    </nav>
  );
};

export default BottomNav;
