const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function callOpenAI(goal, day) {
  try {
    const prompt = `i'm tryin to do ${goal} in ${day} days  give me the whole plan for ${day} days with each day containing 3 tasks , it should be in a json format. Give me the stringified json output without any explanation
    I'm repeating again, I don't need any explanation,it should be in the stringifed json format`

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 2048,
      temperature: 0,
      // stream: true
    });

    const output = response.data.choices[0].text.trim()
    return output;
  } catch (error) {
    console.error('Error in calling OpenAI API:', error.message);
    throw new Error('Failed to call OpenAI API');
  }
}

// openAIServices.js

// ...

async function retrieveGoalsDataMiddleware(req, res, next) {
  try {
    const goalsData = await retrieveGoalsData(phoneNumber);

    res.json(goalsData);
  } catch (error) {
    console.error('Error retrieving goals data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Function to retrieve data from the "goals" table based on phone number
async function retrieveGoalsData(phoneNumber) {
  try {
    // Query to retrieve data from the "goals" table based on phone number
    const query = 'SELECT * FROM goals WHERE phonenumber = $1;';
    const values = [phoneNumber];

    // Execute the query with the provided phone number as a parameter
    const result = await client.query(query, values);
    // Return the retrieved data
    return result.rows;
  } catch (error) {
    // Handle any errors that occurred during the data retrieval process
    console.error('Error retrieving goals data:', error);
    throw error;
  }
}

// ...



module.exports = {
  callOpenAI,
  retrieveGoalsDataMiddleware
};
