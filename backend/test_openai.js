require('dotenv').config();
const { OpenAI } = require('openai');
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
client.models.list().then(() => console.log("Success")).catch(e => console.error("Error:", e.message));
