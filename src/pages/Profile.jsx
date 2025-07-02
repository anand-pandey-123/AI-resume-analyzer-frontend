import React from "react";

const user = {
  name: "Anand Pandey",
  email: "anand.pandey@email.com",
  avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  joined: "March 2024",
  recentAnalyses: [
    {
      job: "Frontend Developer",
      date: "2025-06-28",
      score: 82,
    },
    {
      job: "Backend Engineer",
      date: "2025-06-20",
      score: 75,
    },
    {
      job: "Full Stack Developer",
      date: "2025-06-10",
      score: 88,
    },
  ],
};

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col items-center py-10">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-2xl border border-blue-100">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          <img
            src={user.avatar}
            alt="Profile"
            className="h-28 w-28 rounded-full border-4 border-blue-200 shadow-lg object-cover"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-extrabold text-blue-800 mb-1">{user.name}</h2>
            <p className="text-gray-600 text-lg mb-2">{user.email}</p>
            <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
              Member since {user.joined}
            </span>
          </div>
        </div>
        <hr className="my-6 border-blue-100" />
        <div>
          <h3 className="text-xl font-bold text-blue-700 mb-4">Recent Analyses</h3>
          {user.recentAnalyses.length === 0 ? (
            <p className="text-gray-500">No analyses yet. Try uploading your resume!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-blue-100 rounded-lg">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-blue-700 font-semibold">Job Title</th>
                    <th className="px-4 py-2 text-left text-blue-700 font-semibold">Date</th>
                    <th className="px-4 py-2 text-left text-blue-700 font-semibold">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {user.recentAnalyses.map((item, idx) => (
                    <tr key={idx} className="border-t border-blue-50 hover:bg-blue-50 transition">
                      <td className="px-4 py-2">{item.job}</td>
                      <td className="px-4 py-2">{item.date}</td>
                      <td className="px-4 py-2">
                        <span className={`font-bold ${item.score >= 80 ? "text-green-600" : "text-yellow-600"}`}>
                          {item.score}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;