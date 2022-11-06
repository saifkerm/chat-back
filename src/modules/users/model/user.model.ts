import { Document, Schema, Model, model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export const SUser = new Schema<IUser>({
  email: { type: Schema.Types.String },
  firstName: { type: Schema.Types.String },
  lastName: { type: Schema.Types.String },
  password: { type: Schema.Types.String },
});

export const MUser: Model<IUser> = model<IUser>('User', SUser);