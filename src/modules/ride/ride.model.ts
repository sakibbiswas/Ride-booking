import mongoose, { Schema, Document, Types } from 'mongoose';
export enum RideStatus {
  REQUESTED = 'REQUESTED',
  ACCEPTED = 'ACCEPTED',
  PICKED_UP = 'PICKED_UP',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface IRide extends Document {
  riderId: Types.ObjectId;
  driverId?: Types.ObjectId;
  pickupLocation: string;
  destination: string;
  pickupTime?: Date;
  status: RideStatus;
  fare?: number;
  timestamps: {
    requestedAt: Date;
    acceptedAt?: Date;
    pickedUpAt?: Date;
    completedAt?: Date;
    cancelledAt?: Date;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const rideSchema = new Schema<IRide>(
  {
    riderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    driverId: { type: Schema.Types.ObjectId, ref: 'User' }, // keep 'User' for both rider & driver unless you have a separate 'Driver' model
    pickupLocation: { type: String, required: true },
    destination: { type: String, required: true },
    pickupTime: { type: Date },
    status: {
      type: String,
      enum: Object.values(RideStatus),
      default: RideStatus.REQUESTED,
    },
    fare: { type: Number },
    timestamps: {
      requestedAt: { type: Date, default: Date.now },
      acceptedAt: { type: Date },
      pickedUpAt: { type: Date },
      completedAt: { type: Date },
      cancelledAt: { type: Date },
    },
  },
  {
    timestamps: true, // auto add createdAt and updatedAt
  }
);

export const Ride = mongoose.model<IRide>('Ride', rideSchema);















