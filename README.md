# 기아Biz FAQ 클론 프로젝트

이 프로젝트는 현대 오토에버 프론트엔드 개발자 채용을 위한 과제 테스트의 결과물입니다.

## 프로젝트 개요

현대 오토에버의 웹사이트를 최대한 동일하게 클론하는 것을 목표로 합니다.

## 기술 스택

- **Framework**: Next.js
- **Library**: React
- **API Mocking**: MSW (Mock Service Worker)
- **Data Fetching**: React-Query
- **Code Quality**: ESLint, Prettier
- **Styling**: Vanilla CSS

## 목표

- [~] 웹/모바일 반응형 페이지 구현 (기본 구조 구현)
- [ ] 서비스 도입 탭, 서비스 이용 탭 내용 각각 구현
- [ ] 서비스 문의 버튼 3종 기능 구현
- [~] FAQ 질문 목록의 DB화 (MSW 설정 완료)

## 현재 진행 상황

- [x] CSS 스타일 추가 (globals.css)
- [x] 이미지 리소스 추가
- [x] 기본 헤더/본문/푸터 UI 구현
  - [x] Header 컴포넌트
  - [x] Footer 컴포넌트
  - [ ] 모바일 네비게이션
- [~] MSW 설정 및 API 모킹 환경 구성

## TODO

- [ ] 본문 내 재사용되는 컴포넌트가 있다면 공통 컴포넌트로 분리
- [ ] 각 부분의 기능 구현
  - [ ] 서비스 도입/이용 탭 기능
  - [ ] 서비스 문의 버튼 기능
  - [ ] FAQ 데이터 연동
  - [ ] 반응형 디자인 보완

## 설치 및 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 프로젝트 구조

```
├── src/
│   ├── app/             # Next.js App Router 페이지 및 레이아웃
│   │   ├── globals.css/ # 전역 스타일 및 테마
│   ├── components/      # 재사용 가능한 컴포넌트
│   │   ├── common/      # 공통 컴포넌트 (버튼, 입력 필드 등)
│   │   ├── layout/      # 레이아웃 관련 컴포넌트
│   │   └── features/    # 특정 기능에 관련된 컴포넌트
│   ├── lib/             # 외부 라이브러리 설정 및 유틸리티
│   ├── types/           # TypeScript 타입 정의
│   └── utils/           # 유틸리티 함수
├── public/              # 정적 파일 (이미지, 폰트 등)
└── mocks/               # MSW 관련 파일
```
