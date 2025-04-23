import mongoose, { Schema, model, models } from 'mongoose'

const orderSchema = new Schema({
  item: String,
  status: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

export default models.Order || model('Order', orderSchema)
