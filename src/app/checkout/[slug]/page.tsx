"use client";

import React, { useState, useEffect } from "react"; // Make sure useState is imported
import { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { VerifyOTP, AddOrderProductById } from "@/reducer/thunks";
import { useRouter } from "next/navigation";
import { Modal, Result, Spin } from "antd";

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
const soundSetups = [
  {
    label: "Sound Setup (50–100 guests)",
    details: [
      "2 Tops", "2 Single Subs", "Soundcraft 12-Channel Mixer – 1 No",
      "Cordless Handheld Mics – 2 Nos", "Corded DJ Mic – 1 No",
      "DJ Monitor – 1 No", "Speaker Stands – 2 Nos", "Transportation Included"
    ],
    price: 10000,
  },
  {
    label: "Sound Setup (150–200 guests)",
    details: [
      "JBL VRX Tops – 4 Nos", "JBL STX Subs – 2 Nos", "Crown Amps – 2 Nos",
      "Soundcraft 12-Channel Mixer – 1 No", "Cordless Handheld Mics – 2 Nos",
      "Corded DJ Mic – 1 No", "DJ Monitor – 1 No", "Speaker Stands – 2 Nos"
    ],
    price: 12500,
  },
];


const CheckoutPage = ({ params }: Props) => {
  const router = useRouter();
  const [country, setCountry] = useState('India');
  const [city, setCity] = useState('Bangalore');
  const [area, setArea] = useState('');
  const [additionalServicePrice, setadditionalServicePrice] = useState(0);

  const storedData = JSON.parse(localStorage.getItem("djFormResponses") || "{}");
  const location = localStorage.getItem("location") || "";
  const [selectedSoundSetup, setSelectedSoundSetup] = useState<any | null>(null);
  localStorage.removeItem("checkoutid")

  const entries = Object.entries(storedData);
  const [OrderId, setOrderId] = useState(false);

  const INITIAL_VISIBLE = 4; // number of items to show initially
  const [showAll, setShowAll] = useState(false);
  const [ViewMore, setViewMore] = useState(false);


  const visibleEntries = showAll ? entries : entries.slice(0, INITIAL_VISIBLE); const [coupon, setCoupon] = useState('');

  const { slug } = use(params);
  const dispatch = useDispatch<any>();

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
        address: location || getUserResponse.User.address,
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
  const selectedSoundPrice = selectedSoundSetup !== null && soundSetups[selectedSoundSetup]
    ? soundSetups[selectedSoundSetup].price
    : 0;
  const subtotal = sessionPrice + additionalServicePrice + selectedSoundPrice;
  const tax = parseFloat((subtotal * 0.18).toFixed(2));
  const total = parseFloat((subtotal + tax).toFixed(2));
  const handlePayment = async (data: FormData) => {
    try {
      const res = await loadRazorpayScript();
      const finalAmount = Math.round((total || 0) * 100);

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
          // alert(
          //   `Payment Successful! Payment ID: ${response.razorpay_payment_id}`
          // );
          const bookingData = {
            id: '0',
            invoice: '',
            service_id: artist?.id,
            seller_id: artist?.seller_id,
            buyer_id: getUserResponse.User.id,
            name: getUserResponse.User.artist_name,
            email: getUserResponse.User.email,
            phone: getUserResponse.User.phone,
            post_code: getUserResponse.User.post_code,
            address: getUserResponse.User.address,
            city: city,
            area: area,
            country: country,
            date: new Date().toDateString(),
            schedule: '10:00Am - 02:00PM',
            package_fee: artist?.price,
            extra_service: soundSetups[selectedSoundSetup]?.price || '0',
            sub_total: subtotal.toFixed(0),
            tax: tax.toFixed(0),
            total: total.toFixed(0),
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
          // Optionally: call your backend to verify the payment

          dispatch(AddOrderProductById(bookingData));
          setOrderId(true)
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
  if (loadinglist) return <Spin tip="Loading Services..." />;
  if (error) return <Result status="error" title="Failed to load services" subTitle={error} />;

  return (
    <div className="min-h-screen bg-white py-10 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side - Form */}
        <form onSubmit={handleSubmit(handlePayment)} className="space-y-6">
          {/* Dropdowns */}
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
            {getUserResponse?.User?.name ? <div className="text-sm text-gray-500 mt-2">
              You are logged in as {getUserResponse?.User?.name}
            </div> : (
              <Button
                type="button"
                className="bg-orange-500 hover:bg-orange-600 text-white w-fit mt-4"
                onClick={() => {
                  localStorage.setItem("checkoutid",slug)
                  alert("Please login to proceed with the booking.");
                  router.push("/login"); // Navigate to /login

                }}
              >
                Sign In
              </Button>
            )}

          </div>

          {/* Inputs */}

          {getUserResponse?.User?.name && <>
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
                Your Address
              </label>
              <Input placeholder="Enter Your Address" {...register("address")} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Request Giggili</label>
              <textarea
                placeholder="Type Request Giggili (Max 190 Characters)"
                maxLength={190}
                className="w-full border px-4 py-2 rounded-md"
                {...register("orderNote")}
              ></textarea>
            </div>
            <div>
              <div>
                <label className="block text-sm font-medium mb-1">Add On More Sound Setup (Optional)</label>
                <select
                  value={selectedSoundSetup ?? ""}
                  onChange={(e) => setSelectedSoundSetup(e.target.value ? parseInt(e.target.value) : null)}
                  className="w-full border px-4 py-2 rounded-md"
                >
                  <option value="">Select Sound Setup</option>
                  {soundSetups.map((setup, index) => (
                    <option key={index} value={index}>
                      {setup.label} - ₹{setup.price}
                    </option>
                  ))}
                </select>
              </div>



            </div>


            {/* Submit Button */}

            {getUserResponse && getUserResponse.User ? (
  artist.request_call === "true" ? (
    <div className="flex flex-col gap-2">
     
      <a
        href="tel:+918123382771"
        className="bg-orange-500 hover:bg-orange-600 text-white w-fit mt-4 text-white w-fit px-4 py-2 rounded"
      >
        Request Call Back
      </a>
    </div>
  ) : (
    <Button
      type="submit"
      className="bg-orange-500 hover:bg-orange-600 text-white w-fit mt-4"
    >
      Book Now
    </Button>
  )
) : (
  <Button
    type="button"
    className="bg-orange-500 hover:bg-orange-600 text-white w-fit mt-4"
    onClick={() => {
      alert("Please login to proceed with the booking.");
      router.push("/login");
    }}
  >
    Sign In
  </Button>
)}

           </>}


        </form>

        {/* Right Side - Booking Summary */}
        <div className="border p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Booking Summary</h2>



          <div className="mb-4">
            <h3 className="font-semibold text-lg">{artist?.title}</h3>
            <p className="text-sm text-gray-500">Artist: {artist?.title}</p>
          </div>
          <div className="mb-2">
            <div className="flex justify-between items-center">
              <p className="mr-4">
                Equipped With:<br />
                {artist.facilities.join(', ')}
              </p>




            </div>
            <div
              className="text-blue-600 flex items-center space-x-2"
              onClick={() => {
                setViewMore(!ViewMore)
              }}
            >
              <span>{!ViewMore ? "Read More" : "View Less"}</span>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            {ViewMore && Object.entries(storedData).map(([key, value], index) => (
              <div key={index} className="flex justify-between py-1 text-sm">
                <span className="text-gray-700 font-medium">{key}</span>
                <span className="text-gray-900 font-normal truncate max-w-[60%] text-right">{value}</span>
              </div>
            ))}

          </div>

          {artist.request_call === "true" ? null : <>
           <div className="flex justify-between py-2 border-t text-sm">
            <span>90 minutes session</span>
            <span>₹{sessionPrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between py-2 text-sm">
            <span>Lighting Setup</span>
            <span>₹{additionalServicePrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 text-sm">

            <span>{selectedSoundSetup !== null && (
              <div className="mt-2 text-sm text-gray-600">
                <span>Add More Setup</span>

                <p className="mt-2 font-semibold">Total Cost: ₹{soundSetups[selectedSoundSetup].label.toLocaleString()}</p>

                <ul className="list-disc ml-5">
                  {soundSetups[selectedSoundSetup].details.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className="mt-2 font-semibold">Total Cost: ₹{soundSetups[selectedSoundSetup].price.toLocaleString()}</p>
              </div>
            )}
            </span>
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
          </div></>}

         

          <div className="flex mt-4 gap-2">
            <Input placeholder="Enter Coupon Code" />
            <Button className="bg-orange-500 text-white hover:bg-orange-600">
              Apply
            </Button>
          </div>



        </div>
      </div>
      <Modal
        visible={OrderId}
        onCancel={() => {
          window.history.back(); // Go back on modal cancel
        }}
        width="770px"
        style={{ marginTop: "2%" }}
        footer={null}
      >
        <Result
          status="success"
          title="DJ Booking Confirmed"
          subTitle={`Thank you! Your DJ booking has been successfully confirmed. Booking ID: ${OrderId}. Our team will reach out to you shortly with further details.`}
          extra={[
            <Button
              onClick={() => {
                window.location.href = '/';  // Redirect to Home page
              }}
              type="primary"
              key="viewBooking"
            >
              Home
            </Button>,
            <Button
              key="newBooking"
              onClick={() => {
                window.history.back(); // Go back to previous page
              }}
            >
              Go Back
            </Button>,
          ]}
        />
      </Modal>
    </div>
  );
};

export default CheckoutPage;
