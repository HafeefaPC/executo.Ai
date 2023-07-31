const connection = require('../../config/dbConfig');
const userModel = require('./userModel')

// Function to get all messages
async function getAllMessages(roomId) {
  try {
    const room = await getChatroomByName(roomId);
    const idRoom = room.id;

    return new Promise((resolve, reject) => {
      // Perform the necessary database query to retrieve messages for the specific roomId
      const query = 'SELECT * FROM groupchat WHERE room_id = ?';
      connection.promise()
        .query(query, [idRoom])
        .then(([rows]) => {
          const messages = rows;
          console.log('Messages for Room ID', idRoom, ':', messages);
          resolve(messages);
        })
        .catch((error) => {
          reject(error);
        });
    });
  } catch (error) {
    console.error('Error while fetching room ID:', error);
    throw error;
  }
}


// Function to get a chatroom by name
function getChatroomByName(name) {
  return new Promise((resolve, reject) => {
    // Perform the necessary database query to get a chatroom by name
    const query = 'SELECT * FROM chatroom WHERE name = ?';
    connection.promise().query(query, [name])
      .then(([rows]) => {
        const chatroom = rows.length ? rows[0] : null;
        console.log()
        resolve(chatroom);
      })
      .catch((error) => {
        console.error('Failed to fetch chatroom:', error);
        reject(new Error('Failed to fetch chatroom'));
      });
  });
}

// Function to insert a new message into the database
function insertMessage(userId,message,idRoom) {
  return new Promise((resolve, reject) => {
    // Perform the necessary database query to insert a new message
    const query = 'INSERT INTO groupchat (sender_id, message,chatroom_id, message_sent) VALUES (?, ?,?, NOW())';
    connection.promise().query(query, [userId, message,idRoom])
      .then(([result]) => {
        const newMessage = {
          id: result.insertId,
          userId,
          message,
          timestamp: new Date().toISOString(),
        };
        console.log(newMessage); // Print the new message (optional)
        resolve(newMessage);
      })
      .catch((error) => {
        reject(error);
      });
  });
}


const exitChatroomModel = (chatroomName, phoneNumber) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await userModel.getUserByPhoneNumber(phoneNumber);
      console.log("user",user)
      const userId = user.id;
      console.log("chatroomname",chatroomName)
      const room = await getChatroomByName(chatroomName);
      console.log(room)
      const roomId = room.id;

      const deleteQuery = 'DELETE FROM chatroom_users WHERE chatroom_id = ? AND user_id = ?';
      await connection.promise().query(deleteQuery, [roomId, userId]);

      resolve(); // Resolve the Promise if the operation is successful
    } catch (error) {
      reject(error); // Reject the Promise with an error if there's an issue
    }
  });
};


module.exports = {
  getAllMessages,
  insertMessage,
  getChatroomByName,
  exitChatroomModel,
};