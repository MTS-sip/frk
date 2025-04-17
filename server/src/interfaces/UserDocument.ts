import type { ICategory } from "../models/Budget";

export default interface IUserDocument {
  username: string | null;
  password: string | null;
  budget: [ICategory] | null;
}
