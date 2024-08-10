import { Users } from "@/app/(withNav)/page";
import DeleteButton from "./DelButton";

const CardUser = ({ el }: { el: Users }) => {
  return (
    <div className="card bg-base-100 w-80 shadow-xl rounded-lg overflow-hidden">
      <figure className="relative p-4">
        <img
          // src={el.profile_picture}
          alt={el.name}
          className="w-32 h-32 object-cover rounded-xl mx-auto"
        />
      </figure>
      <div className="card-body text-center p-4">
        <h2 className="card-title text-xl font-bold mb-2 text-center">{el.name}</h2>
        <p className="text-sm text-gray-600 mb-4">
          {el.age || "No description available."}
        </p>
        <div className="card-actions flex justify-center gap-2">
          <button className="btn btn-primary">Detail</button>
          <DeleteButton id={el.id} />
        </div>
      </div>
    </div>
  );
};

export default CardUser;
