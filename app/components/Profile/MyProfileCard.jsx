"use client";

import { useState } from "react";

function MyProfileCard() {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [isCountryOpen, setIsCountryOpen] = useState(false);

  // Dummy logged-in email
  const userEmail = "user@appdevs.net";

  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "India",
    "China",
    "Brazil",
  ];

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCountrySelect = (country) => {
    setProfileData({ ...profileData, country });
    setIsCountryOpen(false);
  };

  const handleProfileUpdate = () => {
    console.log("Profile updated:", profileData);
    alert("Profile updated successfully!");
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      console.log("Account deleted");
      alert("Account deleted");
    }
  };

  // Reusable styles
  const inputClass =
    "w-full px-4 py-3 border border-gray-300 rounded-lg placeholder:text-gray-500 text-gray-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100 outline-none transition-all";

  const labelClass = "block text-sm font-medium text-gray-700 mb-2";

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-4xl mx-auto">
      {" "}
      {/* Reduced padding & shadow */}
      {/* Header with Email */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">My Profile</h2>

        {/* Compact & Visible Email Badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-5 py-2.5 rounded-full text-base font-medium shadow-sm">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206"
            />
          </svg>
          {userEmail}
        </div>
      </div>
      {/* Profile Image */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-linear-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {profileData.firstName.charAt(0).toUpperCase() ||
              profileData.lastName.charAt(0).toUpperCase() ||
              "U"}
          </div>
          <button
            aria-label="Edit profile picture"
            className="absolute bottom-0 right-0 bg-emerald-500 text-white rounded-full w-9 h-9 flex items-center justify-center shadow-md hover:bg-emerald-600 transition"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Form Fields - Precise Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {" "}
        {/* Tighter gap */}
        {/* First Name & Last Name */}
        <div>
          <label className={labelClass}>
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={profileData.firstName}
            onChange={handleProfileChange}
            className={inputClass}
            placeholder="Enter first name"
          />
        </div>
        <div>
          <label className={labelClass}>
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={profileData.lastName}
            onChange={handleProfileChange}
            className={inputClass}
            placeholder="Enter last name"
          />
        </div>
        {/* Country & Phone */}
        <div className="relative">
          <label className={labelClass}>Country</label>
          <button
            type="button"
            onClick={() => setIsCountryOpen(!isCountryOpen)}
            className={`${inputClass} flex justify-between items-center bg-white text-left`}
          >
            <span
              className={
                profileData.country ? "text-gray-900" : "text-gray-500"
              }
            >
              {profileData.country || "Select country"}
            </span>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${
                isCountryOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isCountryOpen && (
            <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-64 overflow-y-auto">
              {countries.map((country) => (
                <div
                  key={country}
                  onClick={() => handleCountrySelect(country)}
                  className="px-4 py-3 hover:bg-emerald-50 cursor-pointer transition text-gray-800"
                >
                  {country}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input
            type="tel"
            name="phone"
            value={profileData.phone}
            onChange={handleProfileChange}
            className={inputClass}
            placeholder="Enter phone number"
          />
        </div>
        {/* Address & City - Side by Side */}
        <div>
          <label className={labelClass}>Address</label>
          <input
            type="text"
            name="address"
            value={profileData.address}
            onChange={handleProfileChange}
            className={inputClass}
            placeholder="Enter address"
          />
        </div>
        <div>
          <label className={labelClass}>City</label>
          <input
            type="text"
            name="city"
            value={profileData.city}
            onChange={handleProfileChange}
            className={inputClass}
            placeholder="Enter city"
          />
        </div>
        {/* State & Zip Code - Side by Side */}
        <div>
          <label className={labelClass}>State</label>
          <input
            type="text"
            name="state"
            value={profileData.state}
            onChange={handleProfileChange}
            className={inputClass}
            placeholder="Enter state"
          />
        </div>
        <div>
          <label className={labelClass}>Zip Code</label>
          <input
            type="text"
            name="zipCode"
            value={profileData.zipCode}
            onChange={handleProfileChange}
            className={inputClass}
            placeholder="Enter zip code"
          />
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
        <button
          onClick={handleDeleteAccount}
          className="cursor-pointer w-full sm:w-auto px-8 py-3 border border-red-500 text-white font-semibold bg-red-400 rounded-lg"
        >
          Delete Account
        </button>

        <button
          onClick={handleProfileUpdate}
          className="cursor-pointer w-full sm:w-auto px-10 py-3 text-white rounded-lg font-semibold shadow-md transition hover:shadow-lg"
          style={{
            background:
              "linear-gradient(76.84deg, #0EBE98 -2.66%, #50C631 105.87%)",
          }}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}

export default MyProfileCard;
