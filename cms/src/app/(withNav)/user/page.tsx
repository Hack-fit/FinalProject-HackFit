import CardTrainer from "@/components/CardTrainer";
import { Trainers, Users } from "../page";
import CardUser from "@/components/CardUser";

const UserPage = async () => {
  const link: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;

  const response = await fetch(link + `/api/user`);
  const datas: { data: Users[] } = await response.json();
  // console.log(data, "<><>DATA<><>");
  return (
    <>
      <div className="flex justify-center">
        <div className="w-11/12">
          <h1 className="text-2xl font-bold mb-4 mt-2 text-center">User</h1>
          <hr className="mb-5"></hr>

          {/* <h1 className="text-2xl font-bold mb-2">Trainer</h1> */}
          <main className="flex flex-col justify-start space-x-4">
            <div className="flex flex-wrap gap-4 justify-center">
              {datas.data.map((el: Users, id: number) => (
                <CardUser el={el} key={id} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default UserPage;
