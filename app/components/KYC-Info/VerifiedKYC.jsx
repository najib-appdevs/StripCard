"use client";

import { useState } from "react";

const VerifiedKYC = () => {
  const [isVerified, setIsVerified] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    idType: "",
    idNumber: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsVerified(true);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {!isVerified ? (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-r from-[#0EBE98] to-[#50C631] mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                KYC Verification
              </h2>
              <p className="text-gray-500 mt-2">
                Complete your identity verification
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-gray-800 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0EBE98] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-gray-800 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0EBE98] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID Type
                </label>
                <select
                  name="idType"
                  value={formData.idType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-gray-800 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0EBE98] focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="">Select ID Type</option>
                  <option value="passport">Passport</option>
                  <option value="national_id">National ID</option>
                  <option value="driving_license">Driving License</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID Number
                </label>
                <input
                  type="text"
                  name="idNumber"
                  placeholder="Enter your ID number"
                  value={formData.idNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-gray-800 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0EBE98] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  placeholder="Enter your complete address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 text-gray-800 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0EBE98] focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-3 px-6 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                style={{
                  background:
                    "linear-gradient(76.84deg, #0EBE98 -2.66%, #50C631 105.87%)",
                }}
              >
                Submit KYC
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-r from-[#0EBE98] to-[#50C631] mb-4 animate-pulse">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                KYC Verified
              </h3>
              <p className="text-gray-500">
                Your identity has been successfully verified
              </p>
            </div>

            <div className="space-y-4 mt-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">Full Name</p>
                <p className="text-gray-800 font-semibold">
                  {formData.fullName}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
                <p className="text-gray-800 font-semibold">{formData.dob}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">ID Type</p>
                <p className="text-gray-800 font-semibold capitalize">
                  {formData.idType.replace("_", " ")}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">ID Number</p>
                <p className="text-gray-800 font-semibold">
                  ···· ···· {formData.idNumber.slice(-4)}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">Address</p>
                <p className="text-gray-800 font-semibold">
                  {formData.address}
                </p>
              </div>
            </div>

            {/* <button
              onClick={() => setIsVerified(false)}
              className="w-full mt-6 py-3 px-6 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              style={{ background: 'linear-gradient(76.84deg, #0EBE98 -2.66%, #50C631 105.87%)' }}
            >
              Edit Information
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifiedKYC;
