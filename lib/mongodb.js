import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Throw an error if the MongoDB URI is not defined
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in the environment variables.");
}

const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  // Check if we're already connected
  if (connectionState === 1) {
    console.log("Already connected to MongoDB");
    return mongoose.connection; // Return the active connection
  }

  // If we're in the process of connecting, just return
  if (connectionState === 2) {
    console.log("Connecting to MongoDB...");
    return mongoose.connection; // Return the connection object even though it's not fully established yet
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "mokykludata",
      bufferCommands: true,
    });
    console.log("Connected to MongoDB");

    return mongoose.connection; // Ensure we return the connection object when the connection is successful
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB.");
  }
};

export default connect;
