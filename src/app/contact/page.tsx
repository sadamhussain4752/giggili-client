'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MapPin, Phone, AtSign } from 'lucide-react'

const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  // Submit effect
  useEffect(() => {
    if (!submitted) return

    const sendMessage = async () => {
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        })

        if (!res.ok) throw new Error('Something went wrong')
        console.log('Message sent!')
      } catch (error) {
        console.error('Send error:', error)
      } finally {
        setSubmitted(false)
      }
    }

    sendMessage()
  }, [submitted, form])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setForm((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground">
            Have questions or need support? Reach out to us using any of the methods below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <Input id="name" value={form.name} onChange={handleChange} placeholder="Enter your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input id="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter your email" />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <Input id="subject" value={form.subject} onChange={handleChange} placeholder="What is this regarding?" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="How can we help you?"
                />
              </div>

              <Button className="w-full" type="submit">Send Message</Button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Office Address</h3>
                  <p className="text-muted-foreground">Bengaluru Urban, Karnataka, 560002</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone Number</h3>
                  <p className="text-muted-foreground">+91 81233 82771</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <AtSign className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email Address</h3>
                  <p className="text-muted-foreground">contact@giggili.com</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold mb-3">Our Office Hours</h3>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Monday - Friday</td>
                    <td className="py-2 text-right">9:00 AM - 6:00 PM</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Saturday</td>
                    <td className="py-2 text-right">10:00 AM - 4:00 PM</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Sunday</td>
                    <td className="py-2 text-right">Closed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
