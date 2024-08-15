import Trainer from "@/db/models/Trainer";
import { NextResponse } from "next/server";
import { z } from "zod";


type id = {
    params: {
        id:string
    }
}

export async function GET(request: Request, {params}: id){
    
    try {
        const trainer = await Trainer.getById(params.id)
    //  console.log(trainer, '<<<<PARAMS');

        return Response.json({trainer})
    } catch (error : any) {
        if(error.name === 'BSONError'){
            return Response.json({msg : "Invalid Id"}, {status : 400})
        }

        if(error.name === 'Not Found'){
            return Response.json({msg : error.message}, {status : 404})
        }
        return Response.json({error}, {status:500})
    }
}

export async function PUT(request: Request, {params}: id) {
    // console.log(params, '<<<<PARAMS ');
    
    try {
      // Extract ID and updates from the request body
      const body = await request.json();
      console.log(body, '<<<<ID');
  
      const result = await Trainer.update(params.id, body);
      
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
    }}