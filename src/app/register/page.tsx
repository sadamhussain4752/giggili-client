'use client'

import React, { useState } from "react";

const Register: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        {/* Stepper */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full ${
                  step === s
                    ? "bg-orange-500 text-white"
                    : "border border-gray-300 text-gray-400"
                }`}
              >
                {s}
              </div>
              {s !== 3 && (
                <div className="w-8 h-1 bg-gray-300 mx-2"></div>
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {step === 1 && (
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Full Name *</label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">User Name *</label>
              <input
                type="text"
                placeholder="User Name"
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email Address *</label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Phone Number *</label>
              <div className="flex items-center">
                <span className="px-3 py-2 border border-r-0 rounded-l-md bg-gray-100">
                   +91
                </span>
                <input
                  type="text"
                  placeholder="81234 56789"
                  className="w-full border px-4 py-2 rounded-r-md"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium">Password *</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Confirm Password *</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>

            <div className="md:col-span-2 text-right mt-4">
              <button
                type="button"
                onClick={nextStep}
                className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
              >
                Next
              </button>
            </div>
          </form>
        )}

{step === 2 && (
  <div>
    <h2 className="text-xl font-bold mb-6">Step 2: Service Information</h2>

    {/* Service Country */}
    <div className="mb-4">
      <label className="block mb-1 font-medium">Service Country *</label>
      <select className="w-full border px-4 py-2 rounded-md">
        <option value="">Select Country</option>
        <option value="india">India</option>
        <option value="usa">USA</option>
        {/* Add more countries here */}
      </select>
    </div>

    {/* Service City */}
    <div className="mb-4">
      <label className="block mb-1 font-medium">Service City *</label>
      <select className="w-full border px-4 py-2 rounded-md">
        <option value="">Select City</option>
        <option value="bangalore">Bangalore</option>
        <option value="mumbai">Mumbai</option>
        {/* Add more cities here */}
      </select>
    </div>

    {/* Service Area */}
    <div className="mb-4">
      <label className="block mb-1 font-medium">Service Area *</label>
      <select className="w-full border px-4 py-2 rounded-md">
        <option value="">Select Service Area</option>
        <option value="north-bangalore">North Bangalore</option>
        <option value="south-bangalore">South Bangalore</option>
        <option value="east-bangalore">East Bangalore</option>
        <option value="west-bangalore">West Bangalore</option>
      </select>
    </div>

    <div className="flex justify-between">
      <button
        onClick={prevStep}
        className="px-6 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
      >
        Back
      </button>
      <button
        onClick={nextStep}
        className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
      >
        Next
      </button>
    </div>
  </div>
)}


{step === 3 && (
  <div>
    <h2 className="text-xl font-bold mb-6">Step 3: Terms & Condition</h2>
    
    {/* Terms & Conditions */}
    <div className="mb-6">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="terms"
          className="mr-2"
        />
        <label htmlFor="terms" className="text-sm text-gray-600">
          I agree to the <a href="/terms" className="text-blue-500 underline">Terms & Conditions</a>
        </label>
      </div>
    </div>

    <div className="flex justify-between">
      <button
        onClick={prevStep}
        className="px-6 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
      >
        Back
      </button>
      <button
        type="submit"
        disabled={!document.getElementById('terms')}
        className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-300"
      >
        Submit
      </button>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default Register;
