import mongoose from 'mongoose'

const MONGODB_URI = 'mongodb+srv://sadamimsolution:vx6gCgWoAijCKGR5@cluster0.hdud4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

let cached = (global as any).mongoose || { conn: null, promise: null }

export async function connectToDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => mongoose)
  }

  cached.conn = await cached.promise
  return cached.conn
}
