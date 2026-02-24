import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IDutyRate extends Document {
  tradeDealId: Types.ObjectId;
  hsCodePrefix: string;
  productDescription?: string;
  dutyRate: number;
  mfnRate: number;
  savingsPercentage: number;
  conditions?: string;
  effectiveDate: Date;
  expiryDate?: Date;
}

const dutyRateSchema = new Schema<IDutyRate>(
  {
    tradeDealId: { type: Schema.Types.ObjectId, ref: 'TradeDeal', required: true },
    hsCodePrefix: { type: String, required: true, trim: true },
    productDescription: { type: String },
    dutyRate: { type: Number, required: true, min: 0 },
    mfnRate: { type: Number, required: true, min: 0 },
    savingsPercentage: { type: Number, default: 0 },
    conditions: { type: String },
    effectiveDate: { type: Date, required: true },
    expiryDate: { type: Date },
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

dutyRateSchema.index({ tradeDealId: 1, hsCodePrefix: 1 });
dutyRateSchema.index({ hsCodePrefix: 1 });

export const DutyRate = mongoose.model<IDutyRate>('DutyRate', dutyRateSchema);
