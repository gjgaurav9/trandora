import mongoose, { Schema, Document, Types } from 'mongoose';

interface IOrderItem {
  productId: Types.ObjectId;
  name: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
  unit: string;
}

interface IOrderMilestone {
  name: string;
  percentage: number;
  amount: number;
  status: 'pending' | 'released' | 'disputed';
  releasedAt?: Date;
}

export interface IOrder extends Document {
  orderNumber: string;
  buyerId: Types.ObjectId;
  supplierId: Types.ObjectId;
  rfqId?: Types.ObjectId;
  items: IOrderItem[];
  subtotal: number;
  commission: number;
  total: number;
  currency: string;
  milestones: IOrderMilestone[];
  status:
    | 'pending_payment'
    | 'escrow'
    | 'production'
    | 'quality_check'
    | 'shipped'
    | 'delivered'
    | 'completed'
    | 'disputed'
    | 'cancelled'
    | 'refunded';
  ftaDealCode?: string;
  dutyRate?: number;
  trackingNumber?: string;
  trackingUrl?: string;
  shippingCarrier?: string;
  estimatedDelivery?: Date;
  notes?: string;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    pricePerUnit: { type: Number, required: true, min: 0 },
    totalPrice: { type: Number, required: true, min: 0 },
    unit: { type: String, default: 'pieces' },
  },
  { _id: false }
);

const milestoneSchema = new Schema<IOrderMilestone>(
  {
    name: { type: String, required: true },
    percentage: { type: Number, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'released', 'disputed'], default: 'pending' },
    releasedAt: { type: Date },
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true },
    buyerId: { type: Schema.Types.ObjectId, ref: 'Buyer', required: true },
    supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
    rfqId: { type: Schema.Types.ObjectId, ref: 'Rfq' },
    items: [orderItemSchema],
    subtotal: { type: Number, required: true, min: 0 },
    commission: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'USD' },
    milestones: [milestoneSchema],
    status: {
      type: String,
      enum: [
        'pending_payment', 'escrow', 'production', 'quality_check',
        'shipped', 'delivered', 'completed', 'disputed', 'cancelled', 'refunded',
      ],
      default: 'pending_payment',
    },
    ftaDealCode: { type: String },
    dutyRate: { type: Number },
    trackingNumber: { type: String },
    trackingUrl: { type: String },
    shippingCarrier: { type: String },
    estimatedDelivery: { type: Date },
    notes: { type: String },
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

orderSchema.index({ buyerId: 1, status: 1 });
orderSchema.index({ supplierId: 1, status: 1 });
orderSchema.index({ orderNumber: 1 });

export const Order = mongoose.model<IOrder>('Order', orderSchema);
