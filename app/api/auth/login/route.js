import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { auth, firestore_db } from "@/lib/firebaseAdmin";

export async function POST(req) {
  const { uid, email } = await req.json();

  if (!uid || !email)
    return NextResponse.json({ type: "warning", message: "Please fill in all fields!" }, { status: 400 });

  try {
    const userRecord = await auth.getUserByEmail(email);

    if (userRecord.uid !== uid)
      return NextResponse.json({ type: "error", message: "User ID does not match." }, { status: 400 });

    if (!userRecord.emailVerified)
      return NextResponse.json({ type: "warning", message: "Email is not verified. Please verify your email." }, { status: 400 });

    const userDoc = await firestore_db.collection("users").doc(userRecord.uid).get();
    if (!userDoc.exists)
      return NextResponse.json({ type: "error", message: "User not found in database." }, { status: 404 });

    const user = userDoc.data();

    const token = jwt.sign(
      { 
        uid: userRecord.uid,
        email: userRecord.email,
        username: user.username,
      }, 
      process.env.JWT_SECRET, 
      { 
        expiresIn: process.env.JWT_EXPIRATION,
      }
    );

    const res = NextResponse.json({ type: "success", message: "Logged in successfully!", user }, { status: 200 });


    res.cookies.set("accessToken", token, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 60 * 60 * 2,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    res.cookies.set("refreshToken", uid, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 60 * 60 * 24 * 30,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return res;
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}