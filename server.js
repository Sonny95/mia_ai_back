const express = require("express");
const app = express();
const port = 8000;
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-3.5-turbo",
    });

    // to client
    res.send(completion.choices[0]);
  } catch (error) {
    //error
    console.error("Error:", error);
    res.status(500).send("An error occurred.");
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
