import CardTrainer from "@/components/CardTrainer";
import CardUser from "@/components/CardUser";

export type Trainers = {
  id : string
  name: string;
  username: string;
  email: string;
  password: string;
  age: string;
  weight: string;
  height: string;
  specialist: string;
  phone_number: string;
  bio: string;
  profile_picture: string;
  role: string
};

export type Users = {
  id: string
  name: string;
  username: string;
  email: string;
  password: string;
  age: string;
  weight: string;
  height: string;
  bodyType: string;

};

export default async function Home() {
  const res = await fetch("http://localhost:4000/trainer");
  const data: Trainers[] = await res.json();
  // console.log(data, "<><>DATA<><>");

  const response = await fetch("http://localhost:4000/user");
  const datas: Users[] = await response.json()
  // console.log(datas, '<><>USERS<><>')

  return (
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
        <hr className="mt-5 mb-5"></hr>
        <h1 className="text-2xl font-bold mb-2">User</h1>
        <div className="flex flex-wrap gap-4 justify-center">
          {datas.map((el: Users, id: number) => (
            <CardUser el={el} key={id} />
          ))}
        </div>
      </main>
      </div>
    </div>
  
  );
}
