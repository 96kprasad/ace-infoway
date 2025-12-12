'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SVGIcons } from '../../../../utils/svgConstants'
import { useAuth } from '../../context/AuthContext'
import { capitalize, capitalizeFirst } from '../../../../utils/helper'
import Button from '../button'
import LogoutIcon from '@mui/icons-material/Logout'
import ConfirmDialog from '../common/ConfirmDialog'

export default function Header() {
  const [userName, setUserName] = useState('');
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.full_name || '');
    }
  }, []);

  const handleLogout = async () => {
    logout();
    router.push('/register');
  };

  const confirmLogout = () => {
    handleLogout();
    setShowLogoutDialog(false);
  };

  return (
    <header className="header-fixed bg-gray-900 shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between text-white">
        <h1 className="text-2xl font-bold">
          Welcome <span className='text-red-500'>{userName || 'User'}</span>
        </h1>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <SVGIcons.Notification className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">{userName?.charAt(0) || 'U'}</span>
            </div>
            <Button
              caption="Logout"
              variant="danger"
              onClick={() => setShowLogoutDialog(true)}
              icon={<LogoutIcon />}
              iconPosition="right"
              size="sm"
            />
          </div>
        </div>
      </div>
      
      <ConfirmDialog
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={confirmLogout}
        title="Logout Confirmation"
        message="Are you sure you want to logout? You will be redirected to the login page."
      />
    </header>
  )
}