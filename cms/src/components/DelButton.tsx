"use client"

import Swal from "sweetalert2";

import { useRouter } from "next/navigation";
import { handleDelete } from "../../action";

export default function DeleteButton({id} : {id : string}){
    const router = useRouter()
    return(
        <button onClick={async () => {
            await handleDelete(id)
            Swal.fire({
                title: "success delete ",
                icon: "success"
              });
              router.refresh()
        }}>
        <div className="badge btn badge-outline  w-20 text-red-500">Delete</div>
        </button>
    )
}