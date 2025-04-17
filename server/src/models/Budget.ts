import { Schema, model, type Document } from 'mongoose';

interface ISubcategory extends Document {
    name: string;
    amount: number;
}

interface ICategory extends Document {
    name: string;
    subcategories: [ISubcategory];
  }
  
  const categorySchema = new Schema<ICategory>(
    {
        name: {
            type: String,
            required: true,
        },
        subcategories: [
            {
            name: {
                type: String,
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            },
            },
        ],
    },
  );

  const Category = model<ICategory>('Category', categorySchema);
  
  export { ICategory, ISubcategory, categorySchema };
  export default Category;