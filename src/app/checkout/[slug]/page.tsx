"use client";

import React, { useState, useEffect } from "react"; // Make sure useState is imported
import { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { VerifyOTP } from "@/reducer/thunks";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type FormData = {
  name: string;
  email: string;
  phone: string;
  postCode: string;
  address: string;
  bookingCategory: string;
  orderNote?: string;
};

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const CheckoutPage = ({ params }: Props) => {
  const { slug } = use(params);
  const dispatch = useDispatch<any>();
  // inside your CheckoutPage component
  const [bookingCategory, setBookingCategory] = useState("");
  const [formErrors, setFormErrors] = useState<{ bookingCategory?: string }>(
    {}
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  

  const {
    loading: getprofileUserLoading,
    loginerror: getprofileUserError,
    getprofile: getUserResponse,
  } = useSelector((state: any) => state.getprofile);

  

  const {
    servicelist: artist,
    loadinglist,
    error,
  } = useSelector((state: any) => state.servicelist);

  useEffect(() => {
    if (slug) {
      (async () => {
        try {
          await dispatch(VerifyOTP(slug));
        } catch (err) {
          console.error("Failed to verify OTP:", err);
        }
      })();
    }
  }, [dispatch, slug]);

  useEffect(() => {
    if (getUserResponse?.success && getUserResponse?.User) {
      reset({
        name: getUserResponse.User.name || "",
        email: getUserResponse.User.email || "",
        phone: getUserResponse.User.phone || "",
        address: getUserResponse.User.address || "",
        postCode: getUserResponse.User.post_code || "",
        bookingCategory: "", // you can set a default here if you want
      });
    }
  }, [getUserResponse, reset]);
  

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error("Razorpay SDK failed to load."));
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (data: FormData) => {
    try {
      const res = await loadRazorpayScript();
      const finalAmount = Math.round((artist?.price || 0) * 1.18 * 100);

      if (!finalAmount) {
        alert("Invalid amount. Please try again later.");
        return;
      }

      const options = {
        key: "rzp_test_SXk7LZqsBPpAkj", // Replace with your live key
        amount: finalAmount,
        currency: "INR",
        name: artist.title || "DJ Booking",
        description: `Booking Payment for ${artist?.title || "Artist"}`,
        image: "/logo.png",
        handler: function (response: any) {
          alert(
            `Payment Successful! Payment ID: ${response.razorpay_payment_id}`
          );
          // Optionally: call your backend to verify the payment
        },
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone,
        },
        theme: {
          color: "#F97316",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong during payment.");
    }
  };

  if (loadinglist) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-20">{error}</div>;
  if (!artist)
    return (
      <div className="text-center py-20">
        No service found. Please try again.
      </div>
    );

  const sessionPrice = Number(artist?.price) || 0;
  const additionalServicePrice = 200;
  const subtotal = sessionPrice + additionalServicePrice;
  const tax = parseFloat((subtotal * 0.18).toFixed(2));
  const total = parseFloat((subtotal + tax).toFixed(2));

  return (
    <div className="min-h-screen bg-white py-10 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side - Form */}
        <form onSubmit={handleSubmit(handlePayment)} className="space-y-6">
          {/* Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Event Country */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Event Country
              </label>
              <select
                className="w-full border px-4 py-2 rounded-md"
                {...register("bookingCategory", {
                  required: "Booking category is required",
                })}
              >
                <option value="">Select Country</option>
                <option value="india" selected>
                  India
                </option>
              </select>
            </div>

            {/* Event City */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Event City
              </label>
              <select className="w-full border px-4 py-2 rounded-md">
                <option value="">Select City</option>
                <option value="bangalore" defaultValue>
                  Bangalore
                </option>
              </select>
            </div>

            {/* Event Area */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Event Area
              </label>
              <select className="w-full border px-4 py-2 rounded-md">
                <option value="">Select Area</option>
                <option value="north-bangalore">North Bangalore</option>
                <option value="south-bangalore">South Bangalore</option>
                <option value="east-bangalore">East Bangalore</option>
                <option value="west-bangalore">West Bangalore</option>
              </select>
            </div>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Your Name *
              </label>
              <Input
                placeholder="Enter your name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Your Email *
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number *
              </label>
              <Input
                type="tel"
                placeholder="Type Your Number"
                {...register("phone", { required: "Phone number is required" })}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone.message}</p>
              )}
            </div>
          

            <div>
              <label className="block text-sm font-medium mb-1">
                Post Code *
              </label>
              <Input
                placeholder="Enter Post Code"
                {...register("postCode", { required: "Post code is required" })}
              />
              {errors.postCode && (
                <p className="text-red-500 text-xs">
                  {errors.postCode.message}
                </p>
              )}
            </div>
          </div>
          <div>
              <label className="block text-sm font-medium mb-1">
                Booking Category *
              </label>
              <select
                value={bookingCategory}
                onChange={(e) => setBookingCategory(e.target.value)}
                className={`w-full border px-4 py-2 rounded-md ${
                  formErrors.bookingCategory ? "border-red-500" : ""
                }`}
              >
                <option value="">Select Booking Category</option>
                <option value="home_less_20">Home – Less than 20 pax</option>
                <option value="private_less_50">
                  Private gathering – Less than 50 pax
                </option>
                <option value="private_50_100">
                  Private gathering – 50 to 100 pax
                </option>
                <option value="private_more_100">
                  Private gathering – &gt; 100 pax
                </option>
                <option value="club_lounge">Club/Lounge event</option>
              </select>
              {formErrors.bookingCategory && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.bookingCategory}
                </p>
              )}
            </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Your Address
            </label>
            <Input placeholder="Enter Your Address" {...register("address")} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Order Note</label>
            <textarea
              placeholder="Type Order Note (Max 190 Characters)"
              maxLength={190}
              className="w-full border px-4 py-2 rounded-md"
              {...register("orderNote")}
            ></textarea>
          </div>

          {/* Submit Button */}
          {getUserResponse && getUserResponse.User ? (
            <Button
              type="submit"
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Proceed to Pay ₹{total.toFixed(2)}
            </Button>
          ) : (
            <Button
              type="button"
              className="bg-orange-500 hover:bg-orange-600 text-white w-fit mt-4"
            >
              Sign In
            </Button>
          )}
        </form>

        {/* Right Side - Booking Summary */}
        <div className="border p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Booking Summary</h2>

          <div className="mb-4">
            <h3 className="font-semibold text-lg">{artist?.title}</h3>
            <p className="text-sm text-gray-500">Artist: {artist?.title}</p>
          </div>

          <div className="flex justify-between py-2 border-t text-sm">
            <span>90 minutes session</span>
            <span>₹{sessionPrice.toFixed(2)}</span>
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
            <Button className="bg-orange-500 text-white hover:bg-orange-600">
              Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
