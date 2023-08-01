import React, { useState, useEffect } from 'react';
import { BsFillBellFill } from 'react-icons/bs';
import getUserProfile from '../../data/user';

function Topnav() {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const phn = userData.phoneNumber;
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Use async/await to handle the promise
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile(phn);
        setUser(userProfile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  console.log("topnav", user);

  // If user is not null, render the top nav with user details
  if (user) {
    return (
      <div className='bg-gray-50 opacity-90 rounded-b-xl mt-0 gap-3'>
        <h3 className='ml-4 text-green-700 pt-3 font-bold'>Hi,</h3>
        <div className='flex flex-row '>
          <h2 className='text-green-700 text-xl ml-3.5 font-bold mt-1 mb-5'>{user.name ? user.name.toUpperCase() : 'user'}</h2>
        </div>
      </div>
    );
  } else {
    // If user is null, render nothing (or a loading indicator)
    return null;
  }
}

export default Topnav;
