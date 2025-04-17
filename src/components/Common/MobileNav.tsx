'use client';

import Link from 'next/link';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  return (
    <div 
      className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div 
        className={`fixed left-0 top-0 h-full w-full bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">메뉴</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-6">
            <li>
              <Link 
                href="/service" 
                className="block text-gray-600 hover:text-gray-900 text-lg font-medium py-2"
                onClick={onClose}
              >
                서비스소개
              </Link>
            </li>
            <li>
              <Link 
                href="/faq" 
                className="block text-gray-600 hover:text-gray-900 text-lg font-medium py-2"
                onClick={onClose}
              >
                자주묻는질문
              </Link>
            </li>
            <li>
              <Link 
                href="/news" 
                className="block text-gray-600 hover:text-gray-900 text-lg font-medium py-2"
                onClick={onClose}
              >
                새소식
              </Link>
            </li>
            <li>
              <Link 
                href="/inquiry" 
                className="block text-gray-600 hover:text-gray-900 text-lg font-medium py-2"
                onClick={onClose}
              >
                상담문의
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileNav; 