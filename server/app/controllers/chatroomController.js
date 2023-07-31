const connection = require('../../config/dbConfig');
const userModel = require('../models/userModel');

const createChatRoom = async (name, userId) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO chatroom (name, created_by) VALUES (?, ?)';
    connection.promise()
      .query(query, [name, userId])
      .then((result) => {
        console.log(result);
        resolve(result.insertId);
      })
      .catch((error) => {
        console.error('Failed to create chatroom:', error);
        reject(new Error('Failed to create chatroom'));
      });
  });
};

const joinChatRoom = async (id, userId) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT IGNORE INTO chatroom_users (chatroom_id, user_id) VALUES (?, ?)';
    connection.promise()
      .query(query, [id, userId])
      .then((result) => {
        if (result.affectedRows > 0) {
          console.log(`User ${userId} joined chatroom ${id}`);
          resolve(true);
        } else {
          console.log(`User ${userId} is already a member of chatroom ${id}`);
          resolve(false);
        }
      })
      .catch((error) => {
        console.error('Failed to join chatroom:', error);
        reject(new Error('Failed to join chatroom'));
      });
  });
};

module.exports = {
  createChatRoom,
  joinChatRoom,
};
