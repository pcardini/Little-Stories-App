const axios = require('axios');

exports.handler = async function(event) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed'
        };
    }

    const { prompt, max_tokens } = JSON.parse(event.body);
    const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
        prompt: prompt,
        max_tokens: max_tokens
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
    });

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*", // Adjust accordingly for security
            "Access-Control-Allow-Headers": "Content-Type"
        },
        body: JSON.stringify(response.data.choices[0].text.trim())
    };
};
