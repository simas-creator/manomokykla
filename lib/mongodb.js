import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Throw an error if the MongoDB URI is not defined
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in the environment variables.");
}

const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already connected to MongoDB");
    return;
  }

  if (connectionState === 2) {
    console.log("Connecting to MongoDB...");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "mokykludata",
      bufferCommands: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connect;
