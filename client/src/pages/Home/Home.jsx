import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import BottomNav from '../../components/BottomNav/BottomNav';
import quote from '../../assets/quote.png';
import shade from '../../assets/shade.png';
import anim1 from '../../assets/anim1.png';
import anim2 from '../../assets/anim2.png';
import { AiFillPlusCircle } from "react-icons/ai";
import Topnav from '../../components/Topnav/Topnav';
import Taskbox from '../../components/Taskbox/Taskbox';

function Home() {

  const quotes = [
    "Set your goals high, and don't stop till you get there. - Bo Jackson",
    "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
    "The only way to achieve the impossible is to believe it is possible. - Charles Kingsleigh",
    "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. - Albert Schweitzer",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Obstacles are those frightful things you see when you take your eyes off your goal. - Henry Ford",
    "Success is not in what you have, but who you are. - Bo Bennett",
    "The secret of getting ahead is getting started. - Mark Twain",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "What you get by achieving your goals is not as important as what you become by achieving your goals. - Zig Ziglar",
  ];
  const [currentQuote, setCurrentQuote] = useState("What you get by achieving your goals is not as important as what you become by achieving your goals. - Zig Ziglar");

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentQuote((prevQuote) => (prevQuote + 1) % quotes.length);
    }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

    return () => clearTimeout(timer);
  }, [currentQuote]);

  return (
    <div>
      <div>
        <Topnav />
        <div className='mr-5 mt-5'>
          <b><h2 className='text-[#1F695D] text-2xl ml-4 '>Quote of the day</h2></b>
            <div  className="relative inline-block mt-5">
              <img src={shade} alt='shade' className='absolute ml-[1.2rem] w-[349px] h-full opacity-50' />
              <img src={quote} alt='quote' className='ml-[1.2rem] w-[349px]' />
              <p className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold">
                {currentQuote}
              </p>
            </div>
        </div>
        <div className='flex flex-row'>
          <b><h2 className='text-[#1F695D] text-2xl ml-4 mt-6'>Today your task</h2></b>
          <Link to="/goals">
            <p className='text-[blue] ml-[7rem] mt-[1.5rem]'>view All</p>
           
          </Link>
          </div>
        <div> <img src={anim1} alt='quote' className='ml-4 ' /></div>
       
        <div  className='flex flex-row'>
          <b><h2 className='text-[#1F695D] text-2xl ml-4 mt-6'>Find your community</h2></b>
          <Link to="/chatroom">
            <p className='text-[blue]  ml-[5rem] mt-[1.5rem]'>view </p>
           
          </Link>
        
          </div>
          <div>  <img src={anim2} alt='quote' className='ml-4' /></div>
     
      <Link to="/Addtask">
        <AiFillPlusCircle className='text-[#43C59D] text-6xl ml-auto mr-5 mt-[-60px]' />
      </Link>
      <BottomNav />
    </div>
    </div>
    
  )
}

export default Home