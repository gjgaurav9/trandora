import mongoose, { Schema, Document } from 'mongoose';

export interface IHsCode extends Document {
  code: string;
  description: string;
  chapter: string;
  section?: string;
  unit?: string;
}

const hsCodeSchema = new Schema<IHsCode>(
  {
    code: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    chapter: { type: String, required: true },
    section: { type: String },
    unit: { type: String },
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

hsCodeSchema.index({ description: 'text' });
hsCodeSchema.index({ code: 1 });

export const HsCode = mongoose.model<IHsCode>('HsCode', hsCodeSchema);
