import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IRfqResponse extends Document {
  rfqId: Types.ObjectId;
  supplierId: Types.ObjectId;
  pricePerUnit: number;
  totalPrice: number;
  currency: string;
  moq: number;
  leadTimeDays: number;
  validUntil: Date;
  notes?: string;
  attachments: string[];
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
}

const rfqResponseSchema = new Schema<IRfqResponse>(
  {
    rfqId: { type: Schema.Types.ObjectId, ref: 'Rfq', required: true },
    supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
    pricePerUnit: { type: Number, required: true, min: 0 },
    totalPrice: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'USD' },
    moq: { type: Number, required: true, min: 1 },
    leadTimeDays: { type: Number, required: true, min: 1 },
    validUntil: { type: Date, required: true },
    notes: { type: String },
    attachments: [{ type: String }],
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'withdrawn'],
      default: 'pending',
    },
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

rfqResponseSchema.index({ rfqId: 1, supplierId: 1 }, { unique: true });

export const RfqResponse = mongoose.model<IRfqResponse>('RfqResponse', rfqResponseSchema);
