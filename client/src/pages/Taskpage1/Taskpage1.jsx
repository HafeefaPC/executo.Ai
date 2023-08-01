
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pic from '../../assets/pic.png';
import { useParams, useLocation,useNavigate   } from 'react-router-dom';
import Topnav from '../../components/Topnav/Topnav';
import BottomNav from '../../components/BottomNav/BottomNav';
import ProgressBar from "@ramonak/react-progress-bar";
import './Taskpage1.css'


function Taskpage1() {
    const [total, setTotal] = useState(0);
    const [tasks, setTasks] = useState([]);
    // const [allchecked,setAllChecked]= useState(0)

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    const checkboxValue = parseInt(event.target.value);
    if (isChecked) {
      setTotal((prevTotal) => prevTotal + checkboxValue);
      // setAllChecked(allchecked+1)
    } else {
      setTotal((prevTotal) => prevTotal - checkboxValue);
      // setAllChecked(allchecked-1)
    }
  };
    const { id } = useParams();
    const { goalId } = useParams(); 
    const location = useLocation();
    const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search);
  const goalData = JSON.parse(searchParams.get('goal'));

const handleSubmit = () => {
  // Assuming 'tasks' is an array of objects retrieved from somewhere.
  if (tasks.length > 0) {
    const goalId = tasks[0].goal_id;
    const day = parseInt(tasks[0].day); // Convert day to a number and then increment
    console.log("day",day)

    // Data to be sent in the request body
    const requestData = {
      goalId: goalId,
      day:day,
    };

    // Send the 'requestData' to the backend using an HTTP POST request
    axios.put('http://localhost:3000/goalday', requestData)
      .then((response) => {
        // Handle the response from the backend here
        console.log('Response from the backend:', response.data);
        // If you want to navigate to '/taskpage3' after a successful response, you can do it here.
        response.data && navigate('/taskpage3');
      })
      .catch((error) => {
        // Handle any errors that occurred during the request.
        console.error('Error:', error);
      });
  }
};

    // console.log()
    // console.log("goaldataaa",goalData)
    useEffect(() => {
      // Make a GET request to fetch tasks using the goalId
      axios
        .get(`http://localhost:3000/tasks`, {
          params: {
            goalId: goalData.id,
            day: goalData.days_completed+1,
          }
        })
        .then((response) => {
          const tasksData = response.data; // Assuming response.data contains the tasks data
          // Update your component state or do further processing with tasksData
          setTasks(tasksData.tasks);
        })
        .catch((error) => {
          console.error(error);
          // Handle errors if needed
        });
    }, [goalData.days_completed]);
    console.log(tasks)

    return (
        <div className='bg-[#F3F3F3] h-full '>
            <Topnav />
            <div className='overflow-y-auto'>
            <div>
                <div className='flex flex-row mt-[1.5rem]'>
                    <h3 className='text-[#1F695D] text-xl font-semibold ml-3 mt-1 '>Progress</h3>
                    <h3 className='text-[#1F695D] text-xl ml-auto mr-5 font-semibold'>Day {goalData?.days_completed+1}</h3>
                </div>
                <img src={pic} alt='pic' className='w-[150px] h-[150px] ml-[120px] mt-[1.5rem]' />
                <ProgressBar
                    completed={total}
                    className="mt-4 w-[335px] h-[52px] ml-5"
                    height="22px"

                    borderRadius="10px"
                    baseBgColor="#D9D9D9"
                    bgColor="#43C59D" />
                {/* <h5 className='text-[#237E62] text-sm  ml-[6rem] mt-[6px] font-bold'>Skipped a day ? Reschedule</h5> */}

            </div>
            <div className='mt-[30px]'>
                <h3 className='text-[#1F695D] font-bold text-3xl justify-start ml-[2.3rem] mt-[rem]'>Goal : {goalData?goalData.goal_name : ''}</h3>
                <br/>
                <ul className="list-disc pl-8 space-y-3 ml-[20px]">
                {tasks.map((task) => (
                  <li key={task.id} className='flex flex-row'>
                    <label htmlFor={`item${task.id}`} className='text-[#5B5858] text-lg w-[250px] font-medium'>{task.taskname}</label>
                    <input
                      type="checkbox"
                      id={`item${task.id}`}
                      className='ml-[1rem] w-[24px] h-[24px] checkbox-green'
                      onChange={handleCheckboxChange}
                      value='33'
                    />
                  </li>
                ))}
              </ul>
              <button
              className={`absolute left-[7.44%] right-[6.67%]   text-white ${
                total <= 99 ? 'bg-[#43C59D]' : 'bg-[#C5F0CC]'
              } rounded-2xl font-medium text-lg leading-6 w-[335px] h-[52px] mt-[40px] !mb-[2rem]`}
              onClick={handleSubmit}
              disabled={total <= 98}
            >
              Submit
            </button> 
            <div className='mb-[2rem] mt-[10rem]'>....</div>
            </div>
            </div>
            <BottomNav />
        </div>
    )
}
export default Taskpage1;