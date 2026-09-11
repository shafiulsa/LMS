// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_CONNECTION_STRING;

// if (!MONGODB_URI) {
//     throw new Error("Please define MONGODB_CONNECTION_STRING in your .env file");
// }

// let cached = global.mongoose;

// if (!cached) {
//     cached = global.mongoose = { conn: null, promise: null };
// }

// export async function dbConnect() {
//     if (cached.conn) {
//         return cached.conn;
//     }

//     if (!cached.promise) {
//         cached.promise = mongoose.connect(MONGODB_URI).then((mongooseInstance) => mongooseInstance);
//     }

//     cached.conn = await cached.promise;
//     return cached.conn;
// }
import mongoose from "mongoose";

export async function dbConnect(){
    try {
        const conn = await mongoose.connect(String(process.env.MONGODB_CONNECTION_STRING));
        return conn;
    } catch (error) {
        console.log(error)
    }
}
