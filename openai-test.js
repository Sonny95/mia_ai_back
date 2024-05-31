const { OpenAI } = require("openai");
const fs = require("fs");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  try {
    //1. call assistatt
    const myAssistant = await openai.beta.assistants.retrieve("asst_BSI3fuMB2jpvN8VuByUg7W9I");
    console.log(myAssistant.id, "id");
    console.log(myAssistant.id, "idid");
    // 2. Create New Thread
    const thread = await openai.beta.threads.create({ assistant_id: myAssistant.id.id });

    // 3. Create Message
    const message = await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: "Who's Mia",
    });
    const messages = await openai.beta.threads.messages.list(thread.id);
    // console.log(message, "mesageeeee");
    // console.log(messages, "mesageeeee");
    const run = await openai.beta.threads.runs.create(thread.id, { assistant_id: myAssistant.id });

    console.log(run);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
