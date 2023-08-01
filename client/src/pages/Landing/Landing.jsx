import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

function Landing() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    const timer = setTimeout(() => {
      if (userData && userData.phoneNumber && userData.name) {
        navigate('/home');
      } else if (userData && userData.phoneNumber && !userData.name) {
        navigate('/userdetails');
      } else {
        navigate('/login');
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate, userData]);

  return (
    <div className="flex justify-center items-center h-screen">
      <img src={logo} alt="logo" className="max-w-full h-auto" />
    </div>
  );
}

export default Landing;
