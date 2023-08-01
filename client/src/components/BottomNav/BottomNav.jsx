import React, { useState, useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FactCheckTwoToneIcon from '@mui/icons-material/FactCheckTwoTone';
import MessageIcon from '@mui/icons-material/Message';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useLocation } from 'react-router-dom';
import './BottomNav.css';

export default function BottomNav() {
  const location = useLocation();
  const [value, setValue] = useState('home');

  useEffect(() => {
    // Update the active value based on the current location
    const path = location.pathname;
    if (path === '/home') {
      setValue('home');
    } else if (path === '/goals') {
      setValue('goals');
    } else if (path === '/chatroom') {
      setValue('Message');
    } else if (path === '/profile') {
      setValue('Account');
    }
  }, [location]);

  const handleIconClick = (newValue) => {
    setValue(newValue);
  };

  const renderIcon = (icon, newValue) => {
    const isActive = value === newValue;
    const iconStyle = {
      color: isActive ? '#43C59D' : 'rgba(190, 190, 190, 1)',
      transform: 'scale(1.5)',
    };

    return React.cloneElement(icon, {
      style: iconStyle,
      onClick: () => handleIconClick(newValue),
    });
  };

  return (
    <BottomNavigation
      className="bg-white-500 h-16"
      sx={{
        position: 'fixed',
        bottom: 3,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}
      value={value}
    >
      <Link to="/home">
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={renderIcon(<HomeIcon />, 'home')}
        />
      </Link>
      <Link to="/goals">
        <BottomNavigationAction
          label="goals"
          value="goals"
          icon={renderIcon(<FactCheckTwoToneIcon />, 'goals')}
        />
      </Link>
      <Link to="/chatroom">
        <BottomNavigationAction
          label="Message"
          value="Message"
          icon={renderIcon(<MessageIcon />, 'Message')}
        />
      </Link>
      <Link to="/profile">
        <BottomNavigationAction
          label="Account"
          value="Account"
          icon={renderIcon(<AccountCircleIcon />, 'Account')}
        />
      </Link>
    </BottomNavigation>
  );
}
