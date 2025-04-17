import type IUserContext from '../interfaces/UserContext.js';
import type IUserDocument from '../interfaces/UserDocument.js';
import { Category } from '../models/index.js';
import { User } from '../models/index.js';
import { signToken, AuthenticationError } from '../services/auth-service.js';

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: IUserContext): Promise<IUserDocument | null> => {
      
      if (context.user) {

        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
        return userData;
      }
      throw new AuthenticationError('User not authenticated');
    },
  },
  Mutation: {
    login: async (_parent: any, { username, password }: { username: string; password: string }): Promise<{ token: string; user: IUserDocument }> => {
      const user = await User.findOne({ username });

      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(user.username, user._id);
      return { token, user };
    },
    updateSubcategory: async (
      _: any,
      {
        categoryId,
        subcategoryInput: { name, amount },
      }: { categoryId: string; subcategoryInput: { name: string; amount: number } }
    ) => {
      const category = await Category.findById(categoryId);
      if (!category) {
        throw new Error('Category not found');
      }

      const existingSubcategory = category.subcategories.find(
        (subcat) => subcat.name === name
      );

      if (existingSubcategory) {
        // Update amount if subcategory exists
        existingSubcategory.amount = amount;
      } else {
        // Add new subcategory
        category.subcategories.push({ name, amount } as any);
      }

      await category.save();
      return category;
    },
  },
};

export default resolvers;
