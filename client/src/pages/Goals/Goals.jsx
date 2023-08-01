import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Taskbox from '../../components/Taskbox/Taskbox';
import BottomNav from '../../components/BottomNav/BottomNav';
import Topnav from '../../components/Topnav/Topnav';
import { Link } from 'react-router-dom'

function Goals() {

  const [goals, setGoals] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const phn = userData.phoneNumber
    // console.log(phn)
    if (phn) {
      // Make a GET request to the backend API with the phone number as a query parameter
      axios
        .get('http://localhost:3000/goals', {
          params: {
            phoneNumber: phn
          }
        })
        .then((response) => {
          // setGoals(response.data)
          // console.log(goals)
          const goalD = response.data
          console.log(goalD.goals)
          setGoals(goalD.goals)
          // console.log(goalsData);
          // Handle the goals data from the response if needed
        })
        .catch((error) => {
          console.error(error);
          // Handle errors if needed
        });
    }
  }, []);
  console.log(goals)
  return (
    <div>
      <Topnav />
      <h2 className='font-bold text-green-800 text-2xl ml-5 mt-8'>Your Goals</h2>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {goals ? (
          goals.map((goal) => (
            <div key={goal.id}>
                <Link to={`/taskpage1/${goal.id}?goal=${JSON.stringify(goal)}`} className="link">
                  <Taskbox
                    goalName={goal.goal_name}
                    completed={goal.days_completed}
                    userId={goal.user_id}
                    day={goal.duration}
                    className="mt-4"
                  />
                </Link>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}

export default Goals
