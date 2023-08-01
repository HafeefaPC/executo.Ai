import React from 'react';
import { MdVerified } from 'react-icons/md';
import tasks1 from '../../assets/tasks1.png';

function Taskbox({ goalName, completed, userId, day }) {
  console.log("duratttttttion", completed, day);
  const isCompleted = day <= completed;

  return (
    <div className='flex flex-row'>
      <img src={tasks1} alt="tasks1" className='ml-2 mt-2' />
      <div
        className={` ${
          isCompleted ? 'bg-green-900 bg-opacity-80 w-[168px] h-[138px] !mt-2 flex items-center flex-col gap-3' : 'bg-gray-500 bg-opacity-50 w-[168px] h-[69px] mt-[5rem]'
        } mt-[5rem] ml-[-10.5rem] rounded-3xl text-white`}
      >
        <h6 className='ml-2 mt-2 font-semibold text-base whitespace-normal overflow-hidden text-overflow-ellipsis'>
        </h6>
        {goalName} {isCompleted && <MdVerified className='' size={30} />}
        {isCompleted ? (
          <p className='text-xs  mt-1 font-semibold text-white'>Goal Completed!</p>
        ) : (
          <p className='text-xs ml-2 mt-1 font-semibold'>{`Days Completed: ${completed}`}</p>
        )}
        {/* You can use other goal variables as needed */}
      </div>
    </div>
  );
}

export default Taskbox;
