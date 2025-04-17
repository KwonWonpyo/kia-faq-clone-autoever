# 기아Biz FAQ 클론 프로젝트

이 프로젝트는 현대 오토에버 프론트엔드 개발자 채용을 위한 과제 테스트의 결과물입니다.

## 프로젝트 개요

현대 오토에버의 웹사이트를 최대한 동일하게 클론하는 것을 목표로 합니다.

## 핵심 기능

- **탭 기반 FAQ 시스템**
  - 서비스 도입/이용 탭 전환 기능
  - 카테고리별 FAQ 필터링
  - FAQ 검색
- **인터랙티브 UI**
  - 아코디언 형태의 FAQ 답변 표시
  - 반응형 웹 디자인
  - 모바일 최적화 네비게이션

## 기술 스택

- **Framework**: Next.js
- **Library**: React
- **API Mocking**: MSW (Mock Service Worker)
- **Data Fetching**: React-Query
- **Code Quality**: ESLint, Prettier
- **Styling**: Vanilla CSS

## 구현 현황

### 완료된 기능 ✅

- 웹/모바일 반응형 페이지 기본 구조
- 서비스 도입/이용 탭 구현
- FAQ 데이터 연동 및 표시
- MSW를 활용한 API 모킹 환경 구성
- 공통 컴포넌트 구조화
  - Header 컴포넌트
  - Footer 컴포넌트
  - Accordion 컴포넌트

### 진행 중인 기능 🚧

- FAQ 카테고리 필터 구현
- FAQ 검색 기능 개발
- 서비스 문의 버튼 3종 기능
- 모바일 네비게이션 개선

## 설치 및 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 프로젝트 구조

```
src/
  ├── app/              # Next.js 앱 라우터
  │   └── globals.css   # 전역 스타일
  ├── components/
  │   └── Common/       # 공통 UI 컴포넌트
  ├── contexts/         # Context API
  ├── mocks/            # MSW 관련 파일
  └── types/            # TypeScript 타입 정의
```

## 향후 계획

1. **기능 개선**

   - FAQ 검색 엔진 고도화
   - 카테고리 필터링 UX 개선
   - 실시간 데이터 업데이트 구현

2. **성능 최적화**

   - 컴포넌트 렌더링 최적화
   - 이미지 최적화
   - 번들 사이즈 최적화

3. **사용자 경험 개선**
   - 접근성 강화
   - 로딩 상태 개선
   - 에러 처리 강화
