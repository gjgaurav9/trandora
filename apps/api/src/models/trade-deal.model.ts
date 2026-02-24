import mongoose, { Schema, Document } from 'mongoose';

export interface ITradeDeal extends Document {
  name: string;
  shortCode: string;
  sourceCountry: string;
  destinationCountries: string[];
  status: 'active' | 'pending_ratification' | 'expired' | 'suspended';
  effectiveDate: Date;
  expiryDate?: Date;
  description?: string;
  coveragePercentage?: number;
  officialUrl?: string;
}

const tradeDealSchema = new Schema<ITradeDeal>(
  {
    name: { type: String, required: true, trim: true },
    shortCode: { type: String, required: true, unique: true, uppercase: true },
    sourceCountry: { type: String, required: true, default: 'India' },
    destinationCountries: [{ type: String, required: true }],
    status: {
      type: String,
      enum: ['active', 'pending_ratification', 'expired', 'suspended'],
      default: 'active',
    },
    effectiveDate: { type: Date, required: true },
    expiryDate: { type: Date },
    description: { type: String },
    coveragePercentage: { type: Number },
    officialUrl: { type: String },
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

tradeDealSchema.index({ shortCode: 1 });
tradeDealSchema.index({ status: 1 });

export const TradeDeal = mongoose.model<ITradeDeal>('TradeDeal', tradeDealSchema);
