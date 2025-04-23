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

    getSubcategories: async (
      _parent: unknown,
      _args: Record<string, unknown>,
      context: IUserContext
    ): Promise<ISubcategory[]> => {
      if (!context.user) {
        throw new AuthenticationError('User not authenticated');
      }
    
      const user = await User.findById(context.user._id);
      if (!user || !user.budget) throw new Error('User or budget not found');
    
      // Flatten subcategories across all categories
      const allSubcategories = user.budget.flatMap((category) => category.subcategories);
      return allSubcategories;
    },
  
    getUser: async (
      _parent: unknown,
      _args: Record<string, unknown>,
      context: IUserContext
    ): Promise<IUserDocument> => {
      if (!context.user) {
        throw new AuthenticationError('User not authenticated');
      }

      const user = await User.findById(context.user._id).select('-__v -password');
      if (!user) {
        throw new Error('User not found');
      }

      return user;
    },

    getBudgetSummary: async (_parent: unknown, _args: Record<string, unknown>, context: IUserContext) => {
      if (!context.user) throw new AuthenticationError('User not authenticated');

      const user = await User.findById(context.user._id);
      if (!user || !user.budget) throw new Error('User or budget not found');

      const total = user.budget.reduce((acc, category) => {
        const categoryTotal = category.subcategories.reduce((sum, sub) => sum + sub.amount, 0);
        return acc + categoryTotal;
      }, 0);

      return {
        categories: user.budget,
        total,
      };
    }
  },

  Mutation: {
    login: async (
      _parent: any,
      { username, password }: { username: string; password: string }
    ): Promise<{ token: string; user: IUserDocument }> => {
      const user = await User.findOne({ username });

      // Debug output
      console.log("Login attempt:", username);
      console.log("User found:", !!user);
      if (user) {
        console.log("Password match?", await user.isCorrectPassword(password));
      }

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

      const defaultCategories = [
        { name: 'Income', subcategories: [] },
        { name: 'Housing', subcategories: [] },
        { name: 'Healthcare', subcategories: [] },
        { name: 'Rnr', subcategories: [] },
        { name: 'Food', subcategories: [] },
        { name: 'Transpo', subcategories: [] }
      ];

      const newUser = new User({ username, password, budget: defaultCategories });
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