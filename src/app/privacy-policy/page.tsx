import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Giggili</title>
        <meta name="description" content="Read the privacy policy for Giggili.com to understand how we handle your personal data and ensure security." />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">
          We value the trust you place in us. That's why we insist upon the highest standards for secure transactions and customer information privacy. Please read the following statement to learn about our information gathering and dissemination practices.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Collection of Personally Identifiable Information and other Information</h2>
        <p className="mb-4">
          When you use our platforms (our website and application), we collect and store your personal information which is provided by you from time to time...
        </p>

        <p className="mb-4">
          In general, you can browse the Website without telling us who you are or revealing any personal information about yourself...
        </p>

        {/* Add each section similarly, breaking them up into <h2> and <p> blocks for readability */}

        <h2 className="text-xl font-semibold mt-6 mb-2">Use of Demographic / Profile Data / Your Information</h2>
        <p className="mb-4">
          We use personal information to provide the services you request...
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Cookies</h2>
        <p className="mb-4">
          A "cookie" is a small piece of information stored by a web server on a web browser so it can be later read back...
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Sharing of personal information</h2>
        <p className="mb-4">
          We may share personal information with our other corporate entities and affiliates...
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Security Precautions</h2>
        <p className="mb-4">
          Our Platforms have stringent security measures in place to protect the loss, misuse, and alteration of the information under our control...
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Grievance Redressal</h2>
        <p className="mb-4">
          For any grievance with respect to the service of our platform or the Service Provider you may lodge your complaint on <a href="mailto:contact@giggili.com" className="text-blue-600 underline">contact@giggili.com</a> or contact us through +91 8123382771...
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Your Consent</h2>
        <p className="mb-4">
          By using the Website and/or by providing your information, you consent to the collection and use of the information you disclose on our Platforms in accordance with this Privacy Policy...
        </p>
      </div>
    </>
  );
}
