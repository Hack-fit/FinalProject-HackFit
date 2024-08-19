import User from "@/db/models/User";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: Request) {
  // console.log("TESTTTTT");

  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    const user = await User.getAllUser(name);
    return NextResponse.json(
      {
        data: user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body: { id: string } = await request.json();
    // console.log(body,`---------`);
    const user = await User.delete(body.id);
    // console.log(del, "<<<<<<<<<<<<<<");

    return Response.json({
      data: user,
    });
  } catch (error) {
    console.log(error);
    
    if (error instanceof z.ZodError) {
      return Response.json(
        {
          error: error.issues.map((el) => el.path[0] + " " + el.message),
        },
        {
          status: 400,
        }
      );
    }
    return Response.json(
      {
        error: `internal server error`,
      },
      {
        status: 500,
      }
    );
  }
}
