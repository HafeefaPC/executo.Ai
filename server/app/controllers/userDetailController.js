const userModel = require('../models/userModel');

async function saveUserDetails(req, res) {
  try {
    const { name, email ,phoneNumber} = req.body;
    console.log(phoneNumber)

    // Insert the user details into the database
    const userId = await userModel.updateUserDetails(name, email,phoneNumber);

    console.log(`User details saved for User ID: ${userId}`);
    res.status(200).json({ message: 'User details saved' });
  } catch (error) {
    console.error('Error during saving user details:', error);
    res.status(500).json({ error: 'Internal server error' })
  }
}
async function readUserDetails(req,res){
  try {
    const phone_number = req.query.phoneNumber;
    const user = await userModel.getUserByPhoneNumber(phone_number);
    
    if (user) {
      res.json(user); // Send the user details as JSON response to the frontend
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Failed to fetch user details' });


  }
}

const deleteUser = async (req, res) => {
  try {
    const userId = req.query.id;
    console.log("useriddelete user",userId)
    // Call the deleteUserById function from the model
    const deletedUser = await userModel.deleteUserById(userId);
    if (deletedUser) {
      return res.status(200).json({ message: 'User deleted successfully' });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateAbout = (req, res) => {
  const { id, about } = req.body;

  // Call the userModel function to update the 'about' field
  userModel.updateUserAbout(id, about, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error updating user about' });
    }
    res.json({ message: 'User about updated successfully' });
  });
};



module.exports = {
  saveUserDetails,
  readUserDetails,
  deleteUser,
  updateAbout
};
