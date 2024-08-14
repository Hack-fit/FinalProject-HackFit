import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export const ButtonDeleteCard = ({ id }: { id: string }) => {
  // console.log("ini id di button", id);
  const router = useRouter()
  const handleRemove = async () => {
    try {
      const link : string | undefined = process.env.NEXT_PUBLIC_BASE_URL
      const result = await fetch(link + `/api/user`, {
        method: "DELETE",
        body: JSON.stringify({
          id
        }),
      });

      if (result.ok) {
        Swal.fire({
          title: "Success Remove User",
          icon: "success"
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000); 
      } else {
        const errorData = await result.json();
         Swal.fire({
          title: errorData.message,
          icon: "error"
        });
      }
    } catch (error) {
       console.log(error);
       
    }
  };

  return (
    <button
      onClick={handleRemove}
      className="btn btn-error"
    >
      Delete
    </button>
  );
};