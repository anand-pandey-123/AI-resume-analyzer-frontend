import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { backendUrl } from "../constants";

const ResumeAnalyzer = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [showAccordion, setShowAccordion] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setResumeFile(event.target.files[0]);
  };

  const submitForm = async (file, skills) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("jobDescription", skills);
      formData.append("resume", file);

      const response = await axios.post(
        backendUrl + "/api/v1/analyze-resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setAnalysisResult(response.data.analysis);
      setShowAccordion(true);
      setAccordionOpen(true);
      setLoading(false);
      console.log("Server response:", response.data.analysis);
    } catch (error) {
      setShowAccordion(false);
      setAnalysisResult(null);
      setLoading(false);
      console.error("Error submitting form:", error.response?.data || error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!jobDescription || !resumeFile) {
      alert("Please enter a job description and upload a resume.");
      return;
    }

    submitForm(resumeFile, jobDescription);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-4 md:py-6 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to={"/profile"}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="ATS Logo"
              className="h-9 w-9 md:h-10 md:w-10 rounded-full shadow"
            />
          </Link>
          <span className="text-xl md:text-2xl font-bold text-blue-700 tracking-tight">
            ATS Resume Checker
          </span>
        </div>
        <nav className="hidden md:flex gap-8 text-gray-600 font-medium">
          <Link to={"/"} className="hover:text-blue-700 transition">
            Home
          </Link>
          <Link to={""} className="hover:text-blue-700 transition">
            Features
          </Link>
          <a href="#" className="hover:text-blue-700 transition">
            Pricing
          </a>
          <Link to={"/contact"} className="hover:text-blue-700 transition">
            Contact
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-6 sm:py-10">
        <div className="bg-white shadow-2xl rounded-2xl p-4 sm:p-8 md:p-10 w-full max-w-full sm:max-w-2xl border border-blue-100">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-800 text-center mb-2 tracking-tight">
            Resume Analyzer
          </h2>
          <p className="text-center text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">
            Upload your resume and paste the job description to get instant, AI-powered feedback on your resume's strengths, weaknesses, and suggestions for improvement.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div>
              <label className="block text-blue-700 font-semibold mb-2 text-sm sm:text-base">
                Job Description / Required Skills <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50 resize-none text-sm sm:text-base"
                rows="4"
                placeholder="Paste the job description or required skills here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-blue-700 font-semibold mb-2 text-sm sm:text-base">
                Upload Resume (PDF) <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none cursor-pointer bg-blue-50 text-sm sm:text-base"
                required
              />
              <span className="text-xs text-gray-400 mt-1 block">
                Only PDF files are supported.
              </span>
            </div>

            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 sm:py-3 px-4 rounded-lg font-semibold text-base sm:text-lg shadow hover:from-blue-700 hover:to-blue-600 transition duration-300 flex items-center justify-center ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Analyzing...
                </>
              ) : (
                "Analyze Resume"
              )}
            </button>
          </form>

          {/* Accordion appears here */}
          {showAccordion && (
            <div className="mt-8 sm:mt-10">
              <button
                className="w-full flex justify-between items-center bg-blue-100 px-4 sm:px-6 py-3 rounded-lg focus:outline-none border border-blue-200 shadow-sm"
                onClick={() => setAccordionOpen((open) => !open)}
                type="button"
              >
                <span className="font-semibold text-blue-800 text-base sm:text-lg flex items-center gap-2">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  Analysis Result
                </span>
                <span className="text-blue-600 text-lg">{accordionOpen ? "▲" : "▼"}</span>
              </button>
              {accordionOpen && analysisResult && (
                <div className="bg-white border border-t-0 border-blue-200 rounded-b-lg px-4 sm:px-6 py-5 sm:py-6 shadow-inner animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h3 className="text-blue-700 font-bold mb-1 flex items-center gap-1 text-base sm:text-lg">
                        <span>Score</span>
                        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <circle cx="10" cy="10" r="10" />
                        </svg>
                      </h3>
                      <p className="text-xl sm:text-2xl font-extrabold text-green-600">{analysisResult[3]}</p>
                    </div>
                    <div>
                      <h3 className="text-blue-700 font-bold mb-1 text-base sm:text-lg">Strengths</h3>
                      <p className="text-gray-700 text-sm sm:text-base">{analysisResult[0]}</p>
                    </div>
                    <div>
                      <h3 className="text-blue-700 font-bold mb-1 text-base sm:text-lg">Weaknesses</h3>
                      <p className="text-gray-700 text-sm sm:text-base">{analysisResult[1]}</p>
                    </div>
                    <div>
                      <h3 className="text-blue-700 font-bold mb-1 text-base sm:text-lg">Suggestions</h3>
                      <p className="text-gray-700 text-sm sm:text-base">{analysisResult[2]}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-blue-100 py-4 text-center text-gray-500 text-xs sm:text-sm mt-10">
        &copy; {new Date().getFullYear()} ATS Resume Checker. All rights reserved.
      </footer>
    </div>
  );
};

export default ResumeAnalyzer;