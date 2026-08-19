"use client";
import React, { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";

interface Draft {
  id: number;
  title: string;
  type: string;
  status: string;
  statusColor: string;
  lastModified: string;
}

const QuantumQuillDashboard = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const drafts: Draft[] = [
    // {
    //   id: 1,
    //   title: "AI in Education: Transforming Learning",
    //   type: "Research Article",
    //   status: "Draft",
    //   statusColor: "bg-gray-100 text-gray-600",
    //   lastModified: "May 2, 2025",
    // },
    // {
    //   id: 2,
    //   title: "Quantum Computing: The Next Frontier",
    //   type: "Technical Paper",
    //   status: "In Review",
    //   statusColor: "bg-orange-100 text-orange-600",
    //   lastModified: "May 1, 2025",
    // },
    // {
    //   id: 3,
    //   title: "Climate Change: Global Solutions",
    //   type: "Policy Brief",
    //   status: "Published",
    //   statusColor: "bg-green-100 text-green-600",
    //   lastModified: "April 28, 2025",
    // },
    // {
    //   id: 4,
    //   title: "The Future of Remote Work",
    //   type: "Business Report",
    //   status: "Draft",
    //   statusColor: "bg-gray-100 text-gray-600",
    //   lastModified: "April 25, 2025",
    // },
    // {
    //   id: 5,
    //   title: "Sustainable Architecture Principles",
    //   type: "Design Guide",
    //   status: "Draft",
    //   statusColor: "bg-gray-100 text-gray-600",
    //   lastModified: "April 22, 2025",
    // },
    // {
    //   id: 6,
    //   title: "Digital Privacy in the Modern Age",
    //   type: "Essay",
    //   status: "In Review",
    //   statusColor: "bg-orange-100 text-orange-600",
    //   lastModified: "April 20, 2025",
    // },
  ];
  const router = useRouter();
  const handleCreateProject = () => {
    if (projectTitle.trim()) {
      // Here you would typically add the new project to your state/database
      console.log("Creating project:", {
        projectTitle,
        projectType,
        projectDescription,
      });
      setProjectTitle("");
      setProjectType("");
      setProjectDescription("");
      router.push(
        `/application/editor?title=${encodeURIComponent(
          projectTitle,
        )}&type=${encodeURIComponent(
          projectType,
        )}&description=${encodeURIComponent(projectDescription)}`,
      );
      setIsNewProjectModalOpen(false);
    }
  };

  const handleDeleteProject = () => {
    // Here you would typically delete the project from your state/database
    console.log("Deleting project");
    setIsDeleteModalOpen(false);
  };

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <a
              href="#"
              className="text-2xl text-indigo-600"
              style={{ fontFamily: "Pacifico, cursive" }}
            >
              QuantumQuill
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="relative text-gray-900 font-medium after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-0.5 after:bg-indigo-600 after:rounded-sm"
            >
              Drafts
            </a>
            {/* <a
              href="#"
              className="text-gray-500 hover:text-gray-900 font-medium"
            >
              Templates
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 font-medium"
            >
              Settings
            </a> */}
          </nav>

          <div className="relative">
            <button
              className="flex items-center focus:outline-none"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            >
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-medium">
                  JD
                </div>
              </div>
            </button>

            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 text-sm">
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </a>
                <div className="border-t border-gray-100 my-1"></div>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Log Out
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
            My Drafts
          </h1>

          <div className="flex items-center space-x-4">
            {/* View Toggle */}
            <div className="flex items-center bg-gray-100 rounded-full p-1">
              <button
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${
                  viewMode === "grid"
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600"
                }`}
                onClick={() => setViewMode("grid")}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${
                  viewMode === "list"
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600"
                }`}
                onClick={() => setViewMode("list")}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            <button
              className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-indigo-700 transition-colors whitespace-nowrap"
              onClick={() => {
                setIsNewProjectModalOpen(true);
              }}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Create New Project
            </button>
          </div>
        </div>

        {/* Drafts Grid */}
        {drafts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
            <svg
              className="w-16 h-16 mb-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 48 48"
            >
              <rect
                x="8"
                y="12"
                width="32"
                height="24"
                rx="4"
                strokeWidth={2}
                stroke="currentColor"
              />
              <path
                d="M16 20h16M16 28h8"
                strokeWidth={2}
                stroke="currentColor"
                strokeLinecap="round"
              />
            </svg>
            <p className="text-lg font-medium mb-2">No drafts found</p>
            <p className="text-sm">
              Start by creating a new project to see your drafts here.
            </p>
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {drafts.map((draft) => (
              <div
                key={draft.id}
                className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {draft.title as ReactNode}
                    </h3>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${draft.statusColor} w-20 text-center`}
                    >
                      {draft.status as ReactNode}
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mb-1">
                    {draft.type as ReactNode}
                  </p>
                  <p className="text-xs text-gray-400">
                    Last modified: {draft.lastModified as ReactNode}
                  </p>

                  <div className="flex justify-end space-x-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                    <button
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 transition-colors group"
                      onClick={() => setIsDeleteModalOpen(true)}
                    >
                      <svg
                        className="w-4 h-4 text-gray-600 group-hover:text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Draft
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this draft? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                onClick={handleDeleteProject}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Project Modal */}
      {isNewProjectModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Create New Project
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Title
              </label>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="Enter project title"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Type
              </label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              >
                <option value="">Select project type</option>
                <option value="article">Article</option>
                <option value="essay">Essay</option>
                <option value="report">Report</option>
                <option value="paper">Research Paper</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (Optional)
              </label>
              <textarea
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="Brief description of your project"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setIsNewProjectModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                onClick={handleCreateProject}
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuantumQuillDashboard;
