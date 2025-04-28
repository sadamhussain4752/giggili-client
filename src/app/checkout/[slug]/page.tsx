'use client';

import React, { useEffect } from 'react';
import { use } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { VerifyOTP } from '@/reducer/thunks';

declare global {
  interface Window {
    Razorpay: any;
  }
}

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const CheckoutPage = ({ params }: Props) => {
  const { slug } = use(params);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (slug) {
      (async () => {
        try {
          await dispatch(VerifyOTP(slug));
        } catch (err) {
          console.error('Failed to verify OTP:', err);
        }
      })();
    }
  }, [dispatch, slug]);

  const { servicelist: artist, loadinglist, error } = useSelector((state: any) => state.servicelist);

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error('Razorpay SDK failed to load.'));
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      const res = await loadRazorpayScript();
      const finalAmount = Math.round((artist?.price || 0) * 1.18 * 100);

      if (!finalAmount) {
        alert('Invalid amount. Please try again later.');
        return;
      }

      const options = {
        key: 'rzp_test_SXk7LZqsBPpAkj', // Replace with your live key in production
        amount: finalAmount,
        currency: 'INR',
        name: artist.title || 'DJ Booking',
        description: `Booking Payment for ${artist?.title || 'Artist'}`,
        image: '/logo.png',
        handler: function (response: any) {
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
          // Optionally: call your backend to verify the payment
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
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Something went wrong during payment.');
    }
  };

  if (loadinglist) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-20">{error}</div>;
  if (!artist) return <div className="text-center py-20">No service found. Please try again.</div>;

  // ----------- CALCULATION FIXED 👇 ------------
  const sessionPrice = Number(artist?.price) || 0;
  const additionalServicePrice = 200;
  const subtotal = sessionPrice + additionalServicePrice;
  
  const tax = parseFloat((subtotal * 0.18).toFixed(2)); // ✅ Correct way
  const total = parseFloat((subtotal + tax).toFixed(2)); // ✅ Correct way
  
  // ---------------------------------------------

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

          <div className="mb-4">
            <h3 className="font-semibold text-lg">{artist?.title}</h3>
            <p className="text-sm text-gray-500">Artist: {artist?.title}</p>
          </div>

          <div className="flex justify-between py-2 border-t text-sm">
            <span>90 minutes session</span>
            <span></span>
            <span>₹{sessionPrice.toFixed(2)} {"× 1"}</span>
          </div>

          <div className="flex justify-between py-2 text-sm">
            <span>Lighting Setup</span>
            <span>₹{additionalServicePrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between py-2 text-sm border-t">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between py-2 text-sm">
            <span>Tax (18%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between py-3 font-bold text-lg border-t mt-2">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <div className="flex mt-4 gap-2">
            <Input placeholder="Enter Coupon Code" />
            <Button className="bg-orange-500 text-white hover:bg-orange-600">Apply</Button>
          </div>

          <Button
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white"
            onClick={handlePayment}
          >
            Proceed to Pay ₹{total.toFixed(2)}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
