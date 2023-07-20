import { IBook } from "./book";

export type IUser = {
  email: string;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  wishList: Array<{ book: IBook }>;
  bookList: Array<{ book: IBook; status: string }>;
};
