import React from 'react';
import { Page } from '../types';
import { ICONS } from '../constants';

interface SidebarProps {
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
      className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ${
        isActive ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
      }`}
    >
      {icon}
      <span className="ml-4 font-semibold">{label}</span>
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  return (
    <div className="w-64 bg-gray-900/70 backdrop-blur-xl border-r border-gray-800 p-4 flex-col h-screen fixed hidden md:flex">
      <div className="flex items-center mb-10 px-2">
        <svg className="w-8 h-8 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z"/>
        </svg>
        <h1 className="text-xl font-bold text-white ml-3">Horizon</h1>
      </div>
      <nav className="flex flex-col space-y-2">
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
      </nav>
      <div className="mt-auto space-y-2">
        <NavItem
          icon={ICONS.profile}
          label={Page.Profile}
          isActive={activePage === Page.Profile}
          onClick={() => setActivePage(Page.Profile)}
        />
         <button
            className="flex items-center w-full px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-700/50 hover:text-white transition-colors duration-200"
        >
            {ICONS.logout}
            <span className="ml-4 font-semibold">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
