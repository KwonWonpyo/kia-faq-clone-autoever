'use client';

import { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
        <div className="inner">
          <Link href="/" className="logo">Kia BIZ</Link>
          <nav>
            <ul>
              <li><Link href="/Guide">서비스 소개</Link></li>
              <li className="active"><Link href="/FAQ">자주 묻는 질문</Link></li>
              <li><Link href="/News">새소식</Link></li>
              <li><Link href="/Counsel">상담문의</Link></li>
            </ul>
          </nav>
          <span className="util">
            <button 
              type="button" 
              className="nav" 
              data-ui-click="nav-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              메뉴 열기/닫기
            </button>
          </span>
        </div>
      </header>
    </>
  );
};

export default Header;
