const chatroomModel = require('../models/chatroomModel');
const chatroomController = require('../controllers/chatroomController');
const { getUserByPhoneNumber } = require('../models/userModel');

const createChatroomService = (name, userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const chatroom = await chatroomModel.getChatroomByName(name);
      const user = await getUserByPhoneNumber(userData.phoneNumber);
      const userId = user.id;
      let chatroomId;

      if (chatroom) {
        chatroomId = await chatroomController.joinChatRoom(chatroom.id, userId);
        console.log("service",chatroomId)
      } else {
        chatroomId = await chatroomController.createChatRoom(name, userId);
        console.log("service",chatroomId)
      }

      resolve(chatroomId); // Resolve the Promise with the chatroomId
    } catch (error) {
      console.error('Failed to create chatroom:', error);
      reject(new Error('Failed to create chatroom')); // Reject the Promise with an error if there's an issue
    }
  });
};

module.exports = {
  createChatroomService,
};
