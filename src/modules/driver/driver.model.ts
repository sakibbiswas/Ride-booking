import { Schema, model, Document } from 'mongoose';

export interface IDriver extends Document {
  name: string;
  email: string;
  password: string;
  approved: boolean;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
}

const driverSchema = new Schema<IDriver>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  approved: { type: Boolean, default: false },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: false,
    },
    coordinates: {
      type: [Number],
      required: false,
    },
  },
});

driverSchema.index({ location: '2dsphere' });

export const Driver = model<IDriver>('Driver', driverSchema);
