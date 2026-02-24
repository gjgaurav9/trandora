import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ISupplier extends Document {
  userId: Types.ObjectId;
  businessName: string;
  slug: string;
  description?: string;
  businessType?: string;
  yearEstablished?: number;
  employeeCount?: string;
  annualRevenue?: string;
  address: {
    street?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  location?: {
    type: 'Point';
    coordinates: [number, number];
  };
  gstNumber?: string;
  panNumber?: string;
  iecCode?: string;
  gstVerified: boolean;
  panVerified: boolean;
  trustScore: number;
  trustTier: 'basic' | 'silver' | 'gold' | 'platinum';
  responseRate: number;
  avgResponseTime: number;
  categories: Types.ObjectId[];
  exportMarkets: string[];
  certifications: string[];
  website?: string;
  contactEmail?: string;
  contactPhone?: string;
  subscriptionTier: 'free' | 'starter' | 'professional' | 'enterprise';
  isActive: boolean;
}

const supplierSchema = new Schema<ISupplier>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    businessName: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, trim: true },
    businessType: { type: String, trim: true },
    yearEstablished: { type: Number },
    employeeCount: { type: String },
    annualRevenue: { type: String },
    address: {
      street: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, required: true, default: 'India' },
    },
    location: {
      type: { type: String, enum: ['Point'] },
      coordinates: { type: [Number] },
    },
    gstNumber: { type: String, trim: true },
    panNumber: { type: String, trim: true },
    iecCode: { type: String, trim: true },
    gstVerified: { type: Boolean, default: false },
    panVerified: { type: Boolean, default: false },
    trustScore: { type: Number, default: 0, min: 0, max: 100 },
    trustTier: {
      type: String,
      enum: ['basic', 'silver', 'gold', 'platinum'],
      default: 'basic',
    },
    responseRate: { type: Number, default: 0 },
    avgResponseTime: { type: Number, default: 0 },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    exportMarkets: [{ type: String }],
    certifications: [{ type: String }],
    website: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String },
    subscriptionTier: {
      type: String,
      enum: ['free', 'starter', 'professional', 'enterprise'],
      default: 'free',
    },
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

supplierSchema.index({ location: '2dsphere' });
supplierSchema.index({ businessName: 'text', description: 'text' });
supplierSchema.index({ trustScore: -1 });
supplierSchema.index({ categories: 1 });

export const Supplier = mongoose.model<ISupplier>('Supplier', supplierSchema);
