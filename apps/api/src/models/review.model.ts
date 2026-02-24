import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IReview extends Document {
  orderId: Types.ObjectId;
  reviewerId: Types.ObjectId;
  supplierId: Types.ObjectId;
  ratings: {
    quality: number;
    communication: number;
    delivery: number;
    value: number;
    overall: number;
  };
  title?: string;
  comment?: string;
  isVerifiedPurchase: boolean;
}

const reviewSchema = new Schema<IReview>(
  {
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    reviewerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
    ratings: {
      quality: { type: Number, required: true, min: 1, max: 5 },
      communication: { type: Number, required: true, min: 1, max: 5 },
      delivery: { type: Number, required: true, min: 1, max: 5 },
      value: { type: Number, required: true, min: 1, max: 5 },
      overall: { type: Number, required: true, min: 1, max: 5 },
    },
    title: { type: String, trim: true },
    comment: { type: String },
    isVerifiedPurchase: { type: Boolean, default: false },
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

reviewSchema.index({ supplierId: 1 });
reviewSchema.index({ orderId: 1, reviewerId: 1 }, { unique: true });

export const Review = mongoose.model<IReview>('Review', reviewSchema);
