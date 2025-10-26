import { firestore_db } from "@/lib/firebaseAdmin";

export async function POST(req) {
    try {
        const uid = req.headers.get("x-user-uid");
        if (!uid) return new Response("The user id is missing.", { status: 401 });

        Response.cookies.clear().json(
            { 
                type: "success",
                message: "User logged out successfully!", 
            }, 
            { status: 200 }
        );
    } catch (error) {
        
    }
}