import mongoose, { Schema, model, models } from 'mongoose'

const blogSchema = new Schema({
  title: String,
  content: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

export default models.Blog || model('Blog', blogSchema)
