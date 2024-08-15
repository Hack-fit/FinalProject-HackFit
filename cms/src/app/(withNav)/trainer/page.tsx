import CardTrainer from "@/components/CardTrainer";
import { Trainers } from "../page";
import CardUser from "@/components/CardUser";

const UserPage = async () => {
  const link: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(link + `/api/trainer`);
  const data: { data: Trainers[] } = await res.json();
  // console.log(data, "<><>DATA<><>");
  return (
    <>
      <div className="flex justify-center">
        <div className="w-11/12">
          <h1 className="text-2xl font-bold mb-4 mt-2 text-center">Trainer</h1>
          <hr className="mb-5"></hr>
          {/* <h1 className="text-2xl font-bold mb-2">Trainer</h1> */}
          <main className="flex flex-col justify-start space-x-4">
            <div className="flex flex-wrap gap-4 justify-center">
              {data.data.map((el: Trainers, id: number) => (
                <CardTrainer el={el} key={id} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default UserPage;
