import bcrypt from "bcrypt"
import { auth, firestore_db } from "@/lib/firebaseAdmin";

export async function POST(req) {
    try{
        return Response.json(
            {
                user: await req.json(), 
                uid: req.headers.get("x-user-uid"), 
                email: req.headers.get("x-user-email")
            }, 
            {
                success: true
            }
        );
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
}