import type IUserContext from '../interfaces/UserContext.js';
import type IUserDocument from '../interfaces/UserDocument.js';
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
      _parent: any,
      {
        categoryName,
        subcategoryInput: { name, amount },
      }: { categoryName: string; subcategoryInput: { name: string; amount: number } },
      context: IUserContext
    ) => {
      if (!context.user) {
        throw new AuthenticationError('User not authenticated');
      }
    
      const user = await User.findById(context.user._id);
    
      if (!user) {
        throw new Error('User not found');
      }
    
      if (!user.budget) {
        throw new Error('User has no budget');
      }
    
      // Find the category by name
      const category = user.budget.find(
        (cat: any) => cat.name === categoryName
      );
    
      if (!category) {
        throw new Error('Category not found');
      }
    
      // Find if the subcategory already exists
      const existingSubcategory = category.subcategories.find(
        (subcat: any) => subcat.name === name
      );
    
      if (existingSubcategory) {
        existingSubcategory.amount = amount;
      } else {
        category.subcategories.push({ name, amount });
      }
    
      await user.save();
      return category;
    },
  },
};

export default resolvers;
