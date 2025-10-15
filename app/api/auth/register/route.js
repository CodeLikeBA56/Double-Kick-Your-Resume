import bcrypt from "bcrypt"
import { auth, firestore_db } from "@/lib/firebaseAdmin";

export async function POST(req) {
  const { uid, username, email, password } = await req.json();

  if (!username || !uid || !email || !password)
    return new Response("Please fill in all fields!", { status: 400 });

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const userRecord = await auth.getUserByEmail(email);

    if (userRecord.uid !== uid)
      return new Response("UID does not match the email provided.", { status: 400 });

    // 1. Check if user exists before pushing user profile to the Firestore.
    const userDoc = await firestore_db.collection("users").doc(uid).get();

    if (userDoc.exists)
      return new Response("User already exists", { status: 400 });

    // 2. Create Firestore user profile
    await firestore_db.collection("users").doc(uid).set({ 
      username, email, profileUrl: "", password: hashedPassword,
      createdAt: new Date(), updatedAt: new Date(),
    });

    return Response.json({ success: true });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}