// app/profile/page.tsx

"use client"; // Needed if using hooks like useState, useEffect, etc.

import React from "react";
import ProfileForm from "@/app/profile/ProfileForm"; // Adjust path as needed

export default function ProfilePage() {
  return (
    <div className="p-4">
      <ProfileForm />
    </div>
  );
}
