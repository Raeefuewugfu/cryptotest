import React from 'react';
import Card from './ui/Card';
import { ICONS } from '../constants';

const SettingsRow: React.FC<{icon: React.ReactNode, title: string, subtitle: string, action?: React.ReactNode}> = ({icon, title, subtitle, action}) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-700/50">
        <div className="flex items-center">
            <div className="text-indigo-400 mr-4">{icon}</div>
            <div>
                <h4 className="font-semibold text-white">{title}</h4>
                <p className="text-sm text-gray-400">{subtitle}</p>
            </div>
        </div>
        <div>{action}</div>
    </div>
);

const Toggle: React.FC<{enabled: boolean}> = ({enabled}) => (
    <div className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer ${enabled ? 'bg-indigo-600' : 'bg-gray-600'}`}>
        <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${enabled ? 'translate-x-6' : ''}`}></div>
    </div>
);


const Profile: React.FC = () => {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <Card>
        <div className="flex items-center">
          <img src="https://i.pravatar.cc/80" alt="User Avatar" className="w-20 h-20 rounded-full border-4 border-indigo-500 mr-6" />
          <div>
            <h2 className="text-2xl font-bold text-white">John Doe</h2>
            <p className="text-gray-400">john.doe@example.com</p>
            <span className="mt-2 inline-block bg-green-500/20 text-green-300 text-xs font-semibold px-2 py-1 rounded-full">KYC Verified</span>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-bold text-white mb-2">Security</h3>
        <SettingsRow 
            icon={ICONS.profile} 
            title="Change Password" 
            subtitle="Last changed 3 months ago"
            action={<button className="font-semibold text-indigo-400 hover:text-indigo-300">Change</button>}
        />
        <SettingsRow 
            icon={ICONS.bell} 
            title="Two-Factor Authentication" 
            subtitle="Keep your account secure"
            action={<Toggle enabled={true} />}
        />
         <SettingsRow 
            icon={ICONS.wallet} 
            title="Withdrawal Address Whitelist" 
            subtitle="Only allow withdrawals to saved addresses"
            action={<Toggle enabled={false} />}
        />
      </Card>
      
       <Card>
        <h3 className="text-xl font-bold text-white mb-2">Preferences</h3>
        <SettingsRow 
            icon={ICONS.settings} 
            title="App Theme" 
            subtitle="Light / Dark"
            action={<div className="font-semibold text-white">Dark</div>}
        />
        <SettingsRow 
            icon={ICONS.markets} 
            title="Default Currency" 
            subtitle="USD, EUR, GBP"
            action={<div className="font-semibold text-white">USD</div>}
        />
      </Card>
    </div>
  );
};

export default Profile;
