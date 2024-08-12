import CardTrainer from "@/components/CardTrainer"
import { Trainers } from "../page";




const TrainerPage = async () => {
    const res = await fetch("http://localhost:4000/trainer");
    const data: Trainers[] = await res.json();
    // console.log(data, "<><>DATA<><>");
  return (
   <>
    <div className="items-start h-screen">
      <div className="form-control mr-10 flex justify-center">
      <input type="text" placeholder="Search" className="input input-bordered w-1 md:w-auto" />

      {/* <h1 className="text-2xl font-bold mb-2">Trainer</h1> */}
      <main className="flex flex-col justify-start space-x-4">
      <h1 className="text-2xl font-bold mt-4">Trainer</h1>
        <div className="flex flex-wrap gap-4 justify-center mb-5 mt-5">
          {data.map((el: Trainers, id: number) => (
            <CardTrainer el={el} key={id} />
          ))}
        </div>
      </main>
      </div>
    </div>
   </>
  )
}

export default TrainerPage