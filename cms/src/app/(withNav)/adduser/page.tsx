"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";

const Page = () => {
  const router = useRouter();
  const [input, setInput] = useState({
    name: "",
    username: "",
    email: "",
    age: "",
    weight: "",
    height: "",
    specialist: "",
    phone_number: "",
    bio: "",
    profile_picture: "",
    role: "",
    location: "",
  });

  console.log(input, "<><>INPUT<><>");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    // console.log(`Changed ${name} to ${value}`); // Debug log
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Check if all fields are filled
      if (
        !input.name ||
        !input.username ||
        !input.email ||
        !input.age ||
        !input.weight ||
        !input.height ||
        !input.specialist ||
        !input.phone_number ||
        !input.bio ||
        !input.profile_picture ||
        !input.role
      ) {
        return Swal.fire({
          title: "Please fill all the fields",
          icon: "error",
        });
      }

      const link = process.env.NEXT_PUBLIC_BASE_URL;
      if (!link) {
        throw new Error("Base URL is not defined");
      }

      console.log("Sending data:", input);

      // Make the POST request
      const response = await fetch(`${link}/api/trainer`, {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Read the response text or JSON
      const responseText = await response.text();
      console.log("Response text:", responseText); // Debug log

      // Check for errors
      if (!response.ok) {
        // Try parsing JSON if the response is not OK
        let errorMessage = "An error occurred";
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorMessage;
        } catch {
          // Ignore JSON parsing errors and use the text response
        }
        throw new Error(errorMessage);
      }

      Swal.fire({
        title: "Success add Trainer!",
        icon: "success",
      });
      router.push("/");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: (error as Error).message,
        icon: "error",
      });
    }
  };

  return (
    <>
      <div>
        <h1 className="font-bold text-xl mb-3">Add New Trainer</h1>
        <form onSubmit={handleSubmit}>
          <hr className="mb-6" />
          <h1>Name</h1>
          <label className="input input-bordered flex items-center mb-5">
            <input
              value={input.name}
              name="name"
              type="text"
              className="grow"
              onChange={handleChange}
            />
          </label>
          <h1>Username</h1>
          <input
            value={input.username}
            name="username"
            type="text"
            className="input input-bordered flex items-center w-full mb-5"
            onChange={handleChange}
          />
          <h1>Email</h1>
          <label className="input input-bordered flex items-center mb-5">
            <input
              value={input.email}
              name="email"
              type="email"
              className="grow"
              onChange={handleChange}
            />
          </label>
          <h1>Age</h1>
          <label className="input input-bordered flex items-center mb-8">
            <input
              value={input.age}
              name="age"
              type="text"
              className="grow"
              onChange={handleChange}
            />
          </label>
          <h1>Weight</h1>
          <label className="input input-bordered flex items-center mb-8">
            <input
              value={input.weight}
              name="weight"
              type="text"
              className="grow"
              onChange={handleChange}
            />
          </label>
          <h1>Height</h1>
          <label className="input input-bordered flex items-center mb-8">
            <input
              value={input.height}
              name="height"
              type="text"
              className="grow"
              onChange={handleChange}
            />
          </label>
          <h1>Specialist</h1>
          <label className="input input-bordered flex items-center mb-8">
            <input
              value={input.specialist}
              name="specialist"
              type="text"
              className="grow"
              onChange={handleChange}
            />
          </label>
          <h1>Phone Number</h1>
          <label className="input input-bordered flex items-center mb-8">
            <input
              value={input.phone_number}
              name="phone_number"
              type="text"
              className="grow"
              onChange={handleChange}
            />
          </label>
          <h1>Bio</h1>
          <label className="input input-bordered flex items-center mb-8">
            <input
              value={input.bio}
              name="bio"
              type="text"
              className="grow"
              onChange={handleChange}
            />
          </label>
          <h1>Role</h1>
          <label className="input input-bordered flex items-center mb-8">
            <input
              value={input.role}
              name="role"
              type="text"
              className="grow"
              onChange={handleChange}
            />
          </label>
          <h1>Location</h1>
          <label className="input input-bordered flex items-center mb-5">
            <input
              value={input.location}
              name="location"
              type="text"
              className="grow"
              onChange={handleChange}
            />
          </label>
          <h1>Profile Picture</h1>
          {input.profile_picture && (
            <div className="mb-5">
              <img
                src={input.profile_picture}
                alt="Profile Picture"
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>
          )}

          <CldUploadWidget
            signatureEndpoint="/api/cloudinary"
            onSuccess={(Result) => {
              // console.log(Result.info.secure_url, "<><>URL<><>");
              setInput({
                ...input,
                profile_picture:
                  typeof Result.info === "string"
                    ? Result.info
                    : Result.info?.secure_url || "",
              });
              
            }}
         
          >
            {({ open }) => {
              return (
                <button
                  className="bg-slate-500 rounded py-2 px-4 mb-5  text-white"
                  type="button"
                  onClick={() => open()}
                >
                  Upload an Image
                </button>
              );
            }}
          </CldUploadWidget>
          {/* <h1>Profile Picture</h1>
          <label className="form-control w-full max-w-xs">
            <div className="label">
            </div>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
            />
            <div className="label">
            </div>
          </label> */}
          <button className="btn btn-warning w-full">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Page;
