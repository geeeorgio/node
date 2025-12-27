import mongoose from 'mongoose';

const { MONGO_DB_URL } = process.env;

export const connectDatabase = async () => {
  if (!MONGO_DB_URL) {
    throw new Error('❌ MONGO_DB_URL is not defined in .env file');
  }

  try {
    await mongoose.connect(MONGO_DB_URL.trim());

    console.warn(`✅ MongoDB connected: ${mongoose.connection.name}`);
  } catch (e) {
    const message =
      e instanceof Error
        ? `❌ Error connecting database: ${e.message}`
        : '⁉️ Something went wrong during DB connection';

    console.error(message);
    throw e;
  }
};

const gracefulShutdown = async () => {
  if (mongoose.connection.readyState !== 0) {
    console.warn('\n🔌 Shutting down gracefully...');
    try {
      await mongoose.disconnect();
      console.warn('✅ Database connection closed');
    } catch (err) {
      console.error('❌ Error during DB disconnection:', err);
    }
  }
  process.exit(0);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
