// app/users/actions.ts
'use server'


import User from '@/models/User'
import { connectToDB } from '@/lib/mongo'

export async function getUsers() {
  await connectToDB()
  return await User.find()
}

export async function getUserById(id: string) {
  await connectToDB()
  return await User.findById(id)
}

export async function createUser(data: any) {
  await connectToDB()
  return await User.create(data)
}

export async function updateUser(id: string, data: any) {
  await connectToDB()
  return await User.findByIdAndUpdate(id, data, { new: true })
}

export async function deleteUser(id: string) {
  await connectToDB()
  return await User.findByIdAndDelete(id)
}
