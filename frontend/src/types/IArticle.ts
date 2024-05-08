import { ICategory } from "@/types/ICategory.ts";
import { IUser } from "./IUser";

export interface IArticle {
  id: number;
  title: string;
  description: string;
  user: IUser;
  category: ICategory;
  created_at: string;
}