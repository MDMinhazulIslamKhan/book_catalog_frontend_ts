import { IUser } from "./user";

export type IBook = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
  publisher: IUser;
  reviews: Array<{ name: string; review: string }>;
};
