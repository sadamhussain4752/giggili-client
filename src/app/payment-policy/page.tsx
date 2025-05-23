// pages/policies/payment.js

import Head from 'next/head';

export default function PaymentPolicy() {
  return (
    <>
      <Head>
        <title>Payment Policy | Giggili</title>
        <meta
          name="description"
          content="Read about the payment policy for bookings made on Giggili.in or Giggili.com."
        />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Payment Policy</h1>

        <ul className="list-disc list-inside space-y-4">
          <li>
            Customers must ensure that the event is legal and free of legal or administrative hurdles for the artist to perform.
          </li>
          <li>
            Customers agree to provide all necessary equipment and facilities required for the artist to perform their service.
          </li>
          <li>
            For non-‘express delivery’ bookings, cancellations up to <strong>7 days prior</strong> to the event qualify for a <strong>full refund</strong>. Within 7 days and up to 48 hours before the event, a <strong>50% refund</strong> is applicable. Refer to the <a href="/policies/cancellation" className="text-blue-600 underline">Refunds & Cancellation Policy</a> for more.
          </li>
          <li>
            Giggili.in and Giggili.com may arrange an <strong>alternative artist</strong> with customer approval in case of logistical issues.
          </li>
          <li>
            If Giggili cancels the booking within <strong>24 to 48 hours</strong> of the event, customers will receive a <strong>full refund plus 30%</strong> of the booking amount.
          </li>
          <li>
            For COD (Cash on Delivery) bookings, full payment must be made to the artist <strong>before the event starts</strong>.
          </li>
          <li>
            ‘Express delivery’ bookings do not support COD due to their time-sensitive nature.
          </li>
          <li>
            For questions, email us at <a href="mailto:contact@giggili.com" className="text-blue-600 underline">contact@giggili.com</a>. For cancellation and refund policies, please refer to the <a href="/policies/cancellation" className="text-blue-600 underline">appropriate policy page</a>.
          </li>
        </ul>
      </main>
    </>
  );
}
