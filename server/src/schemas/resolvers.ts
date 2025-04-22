import { User } from '../models/index.js';  // Adjust the import path as needed
import { signToken, AuthenticationError } from '../utils/auth.js';

interface Book {
  bookId: string;
  authors?: string[];
  description?: string;
  title: string;
  image?: string;
  link?: string;
}

interface UserType {
  _id: string;
  username: string;
  email: string;
  password: string;
  savedBooks: Book[];
  bookCount: number;
}

interface UserArgs {
  userId: string;
}

interface AddUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
  };
}

interface SaveBookArgs {
  input: Book;
}

interface DeleteBookArgs {
  bookId: string;
}

interface Context {
  user?: UserType;
}

const resolvers = {
  Query: {
    users: async (): Promise<UserType[]> => {
      return await User.find();
    },
    user: async (_parent: any, { userId }: UserArgs): Promise<UserType | null> => {
      return await User.findOne({ _id: userId });
    },
    me: async (_parent: any, _args: any, context: Context): Promise<UserType | null> => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You are not authenticated');
    },
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs): Promise<{ token: string; user: UserType }> => {
      const user = await User.create({ ...input });
      const token = signToken(user.username, user.email, user._id);
      return { token, user: user.toObject() as UserType };  // `toObject()` for plain JavaScript object
    },
    login: async (_parent: any, { email, password }: { email: string; password: string }): Promise<{ token: string; user: UserType }> => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user found with this email');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect password');
      }
      const token = signToken(user.username, user.email, (user._id as string));
      return { token, user: user.toObject() as UserType };  // `toObject()` for plain JavaScript object
    },
    saveBook: async (_parent: any, { input }: SaveBookArgs, context: Context): Promise<UserType | null> => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: input } },
          { new: true, runValidators: true }
        ).lean();

        return updatedUser ? { ...updatedUser, _id: updatedUser._id.toString() } as UserType : null;
      }
      throw new AuthenticationError('You are not authenticated');
    },
    deleteBook: async (_parent: any, { bookId }: DeleteBookArgs, context: Context): Promise<UserType | null> => {
      if (context.user) {
         await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        ).lean();
      }
      throw new AuthenticationError('You are not authenticated');
    }
  },
};

export default resolvers;
