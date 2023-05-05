const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();

require("dotenv").config();

const configuration = new Configuration({
    apiKey: process.env.SECRET_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get("/get", (req, res) => {
    res.send("hello");
});

app.post("/", async (req, res) => {
    try {
        const { message } = req.body;
       
        if (!message) {
            throw new Error("Missing parameter");
        }
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${message}`,
            maxTokens: 100,
            temperature: 0,
        });
       
        if (response.data.choices[0].text) {
            res.json({
                message: response.data.choices[0].text,
            });
        }
    } catch (error) {
        console.log(error);
        
    }
});

const port = process.env.PORT ;

app.listen(port, () => console.log(`Server listening on port ${port}`));
