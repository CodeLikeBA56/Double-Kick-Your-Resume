import mongoose from "mongoose";

let isConnected = false;
const MONGODB_URI = process.env.MONGODB_URI || "";

const connectToDatabase = async () => {
  if (isConnected) return; // skip if already connected

  try {
    const db = await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    
    isConnected = db.connections[0].readyState === 1;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default connectToDatabase;
