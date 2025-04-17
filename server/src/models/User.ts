import { Schema, model, type Document } from 'mongoose';
import { type ICategory, categorySchema } from './Budget.js';
import bcrypt from 'bcrypt';

interface IUser extends Document {
  username: string;
  password: string;
  budget: [ICategory]
  isCorrectPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    budget: {
      type: [categorySchema],
      default: [],
    },
  },
);

// hash user password
userSchema.pre<IUser>('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const User = model<IUser>('User', userSchema);

export default User;
