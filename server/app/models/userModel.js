const connection = require('../../config/dbConfig');

function getUserByPhoneNumber(phoneNumber) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE phone_number = ?';
    connection.query(query, [phoneNumber], (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.length > 0) {
          resolve(results[0]);
        } else {
          resolve(null);
        }
      }
    });
  });
}

const deleteUserById = (userId) => {
  return new Promise((resolve, reject) => {
    const deleteQuery = 'DELETE FROM users WHERE id = ?';
    connection.query(deleteQuery, [userId], (error, result) => {
      if (error) {
        console.error('Error deleting user:', error);
        reject(error);
      } else {
        resolve(result.affectedRows > 0);
      }
    });
  });
};


function insertUser(phoneNumber) {
  return new Promise((resolve, reject) => {
    const userQuery = 'INSERT INTO users (phone_number) VALUES (?)';
    connection.query(userQuery, [phoneNumber], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.insertId);
      }
    });
  });
}

function updateUserDetails(name, email, phoneNumber) {
  return new Promise((resolve, reject) => {
    const userQuery = 'UPDATE users SET name = ?, email = ? WHERE phone_number = ?';
    connection.query(userQuery, [name, email, phoneNumber], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.affectedRows);
      }
    });
  });
}
const updateUserAbout = (userId, about) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE users SET about = ? WHERE id = ?';
    connection.query(sql, [about, userId], (err, result) => {
      if (err) {
        console.error('Error updating user about:', err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};




module.exports = {
  getUserByPhoneNumber,
  insertUser,
  updateUserDetails,
  deleteUserById,
  updateUserAbout
};
