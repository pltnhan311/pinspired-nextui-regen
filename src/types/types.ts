import { FieldError, UseFormRegister } from 'react-hook-form';

export type FormData = {
  email: string;
  password: string;
};

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  autoFocus?: boolean;
};

export type ValidFieldNames = 'email' | 'password';

export interface IUserData {
  _id: string;
  FullName?: string;
  UserName: string;
  Password: string;
  Category: string[];
  Avatar: string;
  Email: string;
  Gender: string;
  Birthday: string;
  Role: string;
  FirstLogin: boolean;
  TypeLogin: string;
}

export interface IAttachment {
  Id: string;
  Thumbnail: string;
}

export interface IComment {
  _id: string;
  Content: string;
  Created: IUserData;
  CreatedAt: string;
}

export interface IPost {
  _id: string;
  Title: string;
  Description: string;
  TotalLike: number;
  TotalComment: number;
  IsComment: boolean;
  SimilarPosts: boolean;
  Created: Partial<IUserData>;
  Attachment: IAttachment;
  Comments: IComment[];
  Likes: IUserData[];
  IsPinned: boolean;
  Category: string[];
}

export interface IPostSaved {
  _id: string;
  Post: IPost;
  User: IUserData['_id'];
}
