const userModel = require('../models/userModel');
const otpService = require('../services/otpService');

async function login(req, res) {
  try {
    const phoneNumber = req.body.phoneNumber;
    const otp = otpService.generateOTP();
    console.log(otp)
    let userId;

    const user = await userModel.getUserByPhoneNumber(phoneNumber);
    console.log(user)
    if (!user) {
      userId = await userModel.insertUser(phoneNumber);
    } else {
      userId = user.id;
    }

    await otpService.insertOTP(userId, otp);
    await otpService.sendOTPviaSMS(phoneNumber, otp);

    console.log(`OTP sent to ${phoneNumber}`);
    res.send('OTP sent');
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal server error');
  }
}

async function verify(req, res) {
  try {
    const phoneNumber = req.body.phoneNumber;
    const otp = req.body.otp;
    console.log(`The otp is ${otp} and ${phoneNumber}`);

    const isOTPVerified = await otpService.verifyOTP(phoneNumber, otp);
    if (isOTPVerified) {
      console.log(`OTP verified for ${phoneNumber}`);
      res.send('OTP verified');
    } else {
      console.log(`Invalid OTP for ${phoneNumber}: ${otp}`);
      res.status(400).send('Invalid OTP');
    }
  } catch (error) {
    console.error('Error during OTP verification:', error);
    res.status(500).send('Internal server error');
  }
}

module.exports = {
  login,
  verify
};
