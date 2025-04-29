'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useCallback, useEffect, useState } from 'react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutPage = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [country, setCountry] = useState('India');
  const [city, setCity] = useState('Bangalore');
  const [area, setArea] = useState('');

  const packageFee = 500;
  const lightingFee = 200;
  const subtotal = packageFee + lightingFee;
  const tax = (subtotal - discount) * 0.18;
  const total = subtotal - discount + tax;

  useEffect(() => {
    const loadRazorpayScript = async () => {
      if (window.Razorpay) {
        setScriptLoaded(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => setScriptLoaded(true);
      script.onerror = () => {
        setScriptLoaded(false);
        alert('Razorpay SDK failed to load.');
      };
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []);

  const handlePayment = useCallback(() => {
    if (!scriptLoaded) {
      alert('Razorpay SDK not loaded');
      return;
    }

    const options = {
      key: 'rzp_test_SXk7LZqsBPpAkj',
      amount: Math.round(total * 100), // in paise
      currency: 'INR',
      name: 'DJ Booking',
      description: 'Booking Payment',
      image: '/logo.png',
      handler(response: any) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);

        const bookingData = {
          id: '0',
          invoice: '',
          service_id: '415',
          seller_id: '2229',
          buyer_id: '2230',
          name: 'Keshan Vishwajith',
          email: 'vishwajithkeshan2@gmail.com',
          phone: '0714889725',
          post_code: '20250',
          address: 'No 16/2/b/1, Galwala rd,Polgolla',
          city: city,
          area: area,
          country: country,
          date: new Date().toDateString(),
          schedule: '10:00Am - 02:00PM',
          package_fee: '4000',
          extra_service: '0',
          sub_total: '4000',
          tax: '360',
          total: '4360',
          coupon_code: coupon,
          coupon_type: '',
          coupon_amount: '0',
          commission_type: 'percentage',
          commission_charge: '10',
          commission_amount: '400',
          payment_gateway: 'razorpay',
          payment_status: 'paid',
          status: '1',
          is_order_online: '1',
          transaction_id: response.razorpay_payment_id,
          created_at: new Date().toISOString(),
        };
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
  }, [scriptLoaded, total]);

  const applyCoupon = () => {
    if (coupon.toLowerCase() === 'save100') {
      setDiscount(100);
    } else {
      alert('Invalid coupon');
      setDiscount(0);
    }
  };

  return (
    <div className="min-h-screen bg-white py-10 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left - Form */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Event Country</label>
              <Input value={country} onChange={(e) => setCountry(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Event City</label>
              <Input value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Event Area</label>
              <select
                className="w-full border px-4 py-2 rounded-md"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              >
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

        {/* Right - Summary */}
        <div className="border p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Booking Summary</h2>

          <div className="mb-2">
            <h3 className="font-semibold">DJ Vihaan</h3>
            <p className="text-sm text-muted-foreground">Artist Name: Om Vats</p>
          </div>

          <div className="flex justify-between py-2 border-t text-sm">
            <span>90 minutes session</span>
            <span className="text-muted-foreground">× 1</span>
            <span>₹{packageFee.toFixed(2)}</span>
          </div>

          <div className="flex justify-between py-2 border-b text-sm">
            <span>Package Fee</span>
            <span>₹{packageFee.toFixed(2)}</span>
          </div>

          <h4 className="mt-4 font-semibold">Additional Service</h4>
          <div className="flex justify-between py-2 text-sm">
            <span>Lighting Setup</span>
            <span>₹{lightingFee.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between py-2 text-sm text-green-600">
              <span>Coupon Discount</span>
              <span>-₹{discount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between py-2 text-sm">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between py-2 text-sm">
            <span>Tax (+18%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between py-3 font-bold text-lg border-t mt-2">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <div className="flex mt-4 gap-2">
            <Input
              placeholder="Enter Coupon Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <Button className="bg-orange-500 text-white hover:bg-orange-600" onClick={applyCoupon}>
              Apply
            </Button>
          </div>

          <Button
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white"
            onClick={handlePayment}
            disabled={!scriptLoaded}
          >
            Proceed to Pay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
