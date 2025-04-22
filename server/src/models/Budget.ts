import { Schema, model, type Document } from 'mongoose';

// Subcategory interface + schema
export interface ISubcategory extends Document {
  name: string;
  amount: number;
}

export const subcategorySchema = new Schema<ISubcategory>({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
});

// Category interface + schema
export interface ICategory extends Document {
  name: string;
  subcategories: ISubcategory[];
}

export const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  subcategories: {
    type: [subcategorySchema],
    default: [],
    required: true,
  },
});

// chs added default export 
const Category = model<ICategory>('Category', categorySchema);
export default Category;