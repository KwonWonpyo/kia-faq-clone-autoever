'use client';

import { useState, useEffect, useRef } from 'react';

interface AccordionItem {
  id: number;
  category: string;
  subCategory: string;
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  activeTab: 'CONSULT' | 'USAGE';
}

export const Accordion = ({ items, activeTab }: AccordionProps) => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [animatingIds, setAnimatingIds] = useState<number[]>([]);
  const accordionRefs = useRef<{ [key: number]: HTMLLIElement | null }>({});
  const contentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const handleClick = (id: number) => {
    if (animatingIds.length > 0) return; // 애니메이션 중에는 클릭 무시

    if (activeId === id) {
      // 같은 아이템을 클릭한 경우 닫기
      setAnimatingIds([id]);
      setActiveId(null);
    } else if (activeId !== null) {
      // 다른 아이템이 열려있는 경우, 닫힘과 열림 애니메이션을 동시에 시작
      setAnimatingIds([activeId, id]);
      setActiveId(id);
    } else {
      // 아무 아이템도 열려있지 않은 경우 바로 열기
      setAnimatingIds([id]);
      setActiveId(id);
    }
  };

  const handleTransitionEnd = (id: number) => {
    setAnimatingIds(prev => prev.filter(animatingId => animatingId !== id));
  };

  useEffect(() => {
    // ref 값을 변수에 복사
    const currentRefs = accordionRefs.current;
    
    // 컴포넌트 언마운트 시 이벤트 리스너 정리
    return () => {
      Object.values(currentRefs).forEach(ref => {
        if (ref) {
          ref.removeEventListener('transitionend', () => handleTransitionEnd(Number(ref.dataset.itemId)));
        }
      });
    };
  }, []);

  useEffect(() => {
    // activeId가 변경될 때마다 height 설정
    if (activeId !== null && contentRefs.current[activeId]) {
      const content = contentRefs.current[activeId];
      const height = content?.scrollHeight || 0;
      content.style.height = `${height}px`;
    }
  }, [activeId]);

  return (
    <ul className="faq-list">
      {items.map((item) => {
        const isActive = activeId === item.id;
        const isAnimating = animatingIds.includes(item.id);
        
        return (
          <li 
            key={item.id} 
            data-ui-item="true"
            data-item-id={item.id}
            className={`
              ${isActive ? 'active' : ''} 
              ${isAnimating ? 'ing' : ''} 
              ${isActive && !isAnimating ? 'show' : ''}
            `.trim()}
            ref={el => {
              accordionRefs.current[item.id] = el;
              if (el) {
                el.addEventListener('transitionend', () => handleTransitionEnd(item.id));
              }
            }}
          >
            <h4 className="a">
              <button 
                type="button" 
                data-ui-click="dropdown-toggle"
                onClick={() => handleClick(item.id)}
              >
                <em>{activeTab === 'CONSULT' ? item.subCategory : item.category}</em>
                {activeTab === 'USAGE' && <em>{item.subCategory}</em>}
                <strong>{item.title}</strong>
              </button>
            </h4>
            <div 
              className="q"
              data-ui-target="true"
              ref={el => {
                contentRefs.current[item.id] = el;
                if (el) {
                  el.style.height = isActive ? `${el.scrollHeight}px` : '0';
                }
              }}
            >
              <div className="inner"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}; 