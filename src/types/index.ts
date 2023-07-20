export type IApiResponse<T> = {
  message: string | null;
  statusCode: number;
  success: boolean;
  data: T;
};
export type IApiErrorResponse = {
  errorMessages: Array<{ message: string }>;
  status: number;
  message: string;
  success: boolean;
};

export type IApiResponseWithPagination<T> = {
  message: string | null;
  statusCode: number;
  success: boolean;
  data: {
    meta: {
      page: number;
      limit: number;
      count: number;
    };
    data: T;
  };
};

export type IApiError = {
  status: number;
  data: {
    success: boolean;
    message: string;
    errorMessages?: [];
  };
};

export interface SearchData {
  page: number;
  limit: string;
  sortBy: string;
  sortOrder: string;
  searchTerm: string;
  exactSearch: string;
  matchSearch: string;
}

export interface LoginInputData {
  email: string;
  password: string;
}

export interface RegistrationInputData {
  email: string;
  password: string;
  name: { firstName: string; lastName: string };
}

export interface BookInputData {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
}
