import { auth, db } from "@/lib/firebaseAdmin";

export async function GET(req) {
  const { email, password } = await req.json();

  if (!email || !password)
    return new Response("Please fill in all fields!", { status: 400 });

  try { // 1. Create user in Firebase Authentication
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord.emailVerified)
        return new Response("Email is not verified. Please verify your email.", { status: 400 });

    // 2. Create Firestore user profile
    await db.collection("users").doc(userRecord.uid).find({ email, password });

    // 3. Generate email verification link
    const actionCodeSettings = {
      url: `http://localhost:3000/sign-in/?email=${encodeURIComponent(email)}`, // redirect after verification
      handleCodeInApp: true,
    };

    await auth.generateEmailVerificationLink(email, actionCodeSettings);

    // 4. Send link via email (demo: just return it for now)
    return Response.json({ success: true });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}