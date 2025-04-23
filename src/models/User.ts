import mongoose, { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
  name: { type: String, required: true },
  artist_name: { type: String, default: null },
  email: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, default: null },
  otp_code: { type: String, default: null },
  otp_verified: { type: Boolean, default: false },
  image: { type: String, default: null },
  profile_background: { type: String, default: null },
  service_city: { type: String, default: null },
  service_area: { type: String, default: null },
  user_type: { type: Number, enum: [0, 1], default: 0 }, // 0 = seller, 1 = buyer
  seller_type: { type: Number, enum: [0, 1], default: 0 }, // 0 = individual, 1 = business
  user_status: { type: Number, default: 0 }, // add default or custom enum if needed
}, {
  timestamps: true // adds createdAt and updatedAt
})

export default models.User || model('User', userSchema)
