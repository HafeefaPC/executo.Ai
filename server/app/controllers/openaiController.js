const { callOpenAI } = require('../services/openaiService');
const connection = require('../../config/dbConfig');
const { getUserByPhoneNumber } = require('../models/userModel');

// async function saveTaskInDatabase(task, goalID, day) {
//   return new Promise((resolve, reject) => {
//     console.log("task nte goalID",goalID)
//     const sql = 'INSERT INTO tasks (task_name, goal_id, day) VALUES (?, ?, ?)';
//     const values = [task, goalID, day];

//     connection.query(sql, values, (error, results) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(results.insertId);
//       }
//     });
//   });
// }

async function saveTaskInDatabase(task, goalID, day) {
  return new Promise((resolve, reject) => {
    // Convert the day format from "dayX" to X (e.g., "day1" to 1)
    const dayNumber = parseInt(day.replace('Day', ''), 10);
    console.log(dayNumber)

    const insertTaskSQL = `INSERT INTO tasks (taskname, goal_id, day) VALUES (?, ?, ?)`;
    const values = [task, goalID, dayNumber];

    // Insert the task into the corresponding table
    connection.query(insertTaskSQL, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.insertId);
      }
    });
  });
}



async function createGoalInDatabase(goal, day, userId) {
  return new Promise((resolve, reject) => {
    const selectSql = 'SELECT id FROM goals WHERE goal_name = ? AND user_id = ?'
    const selectValues = [goal,userId]

    connection.query(selectSql, selectValues, (selectError, selectResults) => {
      if (selectError) {
        reject(selectError);
      } else {
        if (selectResults.length > 0) {
          // Goal already exists in the database, return the existing goal ID
          resolve(selectResults[0].id);
        } else {
          // Goal doesn't exist, insert it into the database
          const insertSql = 'INSERT INTO goals (goal_name, duration, start_date,user_id) VALUES (?, ?, ?,?)';
          const insertValues = [goal, day, new Date(), userId];

          connection.query(insertSql, insertValues, (insertError, insertResults) => {
            if (insertError) {
              reject(insertError);
            } else {
              resolve(insertResults.insertId);
              console.log("goal added")
            }
          });
        }
      }
    });
  });
}

async function generateOpenAIResponse(req, res) {
  try {
    const { goal, day, phn } = req.body;
    const user = await getUserByPhoneNumber(phn);
    const userId = user.id;
    let goalID;
    // Call the OpenAI service function
    const response = await callOpenAI(goal, day);
    //     goal && day && createGoalInDatabase(goal,day)
    //     const selectSql = 'SELECT id FROM goals WHERE goal_name = ?';
    // const selectValues = [goal];
    // connection.query(selectSql, selectValues, (selectError, selectResults) => {
    //   if (selectError) {
    //     reject(selectError);
    //   } else {
    //     if (selectResults.length > 0) {
    //       // Goal exists in the database, retrieve the goal ID
    //       goalID = selectResults[0].id;
    //       console.log("goalid",goalID)
    //     }
    //     // resolve(goalID);
    //   }
    // });
    if (goal && day) {
      goalID = await createGoalInDatabase(goal, day, userId); // Store the goal ID in the goalID variable
    }

    // Log the OpenAI response 
    console.log('OpenAI Response:', response);
    const json = '{"Day1":["Task1: Research the materials and tools needed to make a bulb","Task2: Gather the materials and tools needed to make a bulb","Task3: Read up on the steps to make a bulb"],"Day2":["Task1: Practice the steps to make a bulb","Task2: Make a prototype of the bulb","Task3: Test the prototype of the bulb"],"Day3":["Task1: Make adjustments to the prototype of the bulb","Task2: Make a final version of the bulb","Task3: Test the final version of the bulb"],"Day4":["Task1: Make any necessary adjustments to the final version of the bulb","Task2: Package the bulb for sale","Task3: Market the bulb"],"Day5":["Task1: Prepare documentation for the bulb","Task2: Create user manuals","Task3: Launch and promote the bulb"]}'
    const json2 = '{"Day1": ["Task1: Research the materials and tools needed to make a bulb", "Task2: Gather the materials and tools needed to make a bulb", "Task3: Read up on the steps to make a bulb"], "Day2": ["Task1: Practice the steps to make a bulb", "Task2: Make a prototype of the bulb", "Task3: Test the prototype of the bulb"], "Day3": ["Task1: Make adjustments to the prototype of the bulb", "Task2: Make a final version of the bulb", "Task3: Test the final version of the bulb"], "Day4": ["Task1: Make any necessary adjustments to the final version of the bulb", "Task2: Package the bulb", "Task3: Test the packaged bulb"]}'
    const data = JSON.parse(response)
    console.log(data)
    // // Store the learning plan in the database
    // const goalId = await createGoalInDatabase(goal, day);
    // // console.log(response[0])

    for (const day in data) {
      // Access the tasks for the current day
      const tasks = data[day];
      console.log(day);
      // console.log(`Day: ${day}`);
      // Iterate over each task in the tasks array for the current day
      tasks.forEach((task, index) => {
        console.log("goalIDnte foreach", goalID)
        tasks && saveTaskInDatabase(task, goalID, day)
        console.log(`${task}`)
      });
    }
    // for (let i = 0; i < data.length; i++) {

    // const tasks = data; // Get the tasks for the current day
    // console.log(tasks)
    // console.log('Day:', i + 1);
    // console.log('Tasks:', tasks.join(', '));

    // const taskDay = i + 1;
    // for (let j = 0; j < tasks.length; j++) {
    //   const task = tasks[j];
    //   await saveTaskInDatabase(task, goalId, taskDay);
    // }
    // }

    // Send the success response to the client
    res.send('Learning plan stored successfully');
  } catch (error) {
    console.error('Error in generating OpenAI response:', error);
    res.status(500).send('Error in generating OpenAI response');
  }
}

module.exports = {
  generateOpenAIResponse,
};
