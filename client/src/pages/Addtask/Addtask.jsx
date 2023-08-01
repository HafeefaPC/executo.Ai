import React, { useState } from 'react';
import BottomNav from '../../components/BottomNav/BottomNav';
import Topnav from '../../components/Topnav/Topnav';
import { useNavigate } from 'react-router-dom';

function Addtask() {

  const [goal, setGoal] = useState('')
  const [day, setDay] = useState('')
  console.log(goal, day)
  const userData = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate()
  const phn = userData.phoneNumber
  const handleSetGoal = async () => {
    try {
      const response = await fetch('http://localhost:3000/prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ goal, day, phn })
      });

      navigate('/goals')
      window.location.reload()
      if (response.ok) {
        const data = await response.json();
        console.log('Server response:', data);
        // Do something with the response from the server
      } else {
        console.error('Error:', response.statusText);
        // Handle the error condition
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Handle the error condition
    }
  }

  return (

    <div className='bg-[#F3F3F3] h-screen w-screen flex pr-3 flex-col'>
      <Topnav />
      <div className="pt-20 pl-4">
        <h2 className="font-bold text-gray-600">Add your goal</h2>
        <input
          className="h-[6rem] w-[22rem] outline-none mt-4 rounded-md bg-white px-4 pb-10 shadow-inner"
          type="text"
          placeholder="Type your goal here......"
          style={{ lineHeight: '2rem' }}
          onChange={(e) => setGoal(e.target.value)}
        />
      </div>
      <div className="pt-8 pl-4">
        <h2 className="font-bold text-gray-600">How many days until deadline?</h2>
        <input
          className="h-[3rem] w-[22rem] outline-none mt-4 rounded-md bg-white px-4  shadow-inner"
          type="text"
          onChange={(e) => setDay(e.target.value)}
        />
        <button className='h-[3rem] w-[22rem] bg-[#43C59D] rounded-md text-white text-lg  mt-[15rem]'
          onClick={handleSetGoal}
        >Set Goal</button>
      </div>

      <BottomNav />
    </div>
  );
}

export default Addtask;
