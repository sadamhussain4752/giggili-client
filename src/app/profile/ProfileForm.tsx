"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

interface FormData {
  name: string;
  artist_name: string;
  email: string;
  phone: string;
  address: string;
  post_code: string;
  web: string;
  bank_name: string;
  account_holder_name: string;
  account_number: string;
  ifsc_code: string;
  booking_category: string;
}

const ProfileForm = () => {
  const {
    loading: getprofileUserLoading,
    loginerror: getprofileUserError,
    getprofile: getUserResponse,
  } = useSelector((state: any) => state.getprofile);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();

  useEffect(() => {
    if (getUserResponse && getUserResponse.User) {
      const user = getUserResponse.User;
      setValue("name", user.name || "");
      setValue("artist_name", user.artist_name || "");
      setValue("email", user.email || "");
      setValue("phone", user.phone || "");
      setValue("address", user.address || "");
      setValue("post_code", user.post_code || "");
      setValue("web", user.web || "");
      setValue("bank_name", user.bank_name || "");
      setValue("account_holder_name", user.account_holder_name || "");
      setValue("account_number", user.account_number || "");
      setValue("ifsc_code", user.ifsc_code || "");
    }
  }, [getUserResponse, setValue]);

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    // Submit logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input {...register("name")} className="w-full border px-4 py-2 rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Artist Name</label>
            <input {...register("artist_name")} className="w-full border px-4 py-2 rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input {...register("email")} className="w-full border px-4 py-2 rounded-md" disabled />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input {...register("phone")} className="w-full border px-4 py-2 rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input {...register("address")} className="w-full border px-4 py-2 rounded-md" />
          </div>
        </div>

        {/* Right side */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Post Code</label>
            <input {...register("post_code")} className="w-full border px-4 py-2 rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Website</label>
            <input {...register("web")} className="w-full border px-4 py-2 rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bank Name</label>
            <input {...register("bank_name")} className="w-full border px-4 py-2 rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Account Holder Name</label>
            <input {...register("account_holder_name")} className="w-full border px-4 py-2 rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Account Number</label>
            <input {...register("account_number")} className="w-full border px-4 py-2 rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">IFSC Code</label>
            <input {...register("ifsc_code")} className="w-full border px-4 py-2 rounded-md" />
          </div>

          {/* Booking Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Booking Category</label>
            <select {...register("booking_category")} className="w-full border px-4 py-2 rounded-md">
              <option value="">Select Booking Category</option>
              <option value="home_less_20">Home – Less than 20 pax</option>
              <option value="private_less_50">Private gathering – Less than 50 pax</option>
              <option value="private_50_100">Private gathering – 50 to 100 pax</option>
              <option value="private_more_100">Private gathering – More than 100 pax</option>
              <option value="club_lounge">Club/Lounge event</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8 text-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition"
        >
          Update Profile
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
