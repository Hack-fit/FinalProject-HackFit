import db from "@/db/config/mongodb";
import { Weight } from "lucide-react";
import { ObjectId } from "mongodb";
import { z } from "zod";


const UserSchema = z.object({
  name: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(6),
  age: z.number().int().min(1),
  Weight: z.number().int().min(1),
  height: z.number().int().min(1),
  bodyType: z.string().min(1),
});

type TypeUser = z.infer<typeof UserSchema>;

class User {
  static collection() {
    return db.collection<TypeUser>("users");
  }

  static async getAllUser(name: string | null) {
    const user = await this.collection().find({name : { $regex: name || "", $options: "i"}}).toArray();
    return user
  }
  static async getUserByEmail(email: string){
    const user = await db.collection("admins").findOne({email});
    // console.log(user, '<<USER>>');
    
    return user
  }
  static async delete(id: string) {
    // console.log(id, 'ID<><><><><><><>');
    
    const delItem = await this.collection().deleteOne({
      _id: new ObjectId(String(id)),
    });
    // console.log(delItem, 'DELITEM<><><><><>');
    
    return "success delete User";
  }
}

export default User