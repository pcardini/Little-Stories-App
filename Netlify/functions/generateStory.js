// Import the necessary libraries
const axios = require('axios');

// Your OpenAI API key
const apiKey = 'YOUR_OPENAI_API_KEY';

// OpenAI API endpoint
const apiEndpoint = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

// Define the serverless function
exports.handler = async (event, context) => {
  // Parse the request body
  const requestBody = JSON.parse(event.body);

  // Extract the prompt and type (e.g., 'happy' or 'dark')
  const { prompt, type } = requestBody;

  try {
    // Define the data for the OpenAI API request
    const data = {
      prompt: prompt,
      max_tokens: 200,
      temperature: type === 'happy' ? 0.5 : 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    };

    // Send a POST request to the OpenAI API
    const response = await axios.post(apiEndpoint, data, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    // Extract the generated story from the API response
    const generatedStory = response.data.choices[0].text.trim();

    // Return a JSON response with the generated story
    return {
      statusCode: 200,
      body: JSON.stringify({ story: generatedStory })
    };
  } catch (error) {
    // Handle any errors and return an error response
    console.error('Error generating story:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate story. Please try again.' })
    };
  }
};
