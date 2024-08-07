const { OpenAI } = require("openai");
require("dotenv").config();

module.exports = async function OpenAi() {
  const openai = new OpenAI({
    apiKey: process.env.Open_AI_Key,
  });
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "Buatkan saya jadwal latihan gym untuk 1 hari" }],
    model: "gpt-4o-mini",
  });
//   console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content
};
