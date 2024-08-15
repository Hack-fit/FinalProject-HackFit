"use client";
import { Users } from "@/app/(withNav)/page";
import { ButtonDeleteCard } from "./DeleteCardUser";

const CardUser = ({ el }: { el: Users }) => {
  return (
    <div className="card bg-base-100 w-80 shadow-xl rounded-lg overflow-hidden">
      <figure className="relative p-4">
        <img
          src={el.imageurl}
          alt={el.name}
          className="w-32 h-32 object-cover rounded-xl mx-auto"
        />
      </figure>
      <div className="card-body text-center p-4">
        <h2 className="card-title text-xl font-bold mb-2 text-center justify-center">{el.name}</h2>
        <p className="text-sm text-gray-600 mb-4">
          {el.age || "No description available."} Years Old
        </p>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 34 34"
              className="w-6 h-6"
            >
              <path
                fill="currentColor"
                d="M16,14.81,28.78,6.6A3,3,0,0,0,27,6H5a3,3,0,0,0-1.78.6Z"
              ></path>
              <path
                fill="currentColor"
                d="M16.54,16.84h0l-.17.08-.08,0A1,1,0,0,1,16,17h0a1,1,0,0,1-.25,0l-.08,0-.17-.08h0L2.1,8.26A3,3,0,0,0,2,9V23a3,3,0,0,0,3,3H27a3,3,0,0,0,3-3V9a3,3,0,0,0-.1-.74Z"
              ></path>
            </svg>
            <span>{el.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 34 34"
              className="w-6 h-6"
            >
              <path d="M17.4 22A15.42 15.42 0 0 1 2 6.6 4.6 4.6 0 0 1 6.6 2a3.94 3.94 0 0 1 .77.07 3.79 3.79 0 0 1 .72.18 1 1 0 0 1 .65.75l1.37 6a1 1 0 0 1-.26.92c-.13.14-.14.15-1.37.79a9.91 9.91 0 0 0 4.87 4.89c.65-1.24.66-1.25.8-1.38a1 1 0 0 1 .92-.26l6 1.37a1 1 0 0 1 .72.65 4.34 4.34 0 0 1 .19.73 4.77 4.77 0 0 1 .06.76A4.6 4.6 0 0 1 17.4 22z"></path>
            </svg>
            <span>081234576</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              className="w-6 h-6"
            >
              <path d="M24 4c-7.73 0-14 6.27-14 14 0 10.5 14 26 14 26s14-15.5 14-26c0-7.73-6.27-14-14-14zm0 19c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
            <span>Jakarta</span>
          </div>
        </div>
        <div className="card-actions flex justify-center gap-2">
          <ButtonDeleteCard id={el._id} />
        </div>
      </div>
    </div>
  );
};

export default CardUser;
