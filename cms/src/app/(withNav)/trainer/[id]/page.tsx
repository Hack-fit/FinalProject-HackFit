"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CldUploadWidget } from "next-cloudinary";

// Fetch existing trainer data based on the given ID
export async function fetchDataTrainer(id: string) {
  const link: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
  if (!link) {
    throw new Error("Base URL is not defined");
  }

  const response = await fetch(`${link}/api/trainer/${id}`);
  if (!response.ok) {
    throw new Error("Trainer not found");
  }

  return await response.json();
}

const Page = ({ params }: { params: { id: string } }) => {
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

  useEffect(() => {
    const fetchTrainerData = async () => {
      try {
        const data = await fetchDataTrainer(params.id);
        setInput(data.trainer);
      } catch (error) {
        console.error("Error fetching trainer data:", error);
      }
    };

    fetchTrainerData();
  }, [params.id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const fields = [
        "name",
        "username",
        "email",
        "age",
        "weight",
        "height",
        "specialist",
        "phone_number",
        "bio",
        "profile_picture",
        "role",
      ];
      const isValid = fields.every((field) => input[field as keyof typeof input]);
      if (!isValid) {
        return Swal.fire({
          title: "Please fill all the fields",
          icon: "error",
        });
      }

      const link = process.env.NEXT_PUBLIC_BASE_URL;
      if (!link) {
        throw new Error("Base URL is not defined");
      }

      const response = await fetch(`${link}/api/trainer/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseText = await response.text();
      if (!response.ok) {
        let errorMessage = "An error occurred";
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorMessage;
        } catch {
          // Use the default error message if JSON parsing fails
        }
        throw new Error(errorMessage);
      }

      Swal.fire({
        title: "Success update Trainer!",
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
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Trainer</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Name"
          name="name"
          value={input.name}
          onChange={handleChange}
        />
        <InputField
          label="Username"
          name="username"
          value={input.username}
          onChange={handleChange}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          value={input.email}
          onChange={handleChange}
        />
        <InputField
          label="Age"
          name="age"
          value={input.age}
          onChange={handleChange}
        />
        <InputField
          label="Weight"
          name="weight"
          value={input.weight}
          onChange={handleChange}
        />
        <InputField
          label="Height"
          name="height"
          value={input.height}
          onChange={handleChange}
        />
        <InputField
          label="Specialist"
          name="specialist"
          value={input.specialist}
          onChange={handleChange}
        />
        <InputField
          label="Phone Number"
          name="phone_number"
          value={input.phone_number}
          onChange={handleChange}
        />
        <InputField
          label="Bio"
          name="bio"
          value={input.bio}
          onChange={handleChange}
        />
        <InputField
          label="Role"
          name="role"
          value={input.role}
          onChange={handleChange}
        />
        <InputField
          label="Location"
          name="location"
          value={input.location}
          onChange={handleChange}
        />
        <div className="mb-5">
          <label className="block text-lg font-medium mb-2">Profile Picture</label>
          {input.profile_picture && (
            <div className="mb-4">
              <img
                src={input.profile_picture}
                alt="Profile Picture"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
          )}
          <CldUploadWidget
            signatureEndpoint="/api/cloudinary"
            onSuccess={(result) => {
              setInput((prev) => ({
                ...prev,
                profile_picture:
                  typeof result.info === "string"
                    ? result.info
                    : result.info?.secure_url || "",
              }));
            }}
          >
            {({ open }) => (
              <button
                type="button"
                className="bg-slate-500 text-white py-2 px-4 rounded"
                onClick={() => open()}
              >
                Upload an Image
              </button>
            )}
          </CldUploadWidget>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

// Reusable Input Field Component
const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="mb-5">
    <label className="block text-lg font-medium mb-2">{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded px-3 py-2 w-full"
    />
  </div>
);

export default Page;
