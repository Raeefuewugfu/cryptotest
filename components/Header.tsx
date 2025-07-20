import React from 'react';
import { Page } from '../types';
import { ICONS } from '../constants';

interface HeaderProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, setActivePage }) => {
  return (
    <header className="sticky top-0 z-20 bg-gray-900/50 backdrop-blur-xl border-b border-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-white">{activePage}</h1>
      <div className="flex items-center space-x-4">
        <button className="text-gray-400 hover:text-white transition-colors" aria-label="Notifications">
          {ICONS.bell}
        </button>
        <button onClick={() => setActivePage(Page.Profile)} className="flex items-center space-x-2" aria-label="Open Profile">
           <img src="https://i.pravatar.cc/40" alt="User Avatar" className="w-8 h-8 rounded-full border-2 border-indigo-500" />
        </button>
      </div>
    </header>
  );
};

export default Header;
