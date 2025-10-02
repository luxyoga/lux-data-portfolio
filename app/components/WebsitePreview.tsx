'use client';

import { useState } from 'react';

interface WebsitePreviewProps {
  imagePath: string;
  fallbackGradient?: string;
  alt?: string;
  objectFit?: 'contain' | 'cover' | 'fill';
}

export default function WebsitePreview({ 
  imagePath, 
  fallbackGradient = "from-[#5DE7D4] to-[#8B5CF6]",
  alt = "Project preview",
  objectFit = "contain"
}: WebsitePreviewProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className={`w-64 h-32 flex-shrink-0 bg-gradient-to-br ${fallbackGradient} rounded-lg overflow-hidden relative`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-sm font-semibold mb-1">Preview</div>
            <div className="text-xs opacity-80">Click to view</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 h-32 flex-shrink-0 rounded-lg overflow-hidden relative bg-gray-900">
      <img 
        src={imagePath} 
        alt={alt}
        className={`w-full h-full object-${objectFit}`}
        onError={() => setImageError(true)}
      />
      <div className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-colors duration-300"></div>
    </div>
  );
} 