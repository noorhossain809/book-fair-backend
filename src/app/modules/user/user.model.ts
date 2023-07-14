import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';

const userSchema = new Schema<IUser, UserModel>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['seller', 'buyer'],
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
    },
    income: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Pre-save hook to check uniqueness of phoneNumber
userSchema.pre<IUser>('save', async function (next) {
  const existingUser = await User.findOne({ phoneNumber: this.phoneNumber });
  if (existingUser) {
    throw new ApiError(StatusCodes.CONFLICT, 'Phone number already exists');
  }
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
