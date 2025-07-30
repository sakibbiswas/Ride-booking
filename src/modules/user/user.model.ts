
import { Schema, model } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  RIDER = 'rider',
  DRIVER = 'driver',
}

interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isBlocked?: boolean;
  isApproved?: boolean;
  isOnline?: boolean;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // ✅ this makes sure it's always saved as lowercase
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.RIDER,
    },
    isBlocked: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    isOnline: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
