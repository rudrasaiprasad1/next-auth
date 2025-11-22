import mongoose from "mongoose";

export async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("mongodb connected ✅");
    });
    connection.on("error", () => {
      console.log("mongodb connection error ✖ ");
      process.exit();
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.name} : ${error.message}`);
    }
  }
}
