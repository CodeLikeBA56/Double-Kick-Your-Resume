import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { auth, firestore_db } from "@/lib/firebaseAdmin";

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password)
    return Response.json({ type: "warning", message: "Please fill in all fields!" }, { status: 400 });

  try {
    const userRecord = await auth.getUserByEmail(email); // Fetch user from Firebase Authentication

    if (!userRecord.emailVerified) // Is user email verified.
      return Response.json({ type: "warning", message: "Email is not verified. Please verify your email." }, { status: 400 });

    const userDoc = await firestore_db.collection("users").doc(userRecord.uid).get(); // Now fetch user profile form the Firestore.
    
    if (!userDoc.exists) 
      return Response.json({ type: "error", message: "User not found in database." }, { status: 404 });

    const user = userDoc.data();
    if (!user) 
      return Response.json({ type: "error", message: "User data is corrupted. Please contact support." }, { status: 500 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return Response.json({ type: "error", message: "The email or password is incorrect." }, { status: 400 });

    // If everything is fine, generate a JWT token.
    const cookieStore = await cookies();
    const token = jwt.sign({ userId: userRecord.uid }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    
    cookieStore.set("uid", token, {
      httpOnly: true, sameSite: "Strict", maxAge: 60 * 60 * 2, 
      secure: process.env.NODE_ENV === "production",
    });
    
    return Response.json({ type: "success", message: "Logged in successfully!", user }, { status: 200 });
  } catch (error) {
    console.log(error.message)
    return new Response(error.message, { status: 500 });
  }
}