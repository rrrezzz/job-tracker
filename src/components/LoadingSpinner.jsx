import React from "react";

function LoadingSpinner({ size = "md", fullScreen = false, text = "Loading..." }) {
  // Size variants
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
    xl: "w-16 h-16 border-4",
  };

  const spinner = (
    <div className={`${sizeClasses[size]} border-zinc-600 border-t-green-500 rounded-full animate-spin`} />
  );

  // Full screen overlay version
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-zinc-900/90 flex flex-col items-center justify-center z-50">
        {spinner}
        {text && <p className="mt-4 text-zinc-400 text-sm">{text}</p>}
      </div>
    );
  }

  // Inline version
  return (
    <div className="flex flex-col items-center justify-center p-4">
      {spinner}
      {text && <p className="mt-2 text-zinc-400 text-xs">{text}</p>}
    </div>
  );
}

export default LoadingSpinner;