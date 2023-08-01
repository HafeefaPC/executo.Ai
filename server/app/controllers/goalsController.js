// goalController.js

const goalModel = require('../models/goalModel');
const taskModel = require('../models/taskmodel');
const userModel = require('../models/userModel')

async function getGoalsByPhoneNumber(req, res) {
  try {
    const phoneNumber = req.query.phoneNumber;
    console.log(phoneNumber);

    // Retrieve the user based on the phone number from the database
    const user = await userModel.getUserByPhoneNumber(phoneNumber);
    console.log("user", user)

    if (user) {
      const userId = user.id;

      // Retrieve the goals from the database based on the user ID
      const goals = await goalModel.getGoalsByUserId(userId);

      if (goals.length > 0) {
        console.log(goals);

        // Handle the retrieved goals as needed
        res.status(200).json({ goals });
      } else {
        // No goals found for the given user ID
        console.log('No goals found');
        res.status(404).json({ error: 'Goals not found' });
      }
    } else {
      // No user found for the given phone number
      console.log('User not found');
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error during retrieving goals:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// New function to get tasks for a specific goal
async function getTasksForGoal(req, res) {
  try {
    const goalId = req.query.goalId;
    const currentDayOrder = req.query.day; // You can pass the current day order as a parameter
    console.log("goaldId", goalId)

    // Fetch tasks for the specific goal and day order
    const tasks = await taskModel.getTasksByGoalIdAndDayOrder(goalId, currentDayOrder);
    console.log("tasks", tasks)

    // Handle the retrieved tasks as needed
    res.status(200).json({ tasks });
  } catch (error) {
    console.error('Error during retrieving tasks for goal:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}



async function updateCompletedDaysForGoal(req, res) {
  try {
    const { goalId, day } = req.body// Assuming you are passing the goalId as a route parameter

    // Assuming you want to update the 'completed_days' field in the goal document in the database
    // Retrieve the current goal data from the database
    const goal = await goalModel.getGoalById(goalId);
    if (!goal) {
      // No goal found for the given goalId
      console.log('Goal not found');
      return res.status(404).json({ error: 'Goal not found' });
    }

    const currentDayOrder = day;
    // Save the updated goal document to the database
    const updatedGoal = await goalModel.updateGoal(goalId, 1);
    const tasks = await taskModel.getTasksByGoalIdAndDayOrder(goalId, currentDayOrder);

    // Check if tasks were found for the given goal and day
    if (tasks.length > 0) {
      // Update the completed field to true for each task of the current day
      for (const task of tasks) {
        task.completed = true;
      }

      // Save the updated tasks back to the database
      await Promise.all(tasks.map((task) => taskModel.updateTask(task)));
    } else {
      console.log('No tasks found for the given goal and day.');
    }

    console.log('Completed days and tasks updated successfully');

    res.status(200).json({ message: 'Completed days and tasks updated successfully' });
  } catch (error) {
    console.error('Error during updating completed days for goal:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getGoalsByPhoneNumber,
  getTasksForGoal,
  updateCompletedDaysForGoal, // Add the new function to the exported module
};