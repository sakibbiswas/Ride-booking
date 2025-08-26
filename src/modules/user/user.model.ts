

import { Schema, model } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  RIDER = 'rider',
  DRIVER = 'driver',
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isBlocked?: boolean;
  isApproved?: boolean;
  isOnline?: boolean;
  emergencyContacts?: { name: string; phone: string }[]; //  array of objects
}

const emergencyContactSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { _id: false } // prevent generating _id for each contact
);

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
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
    emergencyContacts: [emergencyContactSchema], //  nested object array
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
