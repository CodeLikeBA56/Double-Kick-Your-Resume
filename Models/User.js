import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    title: { type: String, default: "" },
    summary: { type: String, default: "" },
    city: { type: String, default: "" },
    address: { type: String, default: "" },
    country: { type: String, default: "" },
    socialLinks: {
        github: { type: String, default: "" },
        linkedIn: { type: String, default: "" },
        twitter: { type: String, default: "" },
        facebook: { type: String, default: "" },
        instagram: { type: String, default: "" },
    }
});

export default models.User || model("User", userSchema);