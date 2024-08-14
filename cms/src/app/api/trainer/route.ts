import Trainer from "@/db/models/Trainer";
import { NextResponse } from "next/server";
import { z } from "zod";

// const TrainerSchema = z.object({
//   name: z.string().min(1),
//   username: z.string().min(1),
//   email: z.string().email().min(1),
//   age: z.number().int().positive(), // Changed to positive number
//   weight: z.number().int().positive(), // Changed to positive number
//   height: z.number().int().positive(), // Changed to positive number
//   specialist: z.string().min(1),
//   phone_number: z.string().min(1),
//   bio: z.string().min(1),
//   profile_picture: z.string().min(1),
//   role: z.string().min(1)
// });
// const TrainerDeclare = {
//   name: string,
//   username: string,
//   email: string,
//   age: number,
//   weight: number,
//   height: number,
//   specialist: string,
//   phone_number: string,
//   bio: string,
//   profile_picture: string,
//   role: string
// }

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name") || ""; // Default to empty string if null
    const trainer = await Trainer.getAllTrainer(name);
    return NextResponse.json(
      { data: trainer },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;
    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }
    const trainer = await Trainer.delete(id);
    return NextResponse.json(
      { data: trainer },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues.map((el) => `${el.path[0]} ${el.message}`) },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Raw Body:", body); // Log raw request body
    // const parsedBody = TrainerDeclare.parse(body); // This will throw if validation fails
    console.log("Parsed Body:", body); // Log parsed body if validation succeeds

    const trainer = await Trainer.addUser(body);
    return NextResponse.json(
      { data: trainer },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error:", error); // Log error for debugging

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues.map((el) => `${el.path[0]} ${el.message}`) },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    // Extract ID and updates from the request body
    const { id, updates } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    // Validate and parse updates with TrainerSchema
    // const validatedUpdates = TrainerSchema.partial().parse(updates);

    // Call the update method from the Trainer class
    const result = await Trainer.update(id, updates);
    
    return NextResponse.json(
      { message: result },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error:", error); // Log error for debugging

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues.map((el) => `${el.path[0]} ${el.message}`) },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
