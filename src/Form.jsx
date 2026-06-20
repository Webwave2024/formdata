import { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    occupation: "",
  });
const [certificateLink, setCertificateLink] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (!/^[A-Za-z ]{2,50}$/.test(formData.name.trim())) {
      newErrors.name = "Enter a valid name.";
    }

    // Mobile
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number.";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    // Occupation
    if (!formData.occupation.trim()) {
      newErrors.occupation = "Occupation is required.";
    } else if (formData.occupation.trim().length < 2) {
      newErrors.occupation = "Occupation is too short.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  try {
    setLoading(true);

    await fetch(
  "https://script.google.com/macros/s/AKfycbxwTjn2Fdydm83hp30FYrMuFWkR7HUfQptTC_YXxmFObLOu6Iu7YHSufX8hO7DdEKYD/exec",
  {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(formData),
  }
);

setFormData({
  name: "",
  mobile: "",
  email: "",
  occupation: "",
});

setErrors({});

setCertificateLink(true);

alert("Form Submitted Successfully!");

  } catch (error) {
    console.error(error);
    alert("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const inputStyle = (field) =>
    `w-full rounded-lg border p-3 outline-none transition ${
      errors[field]
        ? "border-red-500 focus:ring-2 focus:ring-red-500"
        : "border-gray-300 focus:ring-2 focus:ring-blue-500"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold">
          Registration Form
        </h2>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">

          {/* Name */}
          <div>
            <label className="mb-2 block font-medium">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputStyle("name")}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.name}
              </p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label className="mb-2 block font-medium">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              maxLength={10}
              value={formData.mobile}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                handleChange({
                  target: {
                    name: "mobile",
                    value,
                  },
                });
              }}
              className={inputStyle("mobile")}
              placeholder="9876543210"
            />
            {errors.mobile && (
              <p className="mt-1 text-sm text-red-600">
                {errors.mobile}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputStyle("email")}
              placeholder="abc@gmail.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          {/* Occupation */}
          <div>
            <label className="mb-2 block font-medium">
              Occupation
            </label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className={inputStyle("occupation")}
              placeholder=""
            />
            {errors.occupation && (
              <p className="mt-1 text-sm text-red-600">
                {errors.occupation}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>


          {/* 👇 Add this here */}
  {certificateLink && (
    <div className="mt-6 rounded-lg border border-green-300 bg-green-50 p-4 text-center">
      <p className="mb-2 font-semibold text-green-700">
         Registration Successful!
      </p>

      <a
        href="/certificate.jpeg"
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-blue-600 underline hover:text-blue-800"
      >
        Click here to view your certificate
      </a>
    </div>
  )}
        </form>
      </div>
    </div>
  );
}