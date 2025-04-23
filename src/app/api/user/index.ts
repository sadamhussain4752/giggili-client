'use server'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getUsers, createUser } from '@/services/userService'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const users = await getUsers()
    return res.status(200).json(users)
  }

  if (req.method === 'POST') {
    const user = await createUser(req.body)
    return res.status(201).json(user)
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
