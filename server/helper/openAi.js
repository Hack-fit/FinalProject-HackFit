const { OpenAI } = require("openai");
require("dotenv").config();

module.exports = async function OpenAi({level,workoutFrequency,goal,equipment}) { 
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Buatkan saya jadwal latihan gym untuk ${level} dalam ${workoutFrequency} kali seminggu selang seling dengan tujuan untuk ${goal} menggunakan ${equipment} dalam bentuk list JSON[{
      "day" : "",
      "Jenis_Latihan" : "",
      "Rincian_Latihan" : [{
        "Jenis_Latihan" : "",
        "rep": ,
        "set": ,
        "tipe" : "ambil jenis latihan salah satu dari array of objek terkait yang sudah di siapkan disini ambil hanya data nama pada objeknya saja [{"nama":"push up" ,"link":"https://www.youtube.com/embed/fMKBfvsltAQ?si=alACiTFQ0YYkQv72"},{"nama":"pull up","link":" https://www.youtube.com/embed/KvsQyhp3y68?si=Ik4i3l0ULIxbtkTm"},{"nama":"bench press","link":"https://www.youtube.com/embed/DUY22QAOdOU?si=g25OZP9zK3f1D3jQ"},{"nama":"barbel squat","link":"https://www.youtube.com/embed/gLj_OlQjHBI?si=DTXDPilRXZKM4eKY"},{"nama":"leg press","link":"https://www.youtube.com/embed/TKhrxoOjS3s?si=64QQe5RoSDKDh2Cx"},{"nama":"plank","link":"https://www.youtube.com/embed/8MvNDLdRgZI?si=IYS1SWOHNRjNym6l"},{"nama":"lunges","link":"https://www.youtube.com/embed/xgJl9zTEIPw?si=2yRESfx51bUs-Nyx"}] dan jika tidak ada yang terkait kosongkan saja",
        "link": "isi dengan link yang ada pada objek diatas sesuai dengan namanya"
      }]
    }] dan tolong hapus tag pembuka dan penutup untuk data JSONnya`,
      },
    ],
    model: "gpt-4o-mini",
  });
  //   console.log(completion.choices[0].message.content);

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
  // console.log(completion.choices[0].message.content);

  return completion.choices[0].message.content;
};
