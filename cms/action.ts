
import { revalidatePath } from "next/cache";

export const handleDelete = async (id: string) => {
    try {
        const res = await fetch(`http://localhost:4000/delete-user`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        });
    

        if (!res.ok) {
            throw new Error('Failed to delete user');
        }
     
        revalidatePath("/", "layout");
    } catch (error) {
        console.error(error);
        
    }
};
