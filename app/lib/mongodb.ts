import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client
      .connect()
      .then((client) => {
        console.log("Connected successfully to MongoDB");
        return client;
      })
      .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
        console.error("Connection URI:", uri);
        throw err;
      });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri);
  clientPromise = client
    .connect()
    .then((client) => {
      console.log("Connected successfully to MongoDB");
      return client;
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
      console.error("Connection URI:", uri);
      throw err;
    });
}

export default clientPromise;
