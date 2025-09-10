import { useState } from "react";
export function Header() {
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
  const [isShareDropdownOpen, setIsShareDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleExport = (format: string) => {
    console.log(`Exporting as ${format}`);
    setIsExportDropdownOpen(false);
  };

  const handleShare = (method: string) => {
    console.log(`Sharing via ${method}`);
    setIsShareDropdownOpen(false);
  };

  const handleProfileAction = (action: string) => {
    console.log(`Profile action: ${action}`);
    setIsProfileDropdownOpen(false);
  };

  const renderExportDropdown = () => (
    <div className="absolute top-full right-0 mt-1 bg-gray-800 border border-gray-600 rounded shadow-lg z-10 min-w-[180px]">
      <div className="py-1">
        <button
          onClick={() => handleExport("PDF")}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-file-pdf-line mr-2"></i>Export as PDF
        </button>
        <button
          onClick={() => handleExport("DOCX")}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-file-word-line mr-2"></i>Export as DOCX
        </button>
        <button
          onClick={() => handleExport("HTML")}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-html5-line mr-2"></i>Export as HTML
        </button>
        <button
          onClick={() => handleExport("TXT")}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-file-text-line mr-2"></i>Export as TXT
        </button>
        <button
          onClick={() => handleExport("RTF")}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-file-line mr-2"></i>Export as RTF
        </button>
        <button
          onClick={() => handleExport("EPUB")}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-book-line mr-2"></i>Export as EPUB
        </button>
      </div>
    </div>
  );

  const renderShareDropdown = () => (
    <div className="absolute top-full right-0 mt-1 bg-gray-800 border border-gray-600 rounded shadow-lg z-10 min-w-[180px]">
      <div className="py-1">
        <button
          onClick={() => handleShare("Link")}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-link mr-2"></i>Share Link
        </button>
        <button
          onClick={() => handleShare("Email")}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-mail-line mr-2"></i>Share via Email
        </button>
        <button
          onClick={() => handleShare("Google Drive")}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-google-line mr-2"></i>Save to Google Drive
        </button>
        <button
          onClick={() => handleShare("Collaborate")}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-team-line mr-2"></i>Invite Collaborators
        </button>
        <button
          onClick={() => handleShare("QR Code")}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-qr-code-line mr-2"></i>Generate QR Code
        </button>
        <div className="border-t border-gray-600 my-1"></div>
        <button
          onClick={() => handleShare("Social")}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-share-line mr-2"></i>Share on Social Media
        </button>
      </div>
    </div>
  );

  const renderProfileDropdown = () => (
    <div className="absolute top-full right-0 mt-1 bg-gray-800 border border-gray-600 rounded shadow-lg z-10 min-w-[200px]">
      <div className="px-4 py-3 border-b border-gray-600">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
            AB
          </div>
          <div>
            <div className="text-sm font-medium text-white">Alex Brown</div>
            <div className="text-xs text-gray-400">alex.brown@email.com</div>
          </div>
        </div>
      </div>

      <div className="py-1">
        <button
          onClick={() => handleProfileAction("Profile Settings")}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-user-settings-line mr-2"></i>Profile Settings
        </button>
        <button
          onClick={() => handleProfileAction("Account")}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-account-circle-line mr-2"></i>Account
        </button>
        <button
          onClick={() => handleProfileAction("Preferences")}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-settings-3-line mr-2"></i>Preferences
        </button>
        <button
          onClick={() => handleProfileAction("Subscription")}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-vip-crown-line mr-2"></i>Subscription
        </button>
        <div className="border-t border-gray-600 my-1"></div>
        <button
          onClick={() => handleProfileAction("Help & Support")}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-question-line mr-2"></i>Help & Support
        </button>
        <button
          onClick={() => handleProfileAction("Keyboard Shortcuts")}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-keyboard-line mr-2"></i>Keyboard Shortcuts
        </button>
        <div className="border-t border-gray-600 my-1"></div>
        <button
          onClick={() => handleProfileAction("Sign Out")}
          className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors cursor-pointer"
        >
          <i className="ri-logout-box-line mr-2"></i>Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <header className="bg-black border-b border-gray-800 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <i className="ri-quill-pen-line text-white text-lg"></i>
          </div>
          <span className="text-xl font-bold text-white font-pacifico">
            Quantum Quill
          </span>
        </div>

        <nav className="flex items-center space-x-4 text-gray-300">
          <button className="hover:text-white transition-colors whitespace-nowrap cursor-pointer">
            Home
          </button>
          <button className="hover:text-white transition-colors whitespace-nowrap cursor-pointer">
            Features
          </button>
          <button className="hover:text-white transition-colors whitespace-nowrap cursor-pointer">
            Pricing
          </button>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <button className="hover:text-white transition-colors whitespace-nowrap cursor-pointer">
            <i className="ri-save-line mr-1"></i>Save
          </button>

          <div className="relative">
            <button
              onClick={() => {
                setIsExportDropdownOpen(!isExportDropdownOpen);
                setIsShareDropdownOpen(false);
                setIsProfileDropdownOpen(false);
              }}
              className="hover:text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-download-line mr-1"></i>Export
            </button>
            {isExportDropdownOpen && renderExportDropdown()}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setIsShareDropdownOpen(!isShareDropdownOpen);
                setIsExportDropdownOpen(false);
                setIsProfileDropdownOpen(false);
              }}
              className="hover:text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-share-line mr-1"></i>Share
            </button>
            {isShareDropdownOpen && renderShareDropdown()}
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setIsProfileDropdownOpen(!isProfileDropdownOpen);
              setIsExportDropdownOpen(false);
              setIsShareDropdownOpen(false);
            }}
            className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:bg-purple-700 transition-colors"
          >
            AB
          </button>
          {isProfileDropdownOpen && renderProfileDropdown()}
        </div>
      </div>
    </header>
  );
}
