import admin from "firebase-admin";
import serviceAccount from "../double-kick-your-resume-firebase-adminsdk-fbsvc-627f47c835.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://double-kick-your-resume-default-rtdb.asia-southeast1.firebasedatabase.app",
  });
}

const auth = admin.auth();
const firestore_db = admin.firestore();

export { auth, firestore_db };