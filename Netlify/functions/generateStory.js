const axios = require('axios');

exports.handler = async function(event) {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed'
        };
    }

    try {
        // Parse the JSON body from the request
        const { prompt, max_tokens } = JSON.parse(event.body);

        // Make a request to the OpenAI API
        const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
            prompt: prompt,
            max_tokens: max_tokens
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Return the response from OpenAI API
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Adjust this for security in production
                "Access-Control-Allow-Headers": "Content-Type"
            },
            body: JSON.stringify(response.data.choices[0].text.trim())
        };
    } catch (error) {
        // Handle any errors
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};

