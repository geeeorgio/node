import mongoose from 'mongoose';

const { MONGO_DB_URL } = process.env;

export const connectDatabase = async () => {
  try {
    if (MONGO_DB_URL) {
      await mongoose.connect(MONGO_DB_URL);
      console.warn('Database connected succesfully');
    }
  } catch (e) {
    const message =
      e instanceof Error
        ? `Error connecting database: ${e.message}`
        : 'Something went wrong';

    console.error(message);
    throw e;
  }
};
