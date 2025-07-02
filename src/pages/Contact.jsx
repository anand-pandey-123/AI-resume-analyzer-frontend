import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend or an email service
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col items-center justify-center py-10">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-xl border border-blue-100">
        <h2 className="text-3xl font-extrabold text-blue-800 text-center mb-2 tracking-tight">
          Contact Us
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Have questions, feedback, or need support? Fill out the form below and our team will get back to you as soon as possible.
        </p>
        {submitted ? (
          <div className="text-center text-green-600 font-semibold text-lg py-10">
            Thank you for reaching out! We have received your message.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-blue-700 font-semibold mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-blue-700 font-semibold mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-blue-700 font-semibold mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50 resize-none"
                rows="5"
                placeholder="How can we help you?"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 rounded-lg font-semibold text-lg shadow hover:from-blue-700 hover:to-blue-600 transition duration-300"
            >
              Send Message
            </button>
          </form>
        )}
        <div className="mt-10 text-center text-gray-500 text-sm">
          Or email us directly at{" "}
          <a
            href="mailto:support@atsresumetool.com"
            className="text-blue-600 underline hover:text-blue-800"
          >
            support@atsresumetool.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;