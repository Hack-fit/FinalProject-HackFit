import { comparePassword } from "@/db/helper/bcrypt";
import { signToken } from "@/db/helper/jwt";
import User from "@/db/models/User";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const body: { email: string; password: string } = await request.json();

    const user = await User.getUserByEmail(body.email);
    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid Email/Password",
        },
        {
          status: 400,
        }
      );
    }
    const isValid = comparePassword(body.password, user.password);
    if (!isValid) {
      return NextResponse.json(
        {
          message: "Invalid Email/Password",
        },
        {
          status: 400,
        }
      );
    } 

    const access_token = signToken({
        _id : user._id.toString(),
        email: user.email
    })

    cookies().set("Authorization", `Bearer ${access_token}`)
    return NextResponse.json({
        access_token: access_token
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errPath = error.issues[0].path[0];
      const errMessage = error.issues[0].message[0];

      return NextResponse.json(
        {
          message: `${errPath} ${errMessage.toLocaleLowerCase()}`,
        },
        {
          status: 400,
        }
      );
    }
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
