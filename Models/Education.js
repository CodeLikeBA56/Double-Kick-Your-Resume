import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  program: { type: String, required: true },
  institution: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  isActive: { type: Boolean, default: false },
  courses: { type: String },
});

export default models.User || model("User", userSchema);