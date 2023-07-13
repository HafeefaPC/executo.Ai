import React, { useState,useContext } from 'react';
import bg from '../../assets/bg.png';
import logo from '../../assets/logo.png';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import google from '../../assets/google.png';
import facebook from '../../assets/fb.png';
import twitter from '../../assets/twitter.png';
import { Link } from 'react-router-dom';
import Otp from '../../pages/Otp/Otp';
import { AuthContext } from '../../context/Authcontext';

function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isloggedin, setIsloggedin] = useState(true);
  const { login } = useContext(AuthContext);
  const handleLoginchange =()=>{
    setIsloggedin(!isloggedin)
  }
  const handleInputChange = (value) => {
    if (value && value.length >= 13) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    setPhoneNumber(value);
  };

  const handleSubmit = () => {
    setIsloggedin(!isloggedin);
    const userData = {
      phoneNumber: phoneNumber,
    }
    
    login(userData)
    // Send a POST request to your backend endpoint '/login' with the phone number
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('OTP sent successfully');
          // Handle successful OTP sent response, such as showing a success message
        } else {
          console.error('Failed to send OTP');
          // Handle failed OTP sent response, such as showing an error message
        }
      })
      .catch((error) => {
        console.error('Error sending OTP:', error);
        // Handle the error case, such as showing an error message
      });
  };

  return (
    <div>
      {isloggedin ? (
        <div className="flex justify-center items-center flex-col">
          <div className="relative">
            <img src={bg} alt="background" />
            <img src={logo} alt="logo" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="relative h-screen/2 w-screen bg-white flex flex-col justify-center items-center">
            <h1 className="font-bold text-2xl text-teal-500 m-5">Login or signup</h1>
            <p>Enter your mobile number to get otp</p>
            <PhoneInput
              defaultCountry="IN"
              value={phoneNumber}
              onChange={handleInputChange}
              className="w-[330px] h-[52px] bg-gray-100 shadow-inner rounded-xl m-10 "
              placeholder="Enter your number"
            />
            <button
              className={`h-[52px] w-[335px] rounded-lg font-bold font-inter ${
                isDisabled ? 'bg-teal-500 opacity-50 cursor-not-allowed text-white' : 'bg-teal-500  text-white'
              }`}
              disabled={isDisabled}
              onClick={handleSubmit}
            >
              Get OTP
            </button>
            <p className="mt-5">or</p>
            <div className="flex flex-row gap-10 mt-3">
              <img src={google} alt="Google" />
              <img src={facebook} alt="Facebook" />
              <img src={twitter} alt="Twitter" />
            </div>
          </div>
        </div>
      ) : (
        <Otp handleLoginchange={handleLoginchange} phoneNumber={phoneNumber}/>
      )}
    </div>
  );
}

export default Login;
