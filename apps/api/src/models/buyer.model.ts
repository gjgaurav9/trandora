import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IBuyer extends Document {
  userId: Types.ObjectId;
  companyName?: string;
  country: string;
  preferredCategories: Types.ObjectId[];
  budgetRangeMin?: number;
  budgetRangeMax?: number;
  currency: string;
  importLicenseNumber?: string;
  isActive: boolean;
}

const buyerSchema = new Schema<IBuyer>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    companyName: { type: String, trim: true },
    country: { type: String, required: true, default: 'India' },
    preferredCategories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    budgetRangeMin: { type: Number, min: 0 },
    budgetRangeMax: { type: Number, min: 0 },
    currency: { type: String, default: 'USD' },
    importLicenseNumber: { type: String },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const Buyer = mongoose.model<IBuyer>('Buyer', buyerSchema);
