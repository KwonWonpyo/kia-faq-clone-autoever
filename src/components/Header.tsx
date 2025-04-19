'use client';

import { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className={`${isMobileMenuOpen ? 'nav-opened' : ''}`}>
      <header>
        <div className="inner">
          <Link href="https://wiblebiz.kia.com/" className="logo">Kia BIZ</Link>
          <nav>
            <ul>
              <li><Link href="https://wiblebiz.kia.com/Guide">서비스 소개</Link></li>
              <li className="active"><Link href="/FAQ">자주 묻는 질문</Link></li>
              <li><Link href="https://wiblebiz.kia.com/News">새소식</Link></li>
              <li><Link href="https://wiblebiz.kia.com/Guide">상담문의</Link></li>
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
    </div>
  );
};

export default Header;
