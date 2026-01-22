// "use client";

// import { useState } from "react";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// export default function CreateCardCustomer({ createFields }) {
//   const [formData, setFormData] = useState({});

//   const handleInputChange = (fieldName, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [fieldName]: value,
//     }));
//   };

//   const handleFileChange = (fieldName, file) => {
//     setFormData((prev) => ({
//       ...prev,
//       [fieldName]: file,
//     }));
//   };

//   const handlePhoneChange = (value, country) => {
//     handleInputChange("phone_combined", value);
//     handleInputChange("phone_code", country.dialCode);
//     handleInputChange("phone", value.replace(`+${country.dialCode}`, ""));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const submitData = { ...formData };

//     if (submitData.phone_combined) {
//       const fullPhone = submitData.phone_combined.replace(/\s+/g, "");
//       submitData.phone_code =
//         submitData.phone_code || fullPhone.match(/^\+(\d+)/)?.[1] || "";
//       submitData.phone = fullPhone.replace(/^\+\d+/, "");
//       delete submitData.phone_combined;
//     }

//     console.log("Submitting customer creation:", submitData);
//   };

//   // Helper to safely get field metadata
//   const getField = (name) =>
//     createFields.find((f) => f.field_name === name) || {};

//   return (
//     <>
//       <div className="mx-auto w-full max-w-7xl">
//         {" "}
//         {/* ← full-width container with reasonable max */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 lg:p-10">
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold text-gray-900">
//               Create Strowallet Customer
//             </h2>
//             <p className="text-gray-600 mt-2">
//               Please provide the required information to set up your customer
//               profile
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Row 1: First Name + Last Name */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {["first_name", "last_name"].map((name) => {
//                 const field = getField(name);
//                 if (!field.field_name) return null;
//                 return (
//                   <div key={name}>
//                     <label className="block text-sm font-semibold text-gray-800 mb-2">
//                       {field.label_name || name.replace(/_/g, " ")}
//                       <span className="ml-1 text-red-500">*</span>
//                       {field.site_label && (
//                         <span className="ml-2 text-xs font-medium text-gray-600">
//                           ({field.site_label})
//                         </span>
//                       )}
//                     </label>
//                     <input
//                       type="text"
//                       value={formData[name] || ""}
//                       onChange={(e) => handleInputChange(name, e.target.value)}
//                       required
//                       className="w-full h-12 px-4 text-gray-900 font-medium bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-blue-50 transition-all"
//                       placeholder={`Enter ${name.replace(/_/g, " ").toLowerCase()}`}
//                     />
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Row 2: Phone + Email */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Phone - Left */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-800 mb-2">
//                   Phone Number<span className="ml-1 text-red-500">*</span>
//                   {getField("phone")?.site_label && (
//                     <span className="text-xs font-normal text-gray-500 ml-2">
//                       ({getField("phone").site_label})
//                     </span>
//                   )}
//                 </label>
//                 <PhoneInput
//                   country="us"
//                   value={formData.phone_combined || ""}
//                   onChange={handlePhoneChange}
//                   inputProps={{
//                     name: "phone",
//                     required: true,
//                   }}
//                   containerStyle={{ width: "100%" }}
//                   inputStyle={{
//                     width: "100%",
//                     height: "48px",
//                     padding: "12px 14px 12px 52px",
//                     border: "2px solid #e5e7eb",
//                     borderRadius: "12px",
//                     fontSize: "15px",
//                     color: "#111827",
//                     fontWeight: "500",
//                   }}
//                   buttonStyle={{
//                     border: "2px solid #e5e7eb",
//                     borderRight: "none",
//                     borderRadius: "12px 0 0 12px",
//                     background: "#f9fafb",
//                   }}
//                   dropdownStyle={{
//                     borderRadius: "12px",
//                     boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
//                   }}
//                   placeholder="Enter phone number"
//                 />
//               </div>

//               {/* Email - Right */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-800 mb-2">
//                   {getField("email").label_name || "Email Address"}
//                   {getField("email").site_label && (
//                     <span className="text-xs font-normal text-gray-500 ml-2">
//                       ({getField("email").site_label})
//                     </span>
//                   )}
//                   <span className="ml-1 text-red-500">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   value={formData.email || ""}
//                   onChange={(e) => handleInputChange("email", e.target.value)}
//                   required
//                   className="w-full h-12 px-4 text-gray-900 font-medium bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-blue-50 transition-all"
//                   placeholder="Enter email address"
//                 />
//               </div>
//             </div>

//             {/* Row 3: Date of Birth + House Number */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {["date_of_birth", "house_number"].map((name) => {
//                 const field = getField(name);
//                 if (!field.field_name) return null;
//                 return (
//                   <div key={name}>
//                     <label className="block text-sm font-semibold text-gray-800 mb-2">
//                       {field.label_name || name.replace(/_/g, " ")}
//                       <span className="ml-1 text-red-500">*</span>
//                       {field.site_label && (
//                         <span className="text-xs font-normal text-gray-500 ml-2">
//                           ({field.site_label})
//                         </span>
//                       )}
//                     </label>
//                     {name === "date_of_birth" ? (
//                       <input
//                         type="date"
//                         value={formData[name] || ""}
//                         onChange={(e) =>
//                           handleInputChange(name, e.target.value)
//                         }
//                         required
//                         className="w-full h-12 px-4 text-gray-900 font-medium bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-blue-50 transition-all"
//                       />
//                     ) : (
//                       <input
//                         type="text"
//                         value={formData[name] || ""}
//                         onChange={(e) =>
//                           handleInputChange(name, e.target.value)
//                         }
//                         required
//                         className="w-full h-12 px-4 text-gray-900 font-medium bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-blue-50 transition-all"
//                         placeholder={`Enter ${name.replace(/_/g, " ").toLowerCase()}`}
//                       />
//                     )}
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Row 4: Address + Zip Code */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {["address", "zip_code"].map((name) => {
//                 const field = getField(name);
//                 if (!field.field_name) return null;
//                 return (
//                   <div key={name}>
//                     <label className="block text-sm font-semibold text-gray-800 mb-2">
//                       {field.label_name || name.replace(/_/g, " ")}
//                       <span className="ml-1 text-red-500">*</span>
//                       {field.site_label && (
//                         <span className="text-xs font-normal text-gray-500 ml-2">
//                           ({field.site_label})
//                         </span>
//                       )}
//                     </label>
//                     <input
//                       type="text"
//                       value={formData[name] || ""}
//                       onChange={(e) => handleInputChange(name, e.target.value)}
//                       required
//                       className="w-full h-12 px-4 text-gray-900 font-medium bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-blue-50 transition-all"
//                       placeholder={`Enter ${name.replace(/_/g, " ").toLowerCase()}`}
//                     />
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Full-width file upload fields */}
//             {createFields
//               .filter(
//                 (field) =>
//                   field.type === "file" &&
//                   ![
//                     "first_name",
//                     "last_name",
//                     "phone",
//                     "phone_code",
//                     "email",
//                     "date_of_birth",
//                     "house_number",
//                     "address",
//                     "zip_code",
//                   ].includes(field.field_name),
//               )
//               .map((field) => (
//                 <div key={field.id} className="pt-5">
//                   <label className="block text-sm font-semibold text-gray-800 mb-2">
//                     {field.label_name || field.field_name.replace(/_/g, " ")}
//                     <span className="ml-1 text-red-500">*</span>
//                     {field.site_label && (
//                       <span className="text-xs font-normal text-gray-500 ml-2">
//                         ({field.site_label})
//                       </span>
//                     )}
//                   </label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) =>
//                       handleFileChange(
//                         field.field_name,
//                         e.target.files[0] || null,
//                       )
//                     }
//                     required
//                     className="w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 cursor-pointer transition"
//                   />
//                 </div>
//               ))}

//             {/* Submit Button */}
//             <div className="pt-9">
//               <button
//                 type="submit"
//                 className="w-full h-14 btn-primary text-white text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98]"
//               >
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { createStrowalletCustomer } from "../../utils/api";

export default function CreateCardCustomer({ createFields }) {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleFileChange = (fieldName, file) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: file,
    }));
  };

  const handlePhoneChange = (value, country) => {
    handleInputChange("phone_combined", value);
    handleInputChange("phone_code", country.dialCode);
    handleInputChange("phone", value.replace(`+${country.dialCode}`, ""));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   setLoading(true);

  //   try {
  //     const submitData = { ...formData };

  //     if (submitData.phone_combined) {
  //       const fullPhone = submitData.phone_combined.replace(/\s+/g, "");
  //       submitData.phone_code =
  //         submitData.phone_code || fullPhone.match(/^\+(\d+)/)?.[1] || "";
  //       submitData.phone = fullPhone.replace(/^\+\d+/, "");
  //       delete submitData.phone_combined;
  //     }

  //     const formDataToSend = new FormData();

  //     Object.entries(submitData).forEach(([key, value]) => {
  //       if (value instanceof File) {
  //         formDataToSend.append(key, value);
  //       } else if (value !== undefined && value !== null && value !== "") {
  //         formDataToSend.append(key, value);
  //       }
  //     });

  //     const response = await createStrowalletCustomer(formDataToSend);

  //     // Handle your specific error format
  //     if (response?.message?.error && Array.isArray(response.message.error)) {
  //       response.message.error.forEach((errMsg) => {
  //         toast.error(errMsg);
  //       });
  //     }
  //     // Adjust success condition according to your real success response
  //     else if (
  //       response?.data ||
  //       response?.message?.success ||
  //       response?.status === "success"
  //     ) {
  //       toast.success("Customer created successfully!");
  //       setFormData({}); // optional reset
  //     } else {
  //       toast.error("Something went wrong. Please try again.");
  //     }
  //   } catch (error) {
  //     toast.error("Network error. Please check your connection.");
  //     console.error("Create customer error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const submitData = { ...formData };

      // ──────────────────────────────────────────────────────────────
      // FIX 1: Rename email → customer_email   <--- ADD THIS BLOCK
      if (submitData.email) {
        submitData.customer_email = submitData.email;
        delete submitData.email;
      }
      // ──────────────────────────────────────────────────────────────

      // ──────────────────────────────────────────────────────────────
      // FIX 2: Make sure phone_code has + prefix   <--- ADD / MODIFY THIS
      if (submitData.phone_code && !submitData.phone_code.startsWith("+")) {
        submitData.phone_code = "+" + submitData.phone_code;
      }
      // ──────────────────────────────────────────────────────────────

      // Your existing phone_combined cleanup – keep it, but improved version is safer:
      if (submitData.phone_combined) {
        const fullPhone = submitData.phone_combined.replace(/\s+/g, "").trim();

        // Try to extract code + number more reliably
        const match = fullPhone.match(/^\+(\d{1,4})(.+)$/);
        if (match) {
          submitData.phone_code = "+" + match[1];
          submitData.phone = match[2].replace(/^0+/, ""); // optional: strip leading zero
        }

        delete submitData.phone_combined;
      }

      // ─── Build FormData (your original code – no change needed here) ───
      const formDataToSend = new FormData();

      Object.entries(submitData).forEach(([key, value]) => {
        if (value instanceof File) {
          formDataToSend.append(key, value);
        } else if (value !== undefined && value !== null && value !== "") {
          formDataToSend.append(key, value);
        }
      });

      const response = await createStrowalletCustomer(formDataToSend);

      // Your existing success/error handling – you can keep as-is
      if (response?.message?.error && Array.isArray(response.message.error)) {
        response.message.error.forEach((errMsg) => {
          toast.error(errMsg);
        });
      } else if (
        response?.data ||
        response?.message?.success ||
        response?.status === "success"
      ) {
        toast.success("Customer created successfully!");
        setFormData({}); // optional reset
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Please check your connection.");
      console.error("Create customer error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper to safely get field metadata
  const getField = (name) =>
    createFields.find((f) => f.field_name === name) || {};

  return (
    <>
      <div className="mx-auto w-full max-w-7xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 lg:p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Create Customer
            </h2>
            <p className="text-gray-600 mt-2">
              Please provide the required information to set up your customer
              profile
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Row 1: First Name + Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["first_name", "last_name"].map((name) => {
                const field = getField(name);
                if (!field.field_name) return null;
                return (
                  <div key={name}>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      {field.label_name || name.replace(/_/g, " ")}
                      <span className="ml-1 text-red-500">*</span>
                      {field.site_label && (
                        <span className="ml-2 text-xs font-medium text-gray-600">
                          ({field.site_label})
                        </span>
                      )}
                    </label>
                    <input
                      type="text"
                      value={formData[name] || ""}
                      onChange={(e) => handleInputChange(name, e.target.value)}
                      required
                      className="w-full h-12 px-4 text-gray-900 font-medium bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-blue-50 transition-all"
                      placeholder={`Enter ${name.replace(/_/g, " ").toLowerCase()}`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Row 2: Phone + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone - Left */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Phone Number<span className="ml-1 text-red-500">*</span>
                  {getField("phone")?.site_label && (
                    <span className="text-xs font-normal text-gray-500 ml-2">
                      ({getField("phone").site_label})
                    </span>
                  )}
                </label>
                <PhoneInput
                  country="us"
                  value={formData.phone_combined || ""}
                  onChange={handlePhoneChange}
                  inputProps={{
                    name: "phone",
                    required: true,
                  }}
                  containerStyle={{ width: "100%" }}
                  inputStyle={{
                    width: "100%",
                    height: "48px",
                    padding: "12px 14px 12px 52px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "12px",
                    fontSize: "15px",
                    color: "#111827",
                    fontWeight: "500",
                  }}
                  buttonStyle={{
                    border: "2px solid #e5e7eb",
                    borderRight: "none",
                    borderRadius: "12px 0 0 12px",
                    background: "#f9fafb",
                  }}
                  dropdownStyle={{
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  }}
                  placeholder="Enter phone number"
                />
              </div>

              {/* Email - Right */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  {getField("email").label_name || "Email Address"}
                  {getField("email").site_label && (
                    <span className="text-xs font-normal text-gray-500 ml-2">
                      ({getField("email").site_label})
                    </span>
                  )}
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="w-full h-12 px-4 text-gray-900 font-medium bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-blue-50 transition-all"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            {/* Row 3: Date of Birth + House Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["date_of_birth", "house_number"].map((name) => {
                const field = getField(name);
                if (!field.field_name) return null;
                return (
                  <div key={name}>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      {field.label_name || name.replace(/_/g, " ")}
                      <span className="ml-1 text-red-500">*</span>
                      {field.site_label && (
                        <span className="text-xs font-normal text-gray-500 ml-2">
                          ({field.site_label})
                        </span>
                      )}
                    </label>
                    {name === "date_of_birth" ? (
                      <input
                        type="date"
                        value={formData[name] || ""}
                        onChange={(e) =>
                          handleInputChange(name, e.target.value)
                        }
                        required
                        className="w-full h-12 px-4 text-gray-900 font-medium bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-blue-50 transition-all"
                      />
                    ) : (
                      <input
                        type="text"
                        value={formData[name] || ""}
                        onChange={(e) =>
                          handleInputChange(name, e.target.value)
                        }
                        required
                        className="w-full h-12 px-4 text-gray-900 font-medium bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-blue-50 transition-all"
                        placeholder={`Enter ${name.replace(/_/g, " ").toLowerCase()}`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Row 4: Address + Zip Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["address", "zip_code"].map((name) => {
                const field = getField(name);
                if (!field.field_name) return null;
                return (
                  <div key={name}>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      {field.label_name || name.replace(/_/g, " ")}
                      <span className="ml-1 text-red-500">*</span>
                      {field.site_label && (
                        <span className="text-xs font-normal text-gray-500 ml-2">
                          ({field.site_label})
                        </span>
                      )}
                    </label>
                    <input
                      type="text"
                      value={formData[name] || ""}
                      onChange={(e) => handleInputChange(name, e.target.value)}
                      required
                      className="w-full h-12 px-4 text-gray-900 font-medium bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-blue-50 transition-all"
                      placeholder={`Enter ${name.replace(/_/g, " ").toLowerCase()}`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Full-width file upload fields */}
            {createFields
              .filter(
                (field) =>
                  field.type === "file" &&
                  ![
                    "first_name",
                    "last_name",
                    "phone",
                    "phone_code",
                    "email",
                    "date_of_birth",
                    "house_number",
                    "address",
                    "zip_code",
                  ].includes(field.field_name),
              )
              .map((field) => (
                <div key={field.id} className="pt-5">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    {field.label_name || field.field_name.replace(/_/g, " ")}
                    <span className="ml-1 text-red-500">*</span>
                    {field.site_label && (
                      <span className="text-xs font-normal text-gray-500 ml-2">
                        ({field.site_label})
                      </span>
                    )}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileChange(
                        field.field_name,
                        e.target.files[0] || null,
                      )
                    }
                    required
                    className="w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 cursor-pointer transition"
                  />
                </div>
              ))}

            {/* Submit Button */}
            <div className="pt-9">
              <button
                type="submit"
                disabled={loading}
                className={`cursor-pointer w-full h-14 btn-primary text-white text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
