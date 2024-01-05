'use client';

interface InboxButtonProps {
    notificationCount: number;
}
  

export const InboxButton: React.FC<InboxButtonProps> = ({ notificationCount }) => {
    return (
      <button className="relative flex items-center justify-center bg-blue-500 p-2 rounded text-white">
        {/* Inbox Icon */}
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke= '#EF8354'>
          <path d="M3 7v13h18V7l-9-4-9 4z"></path>
          <path d="M3 7l9 4 9-4"></path>
          <path d="M4 15h16"></path>
          <path d="M18 15l-6 3-6-3"></path>
        </svg>
        {/* Notification Badge */}
        {notificationCount > 0 && (
          <span className="absolute top-2 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 text-t-orange rounded-full">
            {notificationCount}
          </span>
        )}
      </button>
    );
  };
  
