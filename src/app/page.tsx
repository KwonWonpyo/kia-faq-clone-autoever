'use client';

import { useState, useEffect } from "react";
import { Accordion } from "@/components/Common/Accordion";
import { Tabs } from "@/components/Common/Tabs";
import { Filter, FilterOption } from "@/components/Common/Filter";
import { SearchBar } from "@/components/SearchBar";
import { useMSW } from '@/contexts/MSWContext';

// FAQ 아이템 타입 정의
type FAQItem = {
  id: number;
  categoryName: string;
  subCategoryName: string;
  question: string;
  answer: string;
};

// 페이지 정보 타입 정의
type PageInfo = {
  totalRecord: number;
  offset: number;
  limit: number;
  prevOffset: number;
  nextOffset: number;
};

// FAQ 응답 타입 정의
type FAQResponse = {
  items: FAQItem[];
  pageInfo: PageInfo;
};

export default function Home() {
  const { isInitialized } = useMSW();
  const [activeTab, setActiveTab] = useState<"CONSULT" | "USAGE">("CONSULT");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [filterOptions, setFilterOptions] = useState<Array<FilterOption>>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  
  // API에서 필터 옵션 가져오기
  useEffect(() => {
    if (isInitialized) {
      const fetchFilterOptions = async () => {
        try {
          const response = await fetch(`/api/category?tab=${activeTab}`);
          const data = await response.json();
          setFilterOptions([
            { categoryID: "all", name: "전체" },
            ...data
          ]);
        } catch (error) {
          console.error("필터 옵션을 가져오는데 실패했습니다:", error);
        }
      };

      fetchFilterOptions();
    }
  }, [isInitialized, activeTab]);
  
  // FAQ 데이터 가져오기
  useEffect(() => {
    if (isInitialized) {
      const fetchFaqs = async () => {
        try {
          const categoryParam = activeFilter !== "all" ? `&faqCategoryID=${activeFilter}` : "";
          const response = await fetch(`/api/faqs?limit=10&offset=0&tab=${activeTab}${categoryParam}`);
          const data: FAQResponse = await response.json();
          setFaqs(data.items);
          setPageInfo(data.pageInfo);
        } catch (error) {
          console.error("FAQ 데이터를 가져오는데 실패했습니다:", error);
        }
      };
      fetchFaqs();
    }
  }, [isInitialized, activeTab, activeFilter]);
  
  // 탭 항목 정의
  const tabItems = [
    { id: "consult", label: "서비스 도입" },
    { id: "usage", label: "서비스 이용" }
  ];
  
  // 탭 변경 핸들러
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId.toUpperCase() as "CONSULT" | "USAGE");
    setActiveFilter("all"); // 탭 변경 시 필터 초기화
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  // 필터 변경 핸들러
  const handleFilterChange = (optionId: string) => {
    setActiveFilter(optionId);
  };

  const handleLoadMore = () => {
    const fetchFaqs = async (offset: number) => {
      try {
        const categoryParam = activeFilter !== "all" ? `&faqCategoryID=${activeFilter}` : "";
        const response = await fetch(`/api/faqs?limit=10&offset=${offset}&tab=${activeTab}${categoryParam}`);
        const data: FAQResponse = await response.json();
        setFaqs([...faqs, ...data.items]);
        setPageInfo(data.pageInfo);
      } catch (error) {
        console.error("FAQ 데이터를 가져오는데 실패했습니다:", error);
      }
    };
    fetchFaqs(pageInfo?.nextOffset ?? 0);
  };
  // FAQ 아이템 정의
  const faqItems = faqs.map((faq) => ({
    id: faq.id,
    category: faq.categoryName,
    subCategory: faq.subCategoryName,
    title: faq.question,
    content: faq.answer
  }));

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="content">
        <h1>
          자주 묻는 질문 <em>궁금하신 내용을 빠르게 찾아보세요.</em>
        </h1>
        <i className="sticky-checker" />
        <Tabs 
          items={tabItems} 
          activeTab={activeTab.toLowerCase()} 
          onTabChange={handleTabChange} 
        />
        <div className="mt-8 space-y-6">
          <SearchBar onSearch={handleSearch} />
          <Filter
            options={filterOptions}
            activeOption={activeFilter}
            onOptionChange={handleFilterChange}
          />
        </div>
        <Accordion items={faqItems} activeTab={activeTab} />
        {pageInfo && pageInfo?.totalRecord > faqItems.length && (
          <button type="button" className="list-more" onClick={handleLoadMore}>
            <i></i>더보기
          </button>
        )}
        <h2 className="heading-2">서비스 문의</h2>
        <div className="inquiry-info">
          <a
            className="btn-xxlg btn-tertiary"
            href="/static/media/proposal.e465bf89a6a3066e69af.pdf"
            download="기아 비즈 서비스 제안서"
          >
            <i className="ic download" />
            <span>서비스 제안서 다운로드</span>
          </a>
          <a className="btn-xxlg btn-tertiary" href="https://wiblebiz.kia.com/Counsel">
            <i className="ic write" />
            <span>상담문의 등록하기</span>
          </a>
          <a className="btn-xxlg btn-tertiary" href="https://pf.kakao.com/_xfLxjdb" target="_blank" rel="noreferrer">
            <i className="ic talk" />
            <span>
              카톡으로 문의하기 <em>ID : 기아 비즈</em>
            </span>
          </a>
        </div>
        <h2 className="heading-2">이용 프로세스 안내</h2>
        <ol className="process-info">
          <li>
            <i className="ic process-1" />
            <span>
              <strong>문의 등록</strong>
              <em>상담 문의를 등록해 주시면, 담당자가 맞춤형 상담을 제공합니다.</em>
            </span>
          </li>
          <li>
            <i className="ic process-2" />
            <span>
              <strong>관리자 설정</strong>
              <em style={{ maxWidth: '225px' }}>관리자 Web 접속 후 결제방식 및 회사정보를 설정합니다.</em>
            </span>
          </li>
          <li>
            <i className="ic process-3" />
            <span>
              <strong>임직원 가입</strong>
              <em style={{ maxWidth: '200px' }}>이용자 App에서 회원가입 후 소속 회사 인증을 진행합니다.</em>
            </span>
          </li>
          <li>
            <i className="ic process-4" />
            <span>
              <strong>서비스 이용</strong>
              <em style={{ maxWidth: '230px' }}>이용자 App에서 차량 예약을 하고 K존에서 바로 이용하세요!</em>
            </span>
          </li>
        </ol>
        <div className="app-info">
          <h2>
            <em>기아 비즈 App</em> 지금 만나보세요!
          </h2>
          <a href="https://play.google.com/store/apps/details?id=kor.mop.user.app" target="_blank" className="gp" rel="noreferrer">
            Google Play
          </a>
          <a
            href="https://apps.apple.com/kr/app/%EC%9C%84%EB%B8%94-%EB%B9%84%EC%A6%88/id1598065794"
            target="_blank"
            className="as"
            rel="noreferrer"
          >
            App Store
          </a>
        </div>
        <dialog className="dialog-wrapper dialog-error" id="error_faq">
          <div className="dialog-body" style={{ marginTop: '35px' }}>
            <p className="message">검색어는 2글자 이상 입력해주세요.</p>
            <div className="button-group">
              <button type="button" className="btn-xlg btn-tertiary">
                확인
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}
