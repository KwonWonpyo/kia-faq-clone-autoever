# 기아Biz FAQ 클론 프로젝트

이 프로젝트는 현대 오토에버 프론트엔드 개발자 채용을 위한 과제 테스트 결과물입니다.

## 프로젝트 개요 📋

현대 오토에버의 웹사이트(https://wiblebiz.kia.com/FAQ)를 최대한 동일하게 클론하는 것을 목표로 합니다.

프로젝트 실행 후 localhost:3000/FAQ 에서 결과물을 확인하실 수 있습니다.

_**Mock Service Worker를 사용했기 때문에 npm run dev를 통해 실행시켜야 확인 가능합니다.**_

## 설치 및 실행 방법 🚀

```bash
# 저장소 클론
git clone https://github.com/KwonWonpyo/kia-faq-clone-autoever.git

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 결과물 스크린샷 📸

### 데스크톱 화면

<img src="./public/screenshots/desktop.jpg" alt="데스크톱 화면" width="600" />

### 모바일 화면

<img src="./public/screenshots/mobile.jpg" alt="모바일 화면" width="300" />

## 핵심 기능 ⭐

- **탭 기반 FAQ 시스템**
  - 서비스 도입/이용 탭 전환 기능
  - 카테고리별 FAQ 필터링
  - FAQ 검색
- **인터랙티브 UI**
  - 아코디언 형태의 FAQ 답변 표시
  - 반응형 웹 디자인
  - 모바일 최적화 네비게이션
- **Top-layer를 이용한 다이얼로그**
  - useDialog 커스텀 hook 구현
  - UI와 DOM을 분리하여 재활용성 향상
  - 브라우저의 top-layer와 ::back-drop 스타일 활용

## 기술 스택 🛠️

- **Framework**: Next.js
- **Library**: React
- **API Mocking**: MSW (Mock Service Worker)
- **Code Quality**: ESLint, Prettier
- **Styling**: Vanilla CSS

## 구현된 기능 ✅

- 웹/모바일 반응형 페이지 기본 구조
- MSW를 활용한 API 모킹 환경 구성
- 서비스 도입/이용 탭 구현
- FAQ 데이터 연동 및 표시
  - FAQ 카테고리 필터 구현
  - FAQ 검색 기능 개발
- 공통 컴포넌트 구조화
  - Header 컴포넌트
  - Footer 컴포넌트
  - Accordion 컴포넌트
- 다이얼로그 표시 기능
- 페이지 내 기타 하이퍼링크를 외부 페이지로 연결

## 프로젝트 구조 📁

```
src/
  ├── app/              # Next.js 앱 라우터
  │   ├── FAQ/         # FAQ 페이지
  │   ├── globals.css  # 전역 스타일
  │   ├── layout.tsx   # 루트 레이아웃
  │   └── providers.tsx # 전역 프로바이더
  ├── components/       # UI 컴포넌트
  ├── contexts/        # Context API
  │   └── MSWContext.tsx # MSW 초기화 컨텍스트
  ├── hooks/           # 커스텀 훅
  │   └── useDialog.tsx # 다이얼로그 훅
  └── mocks/           # MSW 관련 파일
      ├── handlers/    # API 핸들러
      └── browser.ts   # 브라우저 환경 MSW 설정
```
