'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutPage = () => {
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      key: 'rzp_test_SXk7LZqsBPpAkj', // Replace with your Razorpay key
      amount: 50000, // Amount in paise (₹500 = 50000)
      currency: 'INR',
      name: 'DJ Booking',
      description: 'Booking Payment',
      image: '/logo.png', // Optional: Your logo
      handler: function (response: any) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        // You can verify payment or redirect from here
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#F97316',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-white py-10 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side - Form */}
        <div className="space-y-6">
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <div>
      <label className="block text-sm font-medium mb-1">Event Country</label>
      <Input placeholder="India" />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Event City</label>
      <Input placeholder="Bangalore" />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Event Area</label>
      <select className="w-full border px-4 py-2 rounded-md">
        <option value="">Select Area</option>
        <option value="north-bangalore">North Bangalore</option>
        <option value="south-bangalore">South Bangalore</option>
        <option value="east-bangalore">East Bangalore</option>
        <option value="west-bangalore">West Bangalore</option>
      </select>
    </div>
  </div>

  <Button className="bg-orange-500 hover:bg-orange-600 text-white w-fit mt-4">
    Sign In
  </Button>
</div>


        {/* Right Side - Booking Summary */}
        <div className="border p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Booking Summary</h2>

          <div className="mb-2">
            <h3 className="font-semibold">DJ Vihaan</h3>
            <p className="text-sm text-muted-foreground">Artist Name: Om Vats</p>
          </div>

          <div className="flex justify-between py-2 border-t text-sm">
            <span>90 minutes session</span>
            <span className="text-muted-foreground">× 1</span>
            <span>₹500.00</span>
          </div>

          <div className="flex justify-between py-2 border-b text-sm">
            <span>Package Fee</span>
            <span>₹500.00</span>
          </div>

          <h4 className="mt-4 font-semibold">Additional Service</h4>
          <div className="flex justify-between py-2 text-sm">
            <span>Lighting Setup</span>
            <span>₹200.00</span>
          </div>

          <div className="flex justify-between py-2 text-sm">
            <span>Subtotal</span>
            <span>₹700.00</span>
          </div>

          <div className="flex justify-between py-2 text-sm">
            <span>Tax (+18%)</span>
            <span>₹126.00</span>
          </div>

          <div className="flex justify-between py-3 font-bold text-lg border-t mt-2">
            <span>Total</span>
            <span>₹826.00</span>
          </div>

          <div className="flex mt-4 gap-2">
            <Input placeholder="Enter Coupon Code" />
            <Button className="bg-orange-500 text-white hover:bg-orange-600">Apply</Button>
          </div>

          <Button
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white"
            onClick={handlePayment}
          >
            Proceed to Pay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
