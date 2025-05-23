// pages/policies/cancellation.js

import Head from 'next/head';

export default function CancellationPolicy() {
  return (
    <>
      <Head>
        <title>Cancellation, Refund & Rescheduling Policy | Giggili</title>
        <meta
          name="description"
          content="Cancellation, refund and rescheduling policy for bookings made on Giggili."
        />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Cancellation, Refund & Rescheduling Policy</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Cancellation by Client</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>More than 7 days before the event: <strong>Full refund</strong>.</li>
            <li>Within 7 days of the event: <strong>50% refund</strong> of the total booking amount.</li>
            <li>Within 48 hours of the event: <strong>No refund</strong> will be issued.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Cancellation by Giggili</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>If the booking is cancelled by Giggili due to unforeseen circumstances, clients will receive a <strong>full refund</strong>.</li>
            <li>
              If an artist or service provider is unavailable due to reasons beyond control, we will:
              <ul className="list-disc list-inside ml-6">
                <li>Find an alternative artist or service of equivalent value, or</li>
                <li>Issue a <strong>full refund</strong> at the client’s request.</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Refund Policy</h2>
          <h3 className="text-xl font-medium mt-4">Eligibility for Refund:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Refund requests can only be made if the booking is cancelled as per the above policy.</li>
            <li>Refunds will be processed to the original payment method within <strong>4–7 business days</strong>.</li>
            <li><strong>Express bookings</strong> are non-refundable.</li>
          </ul>

          <h3 className="text-xl font-medium mt-6">Non-Refundable Services:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Payments for services that have already been performed (e.g., completed performances).</li>
            <li>Custom/special request services already arranged (e.g., custom setups, travel bookings for artists).</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Force Majeure Clause</h2>
          <p>
            In the event of force majeure (natural disasters, government restrictions, or events beyond our control),
            both the client and Giggili are relieved of liability. Clients will be offered rescheduling or a full refund
            if the event cannot proceed.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Rescheduling Policy</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Clients can reschedule their booking up to 7 days before the event <strong>at no extra cost</strong>.</li>
            <li>Rescheduling within 7 days of the event may incur a <strong>10% rescheduling fee</strong>.</li>
          </ul>
        </section>
      </main>
    </>
  );
}
