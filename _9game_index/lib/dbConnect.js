/**
 * Header Comment Block: what, who, where, when, why, how
 * DB Connection
 * Programmer: Yu Sun Leung
 * Call by other when they need to connect the DB.
 * Version: 1, Date: 2022-04-01
 * Purpose: To connect the DB.
 * Data Structure:
 *      Const: cached (a global variable to record the connection status)
 *
 * Algorithm:
 *      Get login info.
 *      Check login info validation.
 *      Define global cache.
 *      Main Function:
 *          if is connected, return.
 *          if not connected, try to connect DB.
 *          return connection status.
 */

import mongoose from "mongoose"

// Get login info.
const MONGODB_URI = process.env.MONGODB_URI

// Check if login info is valid.
if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

// Initialize the global cache.
if (!cached) {
    cached = global.mongoose = {conn: null, promise: null}
}

// Main function.
async function dbConnect() {
    // Check if DB is connected.
    if (cached.conn) {
        return cached.conn
    }

    // Check if DB is not connected.
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        }

        // Connect DB.
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose
        })
    }

    // Return connection status.
    cached.conn = await cached.promise
    return cached.conn
}

export default dbConnect
