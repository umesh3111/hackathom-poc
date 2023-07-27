import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import 'dotenv/config'

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
console.log("API KEYY", process.env.OPENAI_API_KEY);

const configuration = new Configuration({
  organization: "org-PXxCXCg44SPydQOMOferSz8Q",
  apiKey: process.env.OPENAI_API_KEY,
});
const openAi = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/prompt", async (req, res) => {
  console.log(req.body);
  const response = await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: req.body.prompt_data }],
  });
  console.log(response.data);
  res.json(response.data.choices);
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
