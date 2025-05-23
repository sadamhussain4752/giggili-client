// pages/policies/terms.js

import Head from 'next/head';

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Terms and Conditions | Giggili</title>
        <meta name="description" content="Read the terms and conditions for using Giggili's services." />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Terms and Conditions</h1>

        <section className="space-y-4">
          <p>
            This page states the Terms and Conditions under which you (Visitor) may visit this website. Please read this page carefully.
            If you do not accept the Terms and Conditions stated here, we request you to exit this site. Giggili Event Management, any of its business divisions and/or its subsidiaries or associate companies (in India or abroad),
            reserve the right to revise these Terms at any time by updating this posting. You should revisit this page periodically as these Terms are binding on all users.
          </p>

          <p>
            Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.
            These Terms apply to all visitors, users and others who access or use the Service.
            By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part, you may not access the Service.
          </p>

          <h2 className="text-2xl font-semibold mt-6">Content</h2>
          <p>
            You may not sell, modify, reproduce, display, publicly perform, distribute, or otherwise use the materials on this website for any public or commercial purpose without written permission from Giggili.
          </p>

          <h2 className="text-2xl font-semibold mt-6">Accounts</h2>
          <p>
            When you create an account with us, you must provide accurate, complete, and up-to-date information.
            Failure to do so constitutes a breach of the Terms and may result in immediate termination of your account.
            You are responsible for safeguarding your password and for all actions under your account. You agree not to disclose your password to any third party.
            Please notify us immediately upon becoming aware of any breach or unauthorized use of your account.
          </p>

          <h2 className="text-2xl font-semibold mt-6">Links to Other Websites</h2>
          <p>
            Our service may contain links to third-party websites or services that are not owned or controlled by Giggili Event Management.
            We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party sites or services.
            You acknowledge and agree that Giggili shall not be responsible or liable for any damage or loss caused or alleged to be caused by your use of or reliance on any such content or services.
            We recommend you read the terms and policies of any third-party sites you visit.
          </p>

          <h2 className="text-2xl font-semibold mt-6">Termination</h2>
          <p>
            We may terminate or suspend access to our service without prior notice for any reason, including violation of these Terms.
            Upon termination, your right to use the service will cease immediately. You may also terminate your account by discontinuing use of the service.
            All provisions of these Terms which should survive termination will survive, including ownership, disclaimers, indemnity, and limitations of liability.
          </p>

          <h2 className="text-2xl font-semibold mt-6">Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of Karnataka, India, without regard to its conflict of law provisions.
            Our failure to enforce any provision will not be considered a waiver. If any provision is found invalid, the rest of the Terms remain in effect.
            These Terms represent the entire agreement between us regarding the service and supersede any prior agreements.
          </p>

          <h2 className="text-2xl font-semibold mt-6">Changes</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will attempt to provide 30 days’ notice.
            What constitutes a material change is at our sole discretion. Continued use of the service after changes become effective constitutes your acceptance of the new Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-6">Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at <a href="mailto:contact@giggili.in" className="text-blue-600 underline">contact@giggili.in</a>.
          </p>
        </section>
      </main>
    </>
  );
}
