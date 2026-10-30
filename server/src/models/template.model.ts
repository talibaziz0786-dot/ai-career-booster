import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITemplate extends Document {
  name: string;
  type: string;
  fileUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const templateSchema = new Schema<ITemplate>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    fileUrl: { type: String },
  },
  { timestamps: true }
);

const Template: Model<ITemplate> = mongoose.models.Template || mongoose.model<ITemplate>("Template", templateSchema);
export default Template;
