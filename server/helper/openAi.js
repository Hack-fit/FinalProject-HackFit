const { OpenAI } = require("openai");
require("dotenv").config();

module.exports = async function OpenAi() {
  const openai = new OpenAI({
    apiKey: process.env.Open_AI_Key,
  });
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: `Buatkan saya jadwal latihan gym untuk pemula, selama 3 hari dalam seminggu selang seling dengan alat yang dipakai{Leg Press, Cable Machine, Lat Pulldown Machine,Pec Deck Machine, Smith, Machine, Rowing Machine, Dumbell} dalam bentuk list JSON[{
      "Hari" : ""
      "Jenis Latihan" : "",
      "Rincian Latihan" : [{
      "Jenis Latihan" : "",
      "rep": ,
      "set": ,
      "tipe" : "ambil jenis latihan salah satu dari objek terkait yang sudah di siapkan disini {"push up", "pull up", "bench press", "squat", "leg press", "plank", "Lunges"} dan jika tidak ada yang terkait kosongkan saja"
      }]
      }] 
      dan tolong hapus tag pembuka dan penutup untuk data JSONnya` }],
    model: "gpt-4o-mini",
  });
//   console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content
};
