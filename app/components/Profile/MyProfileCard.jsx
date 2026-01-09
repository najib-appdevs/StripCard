"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import MyProfileSkeleton from "./MyProfileSkeleton";

import { Loader2 } from "lucide-react";
import {
  deleteUserAccount,
  getUserProfile,
  updateUserProfile,
} from "../../utils/api";

function MyProfileCard() {
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [userEmail, setUserEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const imageInputRef = useRef(null);
  const router = useRouter();

  const [countries, setCountries] = useState([]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    countryCode: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  /* ================= FETCH PROFILE ================= */

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);

      const res = await getUserProfile();

      if (res?.data?.user) {
        const user = res.data.user;

        setCountries(res.data.countries || []);

        setProfileData({
          firstName: user.firstname || "",
          lastName: user.lastname || "",
          country: user.address?.country || "",
          countryCode: user.mobile_code ? `+${user.mobile_code}` : "",
          phone: user.mobile || "",
          address: user.address?.address || "",
          city: user.address?.city || "",
          state: user.address?.state || "",
          zipCode: user.address?.zip || "",
        });

        setUserEmail(user.email);
        setProfileImage(user.userImage);
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  /* ================= HANDLERS ================= */

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    } else {
      setImageFile(null);
    }
  };

  const handleCountrySelect = (country) => {
    setProfileData((prev) => ({
      ...prev,
      country: country.name,
      countryCode: `+${country.mobile_code}`,
      phone: "", // reset phone on country change
    }));

    setIsCountryOpen(false);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      firstname: profileData.firstName,
      lastname: profileData.lastName,
      country: profileData.country,
      phone_code: profileData.countryCode
        ? profileData.countryCode.replace("+", "")
        : null,
      phone: profileData.phone || null,
      address: profileData.address,
      city: profileData.city,
      state: profileData.state,
      zip_code: profileData.zipCode,
    };

    const res = await updateUserProfile(payload, imageFile);

    if (res?.message?.success) {
      toast.success(res.message.success[0]);
      if (imageFile) {
        setProfileImage(URL.createObjectURL(imageFile));
      }
      setImageFile(null);
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    } else if (res?.message?.error) {
      toast.error(res.message.error[0]);
    }

    setLoading(false);
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteAccount = async () => {
    setLoading(true);

    try {
      const res = await deleteUserAccount();

      if (res?.message?.success?.length) {
        toast.success(res.message.success[0]);

        localStorage.removeItem("auth_token");
        sessionStorage.removeItem("auth_token");
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");

        router.push("/login");
        return;
      }

      if (res?.message?.error?.length) {
        toast.error(res.message.error[0]);
        return;
      }
    } catch (error) {
      toast.error("An unexpected error occurred during account deletion.");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  const cancelDeleteAccount = () => {
    setShowDeleteModal(false);
  };

  /* ================= STYLES ================= */

  const inputClass =
    "w-full px-4 py-3 border border-gray-300 rounded-lg placeholder:text-gray-500 text-gray-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100 outline-none transition-all";

  const labelClass = "block text-sm font-medium text-gray-700 mb-2";

  /* ================= LOADING ================= */

  if (loading) {
    return <MyProfileSkeleton />;
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-6 max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">My Profile</h2>

          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-5 py-2.5 rounded-full text-base font-medium shadow-sm">
            {userEmail}
          </div>
        </div>

        {/* PROFILE IMAGE */}
        <div className="flex justify-center mb-8 relative">
          <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg">
            <img
              src={imageFile ? URL.createObjectURL(imageFile) : profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            onChange={handleImageChange}
            className="hidden"
            id="profile-image-upload"
          />
          <label
            htmlFor="profile-image-upload"
            className="absolute bottom-0 right-0 -mr-2 -mb-2 p-2 bg-emerald-500 text-white rounded-full cursor-pointer hover:bg-emerald-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-4 3 3 2-2 3 3z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleProfileUpdate}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <div>
            <label className={labelClass}>First Name *</label>
            <input
              name="firstName"
              value={profileData.firstName}
              onChange={handleProfileChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Last Name *</label>
            <input
              name="lastName"
              value={profileData.lastName}
              onChange={handleProfileChange}
              className={inputClass}
              required
            />
          </div>

          {/* COUNTRY DROPDOWN */}
          <div className="relative">
            <label className={labelClass}>Country *</label>
            <button
              type="button"
              onClick={() => setIsCountryOpen(!isCountryOpen)}
              className={`${inputClass} flex justify-between items-center bg-white cursor-pointer`}
            >
              <span>{profileData.country || "Select country"}</span>
              <span>
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
              </span>
            </button>

            {isCountryOpen && (
              <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {countries.map((country) => (
                  <div
                    key={country.id}
                    onClick={() => handleCountrySelect(country)}
                    className="px-4 py-3 hover:bg-emerald-50 cursor-pointer text-gray-800 font-medium text-base transition-colors"
                  >
                    {country.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PHONE */}
          <div>
            <label className={labelClass}>Phone *</label>
            <input
              name="phone"
              value={
                profileData.countryCode
                  ? `${profileData.countryCode} ${profileData.phone}`
                  : profileData.phone
              }
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  phone: e.target.value
                    .replace(profileData.countryCode || "", "")
                    .trim(),
                })
              }
              className={inputClass}
              placeholder="Enter phone number"
              required
            />
          </div>

          <div>
            <label className={labelClass}>Address</label>
            <input
              name="address"
              value={profileData.address}
              onChange={handleProfileChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>City</label>
            <input
              name="city"
              value={profileData.city}
              onChange={handleProfileChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>State</label>
            <input
              name="state"
              value={profileData.state}
              onChange={handleProfileChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Zip Code</label>
            <input
              name="zipCode"
              value={profileData.zipCode}
              onChange={handleProfileChange}
              className={inputClass}
            />
          </div>

          {/* BUTTONS */}
          <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <button
              type="button"
              onClick={handleDeleteAccount}
              className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer font-semibold"
            >
              Delete Account
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`px-10 py-3 text-white rounded-lg font-semibold transition-all cursor-pointer flex items-center justify-center gap-2
                ${loading ? "opacity-70 cursor-wait" : "hover:opacity-90"}`}
              style={{
                background:
                  "linear-gradient(76.84deg, #0EBE98 -2.66%, #50C631 105.87%)",
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                </>
              ) : (
                "Update Profile"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-none p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-3">
              Delete Account?
            </h3>

            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete your account? This action cannot
              be undone and all your data will be permanently removed.
            </p>

            <div className="flex gap-3">
              <button
                onClick={cancelDeleteAccount}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteAccount}
                className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MyProfileCard;
