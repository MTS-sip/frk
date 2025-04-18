import type IUserContext from '../interfaces/UserContext.js';
import type IUserDocument from '../interfaces/UserDocument.js';
import { User } from '../models/index.js';
import { signToken, AuthenticationError } from '../services/auth-service.js';
import type { ISubcategory } from '../models/Budget.js';

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: IUserContext): Promise<IUserDocument | null> => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
        return userData;
      }
      throw new AuthenticationError('User not authenticated');
    },

    getBudget: async (_parent: any, _args: any, context: IUserContext) => {
      if (!context.user) {
        throw new AuthenticationError('User not authenticated');
      }

      const user = await User.findById(context.user._id);
      if (!user || !user.budget) {
        throw new Error('User or budget not found');
      }

      return user.budget;
    },
  },

  Mutation: {
    login: async (
      _parent: any,
      { username, password }: { username: string; password: string }
    ): Promise<{ token: string; user: IUserDocument }> => {
      const user = await User.findOne({ username });

      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(user.username, user._id);
      return { token, user };
    },

    signup: async (
      _parent: any,
      { username, password }: { username: string; password: string }
    ): Promise<{ token: string; user: IUserDocument }> => {
      const existing = await User.findOne({ username });
      if (existing) {
        throw new Error('Username already taken');
      }

      const newUser = new User({ username, password });
      await newUser.save();

      const token = signToken(newUser.username, newUser._id);
      return { token, user: newUser };
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
      if (!user) throw new Error('User not found');
      if (!user.budget) throw new Error('User has no budget');

      const category = user.budget.find(cat => cat.name === categoryName);
      if (!category) throw new Error('Category not found');

      const existingSubcategory = category.subcategories.find(
        subcat => subcat.name === name
      );

      if (existingSubcategory) {
        existingSubcategory.amount = amount;
      } else {
        const newSubcategory = { name, amount } as ISubcategory;
        category.subcategories.push(newSubcategory);
      }

      await user.save();
      return category;
    },
  },
};

export default resolvers;