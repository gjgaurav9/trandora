import mongoose, { Schema, Document, Types } from 'mongoose';

interface IProductImage {
  url: string;
  alt?: string;
  isPrimary: boolean;
}

export interface IProduct extends Document {
  supplierId: Types.ObjectId;
  categoryId: Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  specifications: Map<string, string>;
  priceMin: number;
  priceMax: number;
  currency: string;
  moq: number;
  unit: string;
  hsCode?: string;
  exportMarkets: string[];
  images: IProductImage[];
  status: 'draft' | 'active' | 'paused' | 'archived';
  tags: string[];
  viewCount: number;
  inquiryCount: number;
}

const productImageSchema = new Schema<IProductImage>(
  {
    url: { type: String, required: true },
    alt: { type: String },
    isPrimary: { type: Boolean, default: false },
  },
  { _id: false }
);

const productSchema = new Schema<IProduct>(
  {
    supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true, index: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    specifications: { type: Map, of: String, default: {} },
    priceMin: { type: Number, required: true, min: 0 },
    priceMax: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'INR' },
    moq: { type: Number, required: true, min: 1 },
    unit: { type: String, required: true, default: 'pieces' },
    hsCode: { type: String },
    exportMarkets: [{ type: String }],
    images: [productImageSchema],
    status: {
      type: String,
      enum: ['draft', 'active', 'paused', 'archived'],
      default: 'draft',
    },
    tags: [{ type: String }],
    viewCount: { type: Number, default: 0 },
    inquiryCount: { type: Number, default: 0 },
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

productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ status: 1, categoryId: 1 });
productSchema.index({ supplierId: 1, status: 1 });

export const Product = mongoose.model<IProduct>('Product', productSchema);
