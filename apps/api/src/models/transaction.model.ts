import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITransaction extends Document {
  orderId: Types.ObjectId;
  type: 'escrow_in' | 'escrow_release' | 'refund' | 'commission';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  gateway: 'razorpay' | 'stripe';
  gatewayTransactionId?: string;
  gatewayOrderId?: string;
  payerId: Types.ObjectId;
  payeeId?: Types.ObjectId;
  metadata?: Record<string, unknown>;
}

const transactionSchema = new Schema<ITransaction>(
  {
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    type: {
      type: String,
      enum: ['escrow_in', 'escrow_release', 'refund', 'commission'],
      required: true,
    },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'INR' },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    gateway: { type: String, enum: ['razorpay', 'stripe'], required: true },
    gatewayTransactionId: { type: String },
    gatewayOrderId: { type: String },
    payerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    payeeId: { type: Schema.Types.ObjectId, ref: 'User' },
    metadata: { type: Schema.Types.Mixed },
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

transactionSchema.index({ orderId: 1 });
transactionSchema.index({ gatewayTransactionId: 1 });

export const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);
