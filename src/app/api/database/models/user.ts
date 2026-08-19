import mongoose, { Schema, Document } from "mongoose";

export interface IUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role?: string;
  lastLogin?: Date;
}

export type UserAttributes = IUser & Document;

export const userSchema = new Schema<IUser & Document>(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const User =
  (mongoose.models.User as mongoose.Model<IUser & Document>) || mongoose.model<IUser & Document>("User", userSchema);

export default User;
