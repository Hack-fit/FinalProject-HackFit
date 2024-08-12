const { OpenAI } = require("openai");
require("dotenv").config();

module.exports = async function OpenAi() {
  const openai = new OpenAI({
    apiKey: process.env.Open_AI_Key,
  });
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: `Buatkan saya jadwal latihan gym untuk 3 hari dalam seminggu selang seling dalam bentuk list JSON[{
      "Hari" : ""
      "Jenis Latihan" : ""
      "Rincian Latihan" : ""
      "Durasi Rincian Latihan" : ""
      "Total Durasi Latihan" : ""
      }] dan tolong hapus tag pembuka dan penutup untuk data JSONnya` }],
    model: "gpt-4o-mini",
  });
//   console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content
};
