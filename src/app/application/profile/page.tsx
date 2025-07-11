"use client";
import React, { useState, useRef, useEffect } from "react";

const ProfilePage: React.FC = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [confirmDeleteText, setConfirmDeleteText] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const fullNameRef = useRef<HTMLInputElement>(null);
  const jobTitleRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSaveProfile = () => {
    const fullName = fullNameRef.current?.value;
    const jobTitle = jobTitleRef.current?.value;
    if (fullName && jobTitle) {
      setMessage({ type: "success", text: "Profile updated successfully" });
    }
  };

  const handleUpdatePassword = () => {
    const currentPassword = currentPasswordRef.current?.value;
    const newPassword = newPasswordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;
    if (currentPassword && newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        setMessage({ type: "success", text: "Password updated successfully" });
        if (currentPasswordRef.current) currentPasswordRef.current.value = "";
        if (newPasswordRef.current) newPasswordRef.current.value = "";
        if (confirmPasswordRef.current) confirmPasswordRef.current.value = "";
      } else {
        setMessage({ type: "error", text: "New passwords do not match" });
      }
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="font-['Pacifico'] text-2xl text-primary">
              QuantumQuill
            </a>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="https://readdy.ai/home/9a2b3702-8799-4221-b01f-1c56161de231/43ba8f86-766e-4908-a314-a9018cba3a0c"
              data-readdy="true"
              className="nav-link text-gray-500 hover:text-gray-900 font-medium"
            >
              Drafts
            </a>
            <a
              href="#"
              className="nav-link text-gray-500 hover:text-gray-900 font-medium"
            >
              Templates
            </a>
            <a
              href="#"
              className="nav-link text-gray-500 hover:text-gray-900 font-medium"
            >
              Settings
            </a>
          </nav>
          <div className="relative">
            <button
              className="flex items-center focus:outline-none"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            >
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520person%2520with%2520neutral%2520expression%252C%2520high%2520quality%2520portrait%2520photo%252C%2520soft%2520lighting%252C%2520clean%2520background&width=100&height=100&seq=1&orientation=squarish"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </button>
            <div
              className={`dropdown mt-2 w-48 bg-white rounded shadow-lg py-1 text-sm ${
                isProfileDropdownOpen ? "show" : ""
              }`}
            >
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 bg-gray-100"
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
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/3">
            <div className="bg-white rounded shadow-sm p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img
                      src="https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520person%2520with%2520neutral%2520expression%252C%2520high%2520quality%2520portrait%2520photo%252C%2520soft%2520lighting%252C%2520clean%2520background&width=200&height=200&seq=2&orientation=squarish"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-sm hover:bg-opacity-90">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-camera-line"></i>
                    </div>
                  </button>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Alexandra Reynolds
                </h2>
                <p className="text-gray-500 text-sm">
                  Senior Content Strategist
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    defaultValue="Alexandra Reynolds"
                    ref={fullNameRef}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="jobTitle"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Job Title
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    defaultValue="Senior Content Strategist"
                    ref={jobTitleRef}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    rows={4}
                    defaultValue="Content strategy expert with 8+ years of experience in digital publishing and AI-assisted writing. Passionate about creating engaging, informative content that resonates with audiences."
                    ref={bioRef}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="flex items-center">
                    <span className="text-gray-800">
                      alexandra.reynolds@example.com
                    </span>
                    <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                      Verified
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Member since: April 12, 2023
                  </p>
                </div>
                <button
                  className="w-full bg-primary text-white px-4 py-2 rounded-button font-medium shadow-sm hover:bg-opacity-90 whitespace-nowrap"
                  onClick={handleSaveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
            <div className="bg-white rounded shadow-sm p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Account Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Projects</span>
                  <span className="font-semibold text-gray-900">27</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Published</span>
                  <span className="font-semibold text-gray-900">18</span>
                </div>
                <div className="flex justify-between items-center">
                  ..
                  <span className="text-gray-600">In Review</span>
                  <span className="font-semibold text-gray-900">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Drafts</span>
                  <span className="font-semibold text-gray-900">6</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Storage Used</span>
                  <span className="font-semibold text-gray-900">
                    1.2 GB / 5 GB
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3 space-y-6">
            <div className="bg-white rounded shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Account Settings
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-medium text-gray-800 mb-3">
                    Change Password
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label
                        htmlFor="currentPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        ref={currentPasswordRef}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        ref={newPasswordRef}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        ref={confirmPasswordRef}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Confirm new password"
                      />
                    </div>
                    <button
                      className="bg-primary text-white px-4 py-2 rounded-button font-medium shadow-sm hover:bg-opacity-90 whitespace-nowrap"
                      onClick={handleUpdatePassword}
                    >
                      Update Password
                    </button>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-base font-medium text-gray-800 mb-3">
                    Security Settings
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-800 font-medium">
                          Two-Factor Authentication
                        </p>
                        <p className="text-sm text-gray-500">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider"></span>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-800 font-medium">
                          Login Notifications
                        </p>
                        <p className="text-sm text-gray-500">
                          Receive alerts when your account is accessed
                        </p>
                      </div>
                      <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-base font-medium text-gray-800 mb-3">
                    Language & Region
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="language"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Language
                      </label>
                      <div className="relative">
                        <select
                          id="language"
                          className="w-full appearance-none px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-8"
                        >
                          <option value="en">English (US)</option>
                          <option value="en-gb">English (UK)</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                          <option value="es">Spanish</option>
                          <option value="ja">Japanese</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <i className="ri-arrow-down-s-line text-gray-400"></i>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="timezone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Time Zone
                      </label>
                      <div className="relative">
                        <select
                          id="timezone"
                          className="w-full appearance-none px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-8"
                        >
                          <option value="utc-8">Pacific Time (UTC-8)</option>
                          <option value="utc-7">Mountain Time (UTC-7)</option>
                          <option value="utc-6">Central Time (UTC-6)</option>
                          <option value="utc-5">Eastern Time (UTC-5)</option>
                          <option value="utc+0">
                            Greenwich Mean Time (UTC+0)
                          </option>
                          <option value="utc+1">
                            Central European Time (UTC+1)
                          </option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <i className="ri-arrow-down-s-line text-gray-400"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Notification Preferences
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-medium text-gray-800 mb-3">
                    Email Notifications
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-800">Project Updates</p>
                        <p className="text-sm text-gray-500">
                          Get notified when changes are made to your projects
                        </p>
                      </div>
                      <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-800">Comments & Feedback</p>
                        <p className="text-sm text-gray-500">
                          Receive notifications for comments on your content
                        </p>
                      </div>
                      <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-800">AI Writing Suggestions</p>
                        <p className="text-sm text-gray-500">
                          Get AI-powered writing improvement suggestions
                        </p>
                      </div>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-base font-medium text-gray-800 mb-3">
                    Newsletter & Updates
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-800">Product Updates</p>
                        <p className="text-sm text-gray-500">
                          Stay informed about new features and improvements
                        </p>
                      </div>
                      <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-800">
                          Writing Tips & Tutorials
                        </p>
                        <p className="text-sm text-gray-500">
                          Receive educational content to improve your writing
                        </p>
                      </div>
                      <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-800">Special Offers</p>
                        <p className="text-sm text-gray-500">
                          Get notified about promotions and special deals
                        </p>
                      </div>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Connected Accounts
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-[#1877F2] text-white rounded-full mr-3">
                      <i className="ri-facebook-fill"></i>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">Facebook</p>
                      <p className="text-sm text-gray-500">
                        Share your content directly to Facebook
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-gray-300 rounded-button text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                    Connect
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-[#1DA1F2] text-white rounded-full mr-3">
                      <i className="ri-twitter-x-fill"></i>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">Twitter</p>
                      <p className="text-sm text-gray-500">
                        Share your content directly to Twitter
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-gray-300 rounded-button text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                    Connect
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-[#0A66C2] text-white rounded-full mr-3">
                      <i className="ri-linkedin-fill"></i>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">LinkedIn</p>
                      <p className="text-sm text-gray-500">
                        Connect to share professional content
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gray-200 rounded-button text-gray-800 hover:bg-gray-300 whitespace-nowrap">
                    Connected
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-[#000000] text-white rounded-full mr-3">
                      <i className="ri-medium-fill"></i>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">Medium</p>
                      <p className="text-sm text-gray-500">
                        Publish your articles directly to Medium
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-gray-300 rounded-button text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                    Connect
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-[#7289DA] text-white rounded-full mr-3">
                      <i className="ri-discord-fill"></i>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">Discord</p>
                      <p className="text-sm text-gray-500">
                        Join our community for support and tips
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-gray-300 rounded-button text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                    Connect
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white rounded shadow-sm p-6 border border-red-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Danger Zone
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-medium text-gray-800 mb-2">
                    Export Your Data
                  </h4>
                  <p className="text-sm text-gray-500 mb-3">
                    Download all your data including projects, drafts, and
                    account information
                  </p>
                  <button className="px-4 py-2 border border-gray-300 rounded-button text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                    Export Data
                  </button>
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-base font-medium text-red-600 mb-2">
                    Delete Account
                  </h4>
                  <p className="text-sm text-gray-500 mb-3">
                    Permanently delete your account and all associated data.
                    This action cannot be undone.
                  </p>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-button hover:bg-red-700 whitespace-nowrap"
                    onClick={() => setIsDeleteModalOpen(true)}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
          isDeleteModalOpen ? "" : "hidden"
        }`}
      >
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Delete Account
          </h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete your account? This will permanently
            remove all your data and cannot be undone.
          </p>
          <div className="mb-4">
            <label
              htmlFor="confirmDeleteText"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Type "DELETE" to confirm
            </label>
            <input
              type="text"
              id="confirmDeleteText"
              value={confirmDeleteText}
              onChange={(e) => setConfirmDeleteText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="DELETE"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              className="px-4 py-2 border border-gray-300 rounded-button text-gray-700 hover:bg-gray-50 whitespace-nowrap"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setConfirmDeleteText("");
              }}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-button hover:bg-red-700 whitespace-nowrap"
              disabled={confirmDeleteText !== "DELETE"}
              onClick={() => {
                if (confirmDeleteText === "DELETE") {
                  setIsDeleteModalOpen(false);
                  setConfirmDeleteText("");
                  setMessage({
                    type: "success",
                    text: "Account deleted successfully",
                  });
                }
              }}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {message && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-lg z-50 ${
            message.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {message.text}
        </div>
      )}
    </>
  );
};

export default ProfilePage;
