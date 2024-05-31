const express = require("express");
const app = express();
const port = 8000;
const { OpenAI } = require("openai");
const cors = require("cors");
const bodyParser = require("body-parser");

let corsOptions = {
  origin: "*",
  credential: true,
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/ai", async (req, res) => {
  try {
    const { message } = req.body;
    console.log(message, "reqmessage");

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-3.5-turbo",
    });

    // response to client
    res.send(completion.choices[0].message.content);
  } catch (error) {
    // error
    console.error("Error:", error);
    res.status(500).send("An error occurred.");
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
