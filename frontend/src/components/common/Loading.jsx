import React from 'react';
import { Brain } from 'lucide-react';

const Loading = ({ message = 'Loading...', size = 'default' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    default: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const containerClasses = {
    small: 'p-4',
    default: 'p-8',
    large: 'p-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${containerClasses[size]}`}>
      <div className="relative">
        {/* Spinning outer ring */}
        <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}></div>
        
        {/* Brain icon in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Brain className={`${size === 'small' ? 'w-2 h-2' : size === 'large' ? 'w-6 h-6' : 'w-4 h-4'} text-blue-600`} />
        </div>
      </div>
      
      {message && (
        <p className={`mt-4 text-gray-600 ${size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : 'text-base'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

// Full screen loading component
export const FullScreenLoading = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Brain className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <p className="text-xl text-gray-600">{message}</p>
      </div>
    </div>
  );
};

// Inline loading for buttons
export const ButtonLoading = ({ size = 'default' }) => {
  const sizeClasses = {
    small: 'w-3 h-3',
    default: 'w-4 h-4',
    large: 'w-5 h-5'
  };

  return (
    <div className={`${sizeClasses[size]} border-2 border-white border-t-transparent rounded-full animate-spin`}></div>
  );
};

export default Loading;