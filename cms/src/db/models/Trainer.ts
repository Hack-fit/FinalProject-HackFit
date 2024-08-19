import db from "@/db/config/mongodb";
import { ObjectId } from "mongodb";
import { z } from "zod";

const TrainerSchema = z.object({
  id: z.instanceof(ObjectId),
  name: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email().min(1),
  age: z.number().int().positive(),
  weight: z.string().min(1), // fixed from 'Weight' to 'weight'
  height: z.string().min(1),
  specialist: z.string().min(1),
  phone_number: z.string().min(1),
  bio: z.string().min(1),
  profile_picture: z.string().min(1),
  role: z.string().min(1)
});

type TypeTrainer = z.infer<typeof TrainerSchema>;

class Trainer {
  static collection() {
    return db.collection<TypeTrainer>("trainers");
  }

  static async getAllTrainer(name: string | null) {
    const trainer = await this.collection().find({ name: { $regex: name || "", $options: "i" } }).toArray();
    return trainer;
  }

  static async delete(id: string) {
    await this.collection().deleteOne({
      _id: new ObjectId(id),
    });
    return "success delete Trainer";
  }

  static async addUser(user: TypeTrainer) {
    try {
      const emailUnique = await this.collection().findOne({ email: user.email });
      if (emailUnique) {
        throw new Error("Email must be unique");
      }
      const result = await this.collection().insertOne(user);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // New update method
  static async update(id: string, updates: Partial<TypeTrainer>) {
    try {
      // Validate the updates with the schema, but allow partial updates
      const validatedUpdates = TrainerSchema.partial().parse(updates);

      // Convert id to ObjectId
      const objectId = new ObjectId(id);

      // Update the document
      const result = await this.collection().updateOne(
        { _id: objectId },
        { $set: validatedUpdates }
      );

      if (result.matchedCount === 0) {
        throw new Error("No Trainer found with the provided ID");
      }

      return "success update Trainer";
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async getById(id: string) {
    // console.log(id, '<<<<ID<<<');
    
    const trainer = await this.collection().findOne({
      _id : new ObjectId(String(id))
    })
    console.log(trainer, '<<<<TRAINER');
    if(!trainer){
      let error = new Error("Trainer not found")
      error.name = "Not Found"
      throw error
    }
    return trainer
  }
}

export default Trainer;
