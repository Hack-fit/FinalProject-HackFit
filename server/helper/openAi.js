const { OpenAI } = require("openai");
require("dotenv").config();

module.exports = async function OpenAi(data) {
  const { level, workoutFrequency, goal, equipment } = data;

  const openai = new OpenAI({
    apiKey: process.env.Open_AI_Key,
  });
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Buatkan saya jadwal latihan gym untuk ${level} dalam ${workoutFrequency} seminggu selang seling dengan tujuan untuk ${goal} menggunakan ${equipment} dalam bentuk list JSON[{
      "Hari" : ""
      "Jenis_Latihan" : "",
      "Rincian_Latihan" : [{
      "Jenis_Latihan" : "",
      "rep": ,
      "set": ,
       "tipe" : "ambil jenis latihan salah satu dari array of objek terkait yang sudah di siapkan disini ambil hanya data nama pada objeknya saja [{"nama":"push up" ,"link":"https://www.youtube.com/watch?v=fMKBfvsltAQ"},{"nama":"pull up","link":" https://www.youtube.com/watch?v=KvsQyhp3y68"},{"nama":"bench press","link":"  https://www.youtube.com/watch?v=DUY22QAOdOU"},{"nama":"barbel squat","link":" https://www.youtube.com/watch?v=gLj_OlQjHBI"},{"nama":"leg press","link":"  https://www.youtube.com/watch?v=TKhrxoOjS3s"},{"nama":"plank","link":" https://www.youtube.com/watch?v=8MvNDLdRgZI"},{"nama":"lunges","link":" https://www.youtube.com/watch?v=xgJl9zTEIPw"}] dan jika tidak ada yang terkait kosongkan saja",
"link": "isi dengan link yang ada pada objek diatas sesuai dengan namanya"
      }]
      }] 
      dan tolong hapus tag pembuka dan penutup untuk data JSONnya`,
      },
    ],
    model: "gpt-4o-mini",
  });

  const content = [
    { nama: "push up", link: "https://www.youtube.com/watch?v=fMKBfvsltAQ" },
    { nama: "pull up", link: " https://www.youtube.com/watch?v=KvsQyhp3y68" },
    {
      nama: "bench press",
      link: "  https://www.youtube.com/watch?v=DUY22QAOdOU",
    },
    {
      nama: "barbel squat",
      link: " https://www.youtube.com/watch?v=gLj_OlQjHBI",
    },
    {
      nama: "leg press",
      link: "  https://www.youtube.com/watch?v=TKhrxoOjS3s",
    },
    { nama: "plank", link: " https://www.youtube.com/watch?v=8MvNDLdRgZI" },
    { nama: "lunges", link: " https://www.youtube.com/watch?v=xgJl9zTEIPw" },
  ];
  console.log(completion.choices[0].message.content);

  return completion.choices[0].message.content;
};
