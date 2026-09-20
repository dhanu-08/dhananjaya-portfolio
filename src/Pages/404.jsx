import React from "react";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 text-center">

        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-8xl sm:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7] mb-4 animate-bounce">
            404
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] mx-auto rounded-full" />
        </div>

        {/* Message */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
            Page Not Found
          </h2>

          <p className="text-base sm:text-lg text-gray-400 max-w-md mx-auto leading-relaxed">
            The page you're looking for may have been moved,
            deleted, or doesn't exist.
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center shadow-2xl">
            <div className="text-6xl">🔍</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>

          <button
            onClick={handleGoHome}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-xl hover:shadow-lg hover:shadow-[#6366f1]/20 transition-all duration-300 hover:scale-105"
          >
            <Home size={20} />
            Home
          </button>

        </div>
      </div>
    </div>
  );
}