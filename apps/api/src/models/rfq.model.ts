import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IRfq extends Document {
  buyerId: Types.ObjectId;
  title: string;
  description: string;
  categoryId: Types.ObjectId;
  quantity: number;
  unit: string;
  budgetMin?: number;
  budgetMax?: number;
  currency: string;
  destinationCountry: string;
  deadline: Date;
  status: 'open' | 'receiving_quotes' | 'awarded' | 'closed' | 'cancelled';
  responseCount: number;
  attachments: string[];
}

const rfqSchema = new Schema<IRfq>(
  {
    buyerId: { type: Schema.Types.ObjectId, ref: 'Buyer', required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    quantity: { type: Number, required: true, min: 1 },
    unit: { type: String, required: true, default: 'pieces' },
    budgetMin: { type: Number, min: 0 },
    budgetMax: { type: Number, min: 0 },
    currency: { type: String, default: 'USD' },
    destinationCountry: { type: String, required: true },
    deadline: { type: Date, required: true },
    status: {
      type: String,
      enum: ['open', 'receiving_quotes', 'awarded', 'closed', 'cancelled'],
      default: 'open',
    },
    responseCount: { type: Number, default: 0 },
    attachments: [{ type: String }],
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

rfqSchema.index({ status: 1, deadline: 1 });
rfqSchema.index({ categoryId: 1, status: 1 });

export const Rfq = mongoose.model<IRfq>('Rfq', rfqSchema);
