import { http, HttpResponse } from 'msw';

// 서비스 도입 탭의 필터 옵션
const consultFilterOptions = [
  { categoryID: 'PRODUCT', name: '서비스 상품' },
  { categoryID: 'COUNSELING', name: '도입 상담' },
  { categoryID: 'CONTRACT', name: '계약' }
];

// 서비스 이용 탭의 필터 옵션
const usageFilterOptions = [
  { categoryID: "SIGN_UP", name: "가입문의" },
  { categoryID: "BUSINESS", name: "비즈니스(업무용)" },
  { categoryID: "ACCIDENT", name: "사고/보험" },
  { categoryID: "RESERVATION", name: "예약/결제" },
  { categoryID: "VEHICLE", name: "차량문의" },
  { categoryID: "REFUEL", name: "충전" },
  { categoryID: "COUPON", name: "쿠폰/기타" }
];

// 새로운 FAQ 데이터 구조
const newFaqData = {
  CONSULT: {
    totalRecord: 4,
    items: [
      {
        id: 38,
        categoryName: "도입문의",
        subCategoryName: "서비스 상품",
        question: "기아 비즈에서는 어떤 상품을 이용할 수 있나요?",
        answer: "<p>소속 회사가 기아 비즈 이용 계약이 되어있다면,<br>업무 시간에는 이용 건별 별도 결제 없이 편리하게 업무용 차량을 이용할 수 있고(대여 요금은 소속 회사에서 부담), <br>비업무 시간에는 출퇴근 및 주말 여가옹으로 차량을 이용 (대여 요금은 개인이 부담) 할 수 있습니다.</p><p> </p><p>자세한 상품 안내는 메뉴 > 하단의 '이용가이드' > 상품 안내 탭을 통해 확인하실 수 있습니다.<br> </p><p> </p>"
      },
      {
        id: 107,
        categoryName: "도입문의",
        subCategoryName: "서비스 상품",
        question: "기아 비즈 비즈니스용 상품 이용 시 무엇이 좋은가요?",
        answer: "<p>기아 비즈의 '비즈니스 상품' 이용 시, 기존 차량 이용 대비 아래와 같은 장점이 있습니다.</p><p>- 차량 보유 및 유지관리비 부담 없이, 우리 회사의 차량 이용 패턴에 딱 맞는 상품으로 계약 후 업무용 차량 운영 가능</p><p>- App 하나로 편하게 예약하고, 스마트키로 제어하는 비대면 간편 대여</p><p>- 회사가 등록한 결제 수단으로 자동 결제 및 간편한 증빙 가능</p><p>* 재직 중인 회사의 기아 비즈 차량 이용과 관련한 자세한 내용은 사내 기아 비즈 담당자에게 문의하시기 바랍니다.</p>"
      },
      {
        id: 134,
        categoryName: "도입문의",
        subCategoryName: "도입 상담",
        question: "비즈니스 상품 도입 기간은 얼마나 걸리나요?",
        answer: "<p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">기아 비즈 도입 상담을 신청하신 경우, 빠른 시일 내에 기재해주신 연락처로 연락드릴 예정입니다. </span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">담당자와의 1:1 상담 후 최대한 원하시는 시기에 맞춰 서비스가 도입될 수 있도록 도와드리고 있으나, 도입하시는 상품에 따라 소요되는 기간은 다소 상이할 수 있습니다. </span></p>"
      },
      {
        id: 135,
        categoryName: "도입문의",
        subCategoryName: "계약",
        question: "비즈니스 상품 도입 절차가 어떻게 되나요?",
        answer: "<p>기아 비즈 '비즈니스 상품' 도입 절차는 아래와 같습니다.</p><p>① 상담 문의 등록 후 1:1 맞춤 상담 진행</p><p>② 서비스 도입 상품 및 세부 조건 협의 후 계약 진행</p><p>③ 관리자 Web 계정 생성 후 회사 정보 설정</p><p>④ 임직원 회원가입 진행</p><p>⑤ 전용 K존에서 차량 대여 및 이용</p>"
      }
    ]
  },
  USAGE: {
    totalRecord: 105,
    items: [
      {
        id: 23,
        categoryName: "가입문의",
        subCategoryName: "가입",
        question: "가입 및 이용 조건은 어떻게 되나요?",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">아래의 조건 충족 시 기아 비즈 가입 및 이용이 가능합니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">① 만 21세 이상 *단, 일부 차종에 따라 나이 기준 상이하므로 이용 전 확인 필요</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">② 취득일로부터 1년 이상 경과한 대한민국 운전면허 보유</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">③ 본인 명의의 휴대폰 보유 (가족, 타인 명의 휴대폰 불가)</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">④ 본인 명의의 신용/체크 카드 보유 (타인 명의 카드 등록 불가)</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">⑤ 가입/이용 필수 약관 동의</span></span></p>"
      },
      {
        id: 24,
        categoryName: "가입문의",
        subCategoryName: "가입",
        question: "가입 절차는 어떻게 되나요?",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">기아 비즈 앱에서 아래와 같은 절차를 통해 회원 가입을 할 수 있습니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">① 본인 인증 : 본인 명의 휴대폰을 통해 본인 인증</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">② 약관 동의 : 서비스 이용을 위한 필수/선택 약관 동의</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">③ 개인정보 입력 : 아이디, 비밀번호, 주소 입력 및 마케팅 정보 수신동의 (선택)</span></span></p><p> </p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">상품 구매(예약) 및 차량을 이용하시려면 운전면허 정보와 결제카드 정보까지 등록해야 합니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">④ 운전면허 정보 입력 : 취득일로부터 1년 이상 경과한 대한민국 운전면허 등록 가능 (마이페이지 > 결제/운전면허 관리)</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">⑤ 결제정보 입력: 본인 명의의 신용/체크카드 입력 가능 (마이페이지 > 결제/운전면허 관리)</span></span></p><p> </p>"
      },
      {
        id: 26,
        categoryName: "가입문의",
        subCategoryName: "가입",
        question: "가입한 적이 없는데 이미 가입한 회원이라고 나오며 가입이 되지 않아요.",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">가입한 적이 없는데 이미 가입한 회원이라고 나오며 가입이 되지 않는 상황일 경우</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">기아 비즈 고객센터에 문의해주시면 바로 도움을 드리겠습니다.</span></span></p>"
      },
      {
        id: 27,
        categoryName: "가입문의",
        subCategoryName: "가입",
        question: "본인 인증이 정상적으로 되지 않아요.",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">휴대폰 본인인증이 안된다면 아래 경우를 확인해주세요.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">1. 안드로이드</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">① 본인 명의의 휴대폰을 사용하고 계신가요?</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">: 타인 명의의 휴대폰을 사용하고 있다면 인증이 불가능합니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">② 기기 접근 권한에 동의하셨나요?</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">: 기기 접근 권한에 동의하지 않으실 경우 인증을 진행할 수 없습니다. 아래 절차를 통해 기기 접근 권한에 동의해주세요.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">&lt;기기 접근 권한 동의 방법&gt;</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">휴대폰 [설정] - [어플리케이션] - [기아 비즈 앱 권한] - [전화] - 기기 접근 권한 동의</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">③ 입력한 휴대폰 번호와 인증을 시도한 휴대폰 번호가 동일한가요?</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">: 입력한 휴대폰 번호와 인증을 시도한 휴대폰 번호가 다르다면 인증이 불가합니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">④ 휴대폰 정보에 등록된 번호가 없다고 나오나요?</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">: 내장된 USIM에 휴대폰 번호가 정상적으로 인식되지 않은 경우 해당 오류가 발생할 수 있습니다. 문제 해결을 위해 가입하신 통신사로 문의해 주세요.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">2. iOS</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">① 본인 명의의 휴대폰을 사용하고 계신가요?</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">: 타인 명의의 휴대폰을 사용하고 있다면 인증이 불가합니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">② 문자 발송이 안되나요?</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">: 문자 내용을 수정한 경우, 문자 내용을 조금이라도 수정했을 경우 인증이 불가합니다. 반드시 자동 입력되는 문자 내용을 일체의 수정없이 그대로 발송해주세요.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">: 사용 중인 요금제 특성 상 문자 발송이 포함되어 있지 않은 경우, 본인인증은 문자 발송을 이용한 기기인증을 통해 이루어지며, 문자 발송을 하지 못하면 인증이 불가합니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">*문자 건당 이용료를 지불하고 있는 회원의 경우 기기인증을 위한 SMS 전송으로 본인 부담 비용이 발생할 수 있습니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">③ 위 두 가지 사항에 해당하지 않을 경우, 와이파이 연결을 해제 후 본인인증을 다시 시도해 주세요.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">④ 인증 도중 앱이 종료되었나요?</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">: 인증 도중 앱이 종료된 경우 인증을 처음부터 다시 진행해 주세요.</span></span></p><p> </p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">위의 방법으로도 인증이 불가하신 경우, 기아 비즈 고객센터에 문의해주시면 도움을 드리겠습니다.</span></span></p>"
      },
      {
        id: 28,
        categoryName: "가입문의",
        subCategoryName: "로그인",
        question: "아이디/비밀번호를 분실했어요.",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">아이디/비밀번호를 분실하신 경우, 로그인 화면의 '아이디 찾기' 혹은 '비밀번호 찾기'를 통해 해결 가능합니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">① 아이디 분실 시 : 아이디 찾기 > 휴대폰 본인 인증 > 아이디 확인</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">② 비밀번호 분실 시 : 비밀번호 초기화 > 휴대폰 본인 인증 > 새로운 비밀번호 설정</span></span></p><p> </p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">위의 방법으로도 해결이 어려우신 경우, 기아 비즈 고객센터로 문의해주시면 도움을 드리겠습니다.</span></span></p>"
      },
      {
        id: 29,
        categoryName: "가입문의",
        subCategoryName: "회원등급",
        question: "Greener 등급이란 무엇인가요? 등급별 혜택은 어떻게 되나요?",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">기아 비즈에서는 더 나은 환경을 위하여 친환경 차량 주행을 하시는 회원을 대상으로 'Greener' 등급 제도를 운영하고 있습니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">운전면허를 등록하여 정상적으로 기아 비즈의 차량 이용이 가능한 시점부터 회원 등급이 부여되며, 개인, 비즈니스 프로필의 최근 6개월 간의 월평균 친환경차 주행거리 합산 실적을 기반으로 등급이 부여됩니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">(가입으로부터 6개월이 되지 않은 회원의 경우, 가입 후 개월수의 평균으로 산정)</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">매월 1일, Greener 등급이 재산정되며, 등급에 따른 다양한 혜택이 지급됩니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">자세한 혜택은 메뉴 > 나의 등급 옆 '혜택보기' 를 통해 확인하실 수 있습니다.</span></span></p><p> </p><p> </p>"
      },
      {
        id: 30,
        categoryName: "가입문의",
        subCategoryName: "면허",
        question: "기아 비즈를 이용하려면 면허증이 반드시 필요한가요?",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">기아 비즈 차량 이용을 위해서는 반드시 취득일이 1년 이상 경과한 대한민국 운전면허증(실물) 또는 모바일 운전면허증이 필요합니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">운전면허증을 분실하였을 경우 운전면허 재발급을 받으신 후 이용이 가능합니다.</span></span></p>"
      },
      {
        id: 31,
        categoryName: "가입문의",
        subCategoryName: "면허",
        question: "운전면허를 취득한지 1년이 되지 않았어요.",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">안전한 차량 운행을 위하여 취득일이 1년 이상 경과한 면허증을 소지한 경우에만 차량 이용이 가능합니다.</span></span></p>"
      },
      {
        id: 32,
        categoryName: "가입문의",
        subCategoryName: "면허",
        question: "운전면허를 재발급 받은지 1년이 되지 않았어요.",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">면허 취득일로부터 1년이 지났으나 재발급으로 인해 발급일이 1년 미만인 운전면허를 신규로 등록하는 경우,</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">기아 비즈 앱 - 왼쪽 상단 메뉴 - [마이페이지] - [결제/운전면허 관리] 에서 면허증을 촬영하여 면허 정보를 우선 등록한 후, </span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">기아 비즈 고객센터에 문의하여 안내받은 메일로 면허 승인을 위한 서류(운전경력증명서 - 정부 24(https://www.gov.kr/)에서 발급 가능)를 제출해주시기 바랍니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">기존에 면허 정보가 저장되어 있는 고객님 중 면허를 재발급 받아 운전면허 정보 변경이 필요하신 경우, 기아 비즈 고객센터에 문의하신 이후 운전면허를 재등록해 주시기 바랍니다.</span></span></p>"
      },
      {
        id: 33,
        categoryName: "가입문의",
        subCategoryName: "면허",
        question: "운전면허를 갱신/재발급했어요.",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:'13pt';\"><span style=\"word-break:keep-all;\">기존에 면허 정보가 저장되어 있는 고객님 중 면허를 재발급 받아 운전면허 정보 변경이 필요하신 경우, 기아 비즈 고객센터에 문의하신 이후 운전면허를 재등록해주시기 바랍니다.</span></span></p>"
      },
      {
          id: 34,
          categoryName: "가입문의",
          subCategoryName: "면허",
        question: "개명을 했습니다. 어떻게 해야 하나요?",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">기아 비즈를 이용 도중 개명을 하신 경우, 기아 비즈 고객센터에 회원 정보 변경 및 개명된 이름으로 재발급하신 운전면허 정보 재등록을 문의해주시기 바랍니다. </span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">운전면허 정보 변경의 경우 기아 비즈 고객센터에서 안내 받은 메일로 면허 승인을 위한 서류 제출이 필요합니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">*서류 접수 후 정보 반영에 시일이 소요될 수 있습니다.</span></span></p>"
      },
      {
          id: 35,
          categoryName: "가입문의",
          subCategoryName: "탈퇴",
        question: "탈퇴 절차가 궁금해요.",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">아래 방법에 따라 회원 탈퇴 신청을 할 수 있습니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">▶ 회원 탈퇴 : 기아 비즈 앱 - 왼쪽 상단 메뉴 - [마이페이지] - 하단 &#39;탈퇴하려면 여기를 눌러주세요&#39; 버튼</span></span></p>"
      },
      {
          id: 36,
          categoryName: "가입문의",
          subCategoryName: "탈퇴",
        question: "탈퇴 시 보유한 쿠폰은 환불이 되나요?",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">회원 탈퇴 시, 보유한 쿠폰은 환불되지 않고 소멸됩니다.</span></span></p>"
      },
      {
          id: 37,
          categoryName: "가입문의",
          subCategoryName: "탈퇴",
        question: "탈퇴 후 재가입이 가능한가요?",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">회원 탈퇴 후에도 재가입은 가능하나, 지속적으로 가입/탈퇴를 반복할 경우 서비스 이용이 제한될 수 있습니다.</span></span></p>"
      },
      {
          id: 39,
          categoryName: "예약/결제",
          subCategoryName: "예약",
        question: "개인용 차량 예약은 어떻게 하나요?",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">결제 카드 정보, 운전 면허 정보를 등록한 후 기아 비즈 메인 지도 화면에서 K존, 이용 시간, 차량을 선택하여 결제 시 차량 예약이 완료됩니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">자세한 상품 안내는 메뉴 &gt; 하단의 &#39;이용가이드&#39; &gt; 차량이용 안내 탭을 통해 확인하실 수 있습니다.</span></span></p><p> </p>"
      },
      {
          id: 40,
          categoryName: "예약/결제",
          subCategoryName: "예약",
        question: "비즈니스 프로필에서 개인 프로필로 전환하려면 어떻게 해야 하나요?",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">기아 비즈 앱에서 아래의 방법으로 개인-비즈니스 프로필을 전환할 수 있습니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">▶ 기아 비즈 앱 - 왼쪽 상단 메뉴 - 상단 이용자 정보 위 ‘개인↔비즈니스 프로필 전환’ 버튼</span></span></p>"
      },
      {
          id: 41,
          categoryName: "예약/결제",
          subCategoryName: "예약",
        question: "예약한 차량의 차량 번호를 확인하고 싶어요.",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">기아 비즈 앱의 예약내역에서 예약한 차량의 차량 번호를 확인할 수 있습니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">▶ 예약내역 확인 : 기아 비즈 앱 - 왼쪽 상단 메뉴 - [예약 및 이용내역] - 해당 예약 건 선택</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">가장 가까운 대여 건의 경우 기아 비즈 앱 접속 시 이용대기 화면에서도 바로 차량 정보를 확인할 수 있습니다.</span></span></p>"
      },
      {
          id: 42,
          categoryName: "예약/결제",
          subCategoryName: "예약",
        question: "예약 완료 후 K존 또는 예약시간을 변경할 수 있나요?",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">예약이 완료된 이후에는 K존 및 예약 시간을 변경할 수 없습니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">변경이 필요한 경우 기존 예약을 취소하고 다시 신규 예약을 해주시기 바랍니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">*예약 취소 시 예약을 취소한 시점과 대여 시간에 따라 취소 수수료가 발생할 수 있습니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">&lt;취소 수수료 부과 기준&gt;</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">1. 예약을 취소하는 시점에 따라 수수료(이하 “취소수수료”)가 발생될 수 있으며, 취소수수료 산정시에는 ‘취소수수료 미부과’의 조건이 가장 상위 조건으로 고려됩니다. 단, 예약시작 시간을 초과할 경우 취소수수료가 아래 조건에 따라 부과됩니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">① 취소 수수료 미부과</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">구독권 상품 - 예약 체결 후 30분 이내 혹은 이용 2일전까지 취소 시</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">구독권 외 상품 - 예약 체결 후 30분 이내 혹은 이용 24시간 전까지 취소 시</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">② 취소 수수료 5%</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">구독권 상품 - 이용 개시일 전일</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">구독권 외 상품 - 대여 시작 3시간 1분 전 ~ 24시간</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">③ 취소 수수료 10%</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">구독권 상품 - 이용 개시일 당일 (단, 개시일 대여 시작 11분 전까지만 취소 가능)</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">④ 취소 수수료 15%</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">구독권 외 상품 - 대여 시작 11분 전 ~ 3시간까지</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">⑤ 취소 수수료 30%</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">구독권 외 상품 - 대여 시작 시점 ~ 대여 시작 10분 전까지</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">2. 자동차 제어 또는 운행 기록이 있거나 운행기록이 없더라도 대여시작 시점이 경과된 경우는 예약 취소는 불가합니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">이외의 자세한 내용은 자동차 대여약관을 참고해주시기 바랍니다.</span></span></p><p> </p>"
      },
      {
          id: 43,
          categoryName: "예약/결제",
          subCategoryName: "예약",
        question: "예약내역을 확인하고 싶어요.",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">기아 비즈 앱에서 예약내역을 확인할 수 있습니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">▶ 예약내역 확인 : 기아 비즈 앱 - 왼쪽 상단 메뉴 - [예약 및 이용내역] - 해당 예약 건 선택</span></span></p>"
      },
      {
          id: 44,
          categoryName: "예약/결제",
          subCategoryName: "예약",
        question: "대여 시작 시간 혹은 대여 시작일이 지난 상품을 구매할 수 있나요?",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">1회권의 경우 퇴출근, 주말 특가 상품은 대여 시작 시간이 지났더라도 당일 자정까지는 구매가 가능합니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">이외에 1DAY+, 구독권, 바로 퇴근하기 상품은 대여 시작 시간이 지난 경우 구매할 수 없습니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">*상품별 운영 정책은 상시 변경될 수 있으며, 자세한 내용은 기아 비즈 고객센터에 문의해주시기 바랍니다.</span></span></p>"
      },
      {
          id: 45,
          categoryName: "예약/결제",
          subCategoryName: "예약",
        question: "공휴일에도 이용할 수 있나요?",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">1회권(퇴출근, 주말) 혹은 퇴출근 구독 상품을 구매 시 이용일 직전 또는 직후가 법정 공휴일인 경우에 한하여 &#39;1DAY+&#39; 상품 추가 구매를 통해 공휴일에 기아 비즈를 이용할 수 있습니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">① 1회권 이용일 직전이 공휴일인 경우 : 1DAY+ 상품 추가 구매 시 픽업 시간을 24시간 앞당겨 공휴일 이용 가능</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">② 1회권 이용일 직후가 공휴일인 경우 : 1DAY+ 상품 추가 구매 시 반납 시간을 24시간 연장하여 공휴일 이용 가능</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">프리미엄 구독 상품 이용 시에는 4주간 퇴출근, 주말, 공휴일을 모두 무료로 이용할 수 있습니다. (대여 요금 한정)</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">*상품별 운영 정책은 상시 변경될 수 있으며, 자세한 내용은 기아 비즈 고객센터에 문의해주시기 바랍니다.</span></span></p><p> </p>"
      },
      {
          id: 46,
          categoryName: "예약/결제",
          subCategoryName: "예약",
        question: "자주 찾는 K존을 저장해두고 싶어요.",
        answer: "<p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">자주 찾는 K존은 &#39;즐겨찾기&#39;를 해두시면 편리합니다.</span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">차량 예약 화면에서 선택한 K존 이름 옆에 있는 별 모양 버튼을 탭하면 즐겨찾는 K존에 등록됩니다.</span></p>"
      },
      {
          id: 47,
          categoryName: "예약/결제",
          subCategoryName: "결제",
        question: "기아 비즈를 이용하려면 결제카드를 꼭 등록해야 하나요?",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">기아 비즈를 이용하기 위해서는 이용 상품의 대여 요금 결제를 위해 반드시 유효한 신용/체크카드 정보를 등록해야 합니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">등록하신 카드를 통해 이용요금이 결제되며, 최초 1회 등록만으로 편리하게 이용할 수 있습니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">개인용 상품을 결제할 개인용 카드는 본인 명의의 신용/체크카드, 개인 명의의 법인카드(기명), 법인 명의의 법인카드(무기명) 모두 등록 가능합니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">비즈니스 상품은 소속 회사가 선택한 결제 방식에 따라 결제됩니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">▶ 결제정보 입력 : 기아 비즈 앱 - 왼쪽 상단 메뉴 - [마이페이지] - [결제/운전면허 관리] - 결제카드 등록하기</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">결제카드 등록이 원활하지 않은 경우, 기아 비즈 고객센터에 문의해주세요.</span></span></p>"
      },
      {
          id: 48,
          categoryName: "예약/결제",
          subCategoryName: "결제",
        question: "타인 명의의 결제카드를 등록할 수 없나요?",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">개인용 상품 결제를 위한 개인용 결제카드 정보에 타인 명의의 개인카드 등록은 불가능하며 본인 명의의 신용/체크카드, 개인 명의의 법인카드(기명), 법인 명의의 법인카드(무기명)를 등록할 수 있습니다.</span></span></p>"
      },
      {
          id: 49,
          categoryName: "예약/결제",
          subCategoryName: "결제",
        question: "체크카드도 등록할 수 있나요?",
        answer: "<p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">본인 명의의 체크카드 등록이 가능합니다.  </span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">▶ 결제정보 입력 : 기아 비즈 앱 - 왼쪽 상단 메뉴 - [마이페이지] - [결제/운전면허 관리] - 결제카드 등록하기  </span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">결제카드 등록이 원활하지 않은 경우, 기아 비즈 고객센터에 문의해주세요.</span></p>"
      },
      {
          id: 50,
          categoryName: "예약/결제",
          subCategoryName: "결제",
        question: "이용 요금은 어떻게 계산되나요?",
        answer: "<p>기아 비즈 이용 요금은 상품별 대여 요금 + 보험료 + 주행 요금 + 하이패스 통행료로 구성되어 있습니다.</p><p>① 대여 요금 : 차량을 대여하는 요금으로 이용하려는 상품에 따라 상이합니다. 구매(예약) 즉시 결제됩니다. 자세한 요금은 예약 시 확인할 수 있습니다.</p><p>② 보험료 : 개인용 상품의 경우 보험료는 사고 시 최대 자기부담금에 따라 상이합니다. 예약 시 선택할 수 있습니다.</p><p>*비즈니스용 상품은 예약 시 보험료를 선택할 수 없으며, 소속 회사가 계약한 보험 조건을 따릅니다.</p><p>③ 주행 요금 : 주행 거리에 따라 km당 부과되는 금액이며, 반납 완료 시 결제됩니다. (구독권 이용 시 건별 결제/월별 결제 선택 가능)</p><p>*반납 완료 시점에 결제 실패 시 후청구됩니다.</p><p>④ 하이패스 통행료 : 사용일로부터 통상 2~3 영업일 이내 결제됩니다. (구독권 이용 시 건별 결제/월별 결제 선택 가능)</p><p>*하이패스 통행료의 경우 도로교통공단 사정에 따라 반납 후 과금되기까지 2일 이상 시일이 소요될 수 있습니다.</p><p> </p><p>① 대여 요금, ② 보험료는 예약 시 결제되며, ③ 주행 요금, ④ 하이패스 통행료는 차량 이용 후 결제 됩니다.</p><p>또한 한도 부족, 사용불가 카드 등으로 결제 실패 시 구매(예약)이 불가하거나 미납금이 발생할 수 있으니 사전에 카드상태를 확인 부탁드립니다.</p>"
      },
      {
          id: 51,
          categoryName: "예약/결제",
          subCategoryName: "결제",
        question: "주행 요금과 하이패스 통행료는 어떻게 결제되나요?",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">차량 반납 후 주행거리에 따라 km당 부과되는 주행요금과 하이패스 통행료가 결제 됩니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">(대여 요금을 결제한 카드로 자동 결제. 단, 비즈니스 프로필 예약의 경우 회사 계약 방식에 따라 별도 결제 수단으로 청구될 수 있음)</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">*하이패스 통행료의 경우 도로교통공단 사정에 따라 반납 후 과금되기까지 2일 이상 시일이 소요될 수 있습니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">▶ 등록된 결제수단 정보 확인 : 기아 비즈 앱 - 왼쪽 상단 메뉴 - [마이페이지] - [결제/운전면허 관리]</span></span></p>"
      },
      {
          id: 52,
          categoryName: "예약/결제",
          subCategoryName: "결제",
        question: "반납 후 추가 요금이 결제되었어요. 무슨 요금인가요?",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">차량 반납 후 주행거리에 따라 km당 부과되는 주행요금과 하이패스 통행료가 결제 됩니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">*하이패스 통행료의 경우 도로교통공단 사정에 따라 반납 후 과금되기까지 2일 이상 시일이 소요될 수 있습니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">또한, 반납이 지연되거나 페널티 요금이 부과되는 경우 추가 요금이 결제될 수 있습니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">▶ 운행 후 요금 확인 : 기아 비즈 앱 - 왼쪽 상단 메뉴 - [예약 및 이용내역] - 해당 건 선택 - 운행 후 요금 결제내역 확인</span></span></p>"
      },
      {
          id: 53,
          categoryName: "예약/결제",
          subCategoryName: "결제",
        question: "결제수단 정보를 변경할 수 있나요?",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">등록되어 있는 결제수단 정보는 기아 비즈 앱 - 왼쪽 상단 메뉴 - [마이페이지] - [결제/운전면허 관리] 에서 변경할 수 있습니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">*이미 구매(예약)하신 결제 건에 대한 결제 수단 정보 변경은 불가합니다.</span></span></p>"
      },
      {
          id: 54,
          categoryName: "예약/결제",
          subCategoryName: "결제",
        question: "결제내역은 어떻게 확인하나요?",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">기아 비즈 앱 - 왼쪽 상단 메뉴 - [예약 및 이용내역] - 해당 건 선택하여 상세 결제내역을 확인할 수 있습니다.</span></span></p><p> </p>"
      },
      {
          id: 55,
          categoryName: "예약/결제",
          subCategoryName: "결제",
        question: "미납 시에 이용 제한이 있나요?",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">미납 요금이 있는 경우 미납 금액의 결제가 완료될 때까지 기아 비즈 서비스 이용이 정지됩니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">▶ 미납 요금 확인 및 결제 방법 : 기아 비즈 앱 - 왼쪽 상단 메뉴 - [예약 및 이용내역] - [미납요금 결제]</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">*기아 비즈 이용약관에 따라 미납 요금이 지속 연체되는 경우 등록한 결제카드 등의 정보로 전부 또는 일부 결제를 진행할 수 있습니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">해당 채무가 지속 연체될 경우 회원을 상대로 보전처분, 본안소송 제기, 강제집행 절차의 착수 등 채무 변제를 위한 법적 조치에 들어갈 수 있습니다.</span></span></p><p> </p>"
      },
      {
          id: 56,
          categoryName: "예약/결제",
          subCategoryName: "결제",
        question: "미납 금액 납부는 어떻게 하나요?",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">[미납요금 결제] 에서 미납요금 확인 및 결제가 가능합니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">▶ 미납 요금 확인 및 결제 방법 : 기아 비즈 앱 - 왼쪽 상단 메뉴 - [마이페이지] - [청구 및 미납요금 내역]</span></span></p>"
      },
      {
          id: 57,
          categoryName: "예약/결제",
          subCategoryName: "결제",
        question: "이용 전 또는 이용 중 환불이 가능한가요?",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">대여 시작 시간 전까지는 취소가 가능하며, 상품의 종류와 정확한 취소 시점에 따라 취소 수수료가 발생할 수 있습니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">대여 시작 이후에는 원칙적으로 계약 해지 및 환불은 불가능합니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">*예약 취소 시 예약을 취소한 시점과 대여 시간에 따라 취소 수수료가 발생할 수 있습니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">&lt;취소 수수료 부과 기준&gt;</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">1. 예약을 취소하는 시점에 따라 수수료(이하 “취소수수료”)가 발생될 수 있으며, 취소수수료 산정시에는 ‘취소수수료 미부과’의 조건이 가장 상위 조건으로 고려됩니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">단, 예약시작 시간을 초과할 경우 취소수수료가 아래 조건에 따라 부과됩니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">① 취소 수수료 미부과</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">구독권 상품 - 예약 체결 후 30분 이내 혹은 이용 2일전까지 취소 시</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">구독권 외 상품 - 예약 체결 후 30분 이내 혹은 이용 24시간 전까지 취소 시</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">② 취소 수수료 5%</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">구독권 상품 - 이용 개시일 전일</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">구독권 외 상품 - 대여 시작 3시간 1분 전 ~ 24시간</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">③ 취소 수수료 10%</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">구독권 상품 - 이용 개시일 당일 (단, 개시일 대여 시작 11분 전까지만 취소 가능)</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">④ 취소 수수료 15%</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">구독권 외 상품 - 대여 시작 11분 전 ~ 3시간까지</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">⑤ 취소 수수료 30%</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">구독권 외 상품 - 대여 시작 시점 ~ 대여 시작 10분 전까지</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">2. 자동차 제어 또는 운행 기록이 있거나 운행기록이 없더라도 대여시작 시점이 경과된 경우는 예약 취소는 불가합니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">이외의 자세한 내용은 자동차 대여약관을 참고해주시기 바랍니다.</span></span></p><p> </p>"
      },
      {
          id: 58,
          categoryName: "예약/결제",
          subCategoryName: "취소",
        question: "예약을 취소하고 싶어요.",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">아래의 방법으로 예약을 취소할 수 있습니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">▶ 예약 취소 : 기아 비즈 앱 - 왼쪽 상단 메뉴 - [예약 및 이용내역] - 취소하려는 예약 건 선택 - 하단의 [예약 취소] 클릭</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">*대여요금 환불은 카드사에 따라 영업일 기준 3~5일이 소요될 수 있습니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">*예약 취소 시 예약을 취소한 시점과 대여 시간에 따라 취소 수수료가 발생할 수 있습니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">&lt;취소 수수료 부과 기준&gt;</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">1. 예약을 취소하는 시점에 따라 수수료(이하 “취소수수료”)가 발생될 수 있으며, 취소수수료 산정시에는 ‘취소수수료 미부과’의 조건이 가장 상위 조건으로 고려됩니다. 단, 예약시작 시간을 초과할 경우 취소수수료가 아래 조건에 따라 부과됩니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">① 취소 수수료 미부과</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">구독권 상품 - 예약 체결 후 30분 이내 혹은 이용 2일전까지 취소 시</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">구독권 외 상품 - 예약 체결 후 30분 이내 혹은 이용 24시간 전까지 취소 시</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">② 취소 수수료 5%</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">구독권 상품 - 이용 개시일 전일</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">구독권 외 상품 - 대여 시작 3시간 1분 전 ~ 24시간</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">③ 취소 수수료 10%</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">구독권 상품 - 이용 개시일 당일 (단, 개시일 대여 시작 11분 전까지만 취소 가능)</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">④ 취소 수수료 15%</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">구독권 외 상품 - 대여 시작 11분 전 ~ 3시간까지</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">⑤ 취소 수수료 30%</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">구독권 외 상품 - 대여 시작 시점 ~ 대여 시작 10분 전까지</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">2. 자동차 제어 또는 운행 기록이 있거나 운행기록이 없더라도 대여시작 시점이 경과된 경우는 예약 취소는 불가합니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">이외의 자세한 내용은 자동차 대여약관을 참고해주시기 바랍니다.</span></span></p>"
      },
      {
          id: 59,
          categoryName: "예약/결제",
          subCategoryName: "취소",
        question: "예약 취소 시 수수료가 발생하나요?",
        answer: "<p>예약 취소 시 예약을 취소한 시점과 대여 시간에 따라 취소 수수료가 발생할 수 있습니다.</p><p>&lt;취소 수수료 부과 기준&gt;</p><p>1. 예약을 취소하는 시점에 따라 수수료(이하 “취소수수료”)가 발생될 수 있으며, 취소수수료 산정시에는 ‘취소수수료 미부과’의 조건이 가장 상위 조건으로 고려됩니다. 단, 예약시작 시간을 초과할 경우 취소수수료가 아래 조건에 따라 부과됩니다.</p><p>① 취소 수수료 미부과</p><p>구독권 상품 - 예약 체결 후 30분 이내 혹은 이용 2일전까지 취소 시</p><p>구독권 외 상품 - 예약 체결 후 30분 이내 혹은 이용 24시간 전까지 취소 시</p><p>② 취소 수수료 5%</p><p>구독권 상품 - 이용 개시일 전일</p><p>구독권 외 상품 - 대여 시작 3시간 1분 전 ~ 24시간</p><p>③ 취소 수수료 10%</p><p>구독권 상품 - 이용 개시일 당일 (단, 개시일 대여 시작 11분 전까지만 취소 가능)</p><p>④ 취소 수수료 15%</p><p>구독권 외 상품 - 대여 시작 11분 전 ~ 3시간까지</p><p>⑤ 취소 수수료 30%</p><p>구독권 외 상품 - 대여 시작 시점 ~ 대여 시작 10분 전까지</p><p>2. 자동차 제어 또는 운행 기록이 있거나 운행기록이 없더라도 대여시작 시점이 경과된 경우는 예약 취소는 불가합니다.</p><p>이외의 자세한 내용은 자동차 대여약관을 참고해주시기 바랍니다.</p>"
      },
      {
          id: 60,
          categoryName: "예약/결제",
          subCategoryName: "동승운전자",
        question: "(개인 프로필) 동승운전자를 등록 또는 변경하고 싶어요.",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">예약된 차량은 예약자 본인만 운전 가능하며, 예약자 본인 외 다른 사람이 운전을 해야 할 경우 예약 시 동승운전자 등록을 해주셔야 합니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">동승운전자 등록/변경은 차량 이용 시작 10분 전(스마트키 활성화 전)까지 가능합니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">▶ 동승운전자 등록 방법 : 기아 비즈 앱 - 왼쪽 상단 메뉴 - [예약 및 이용내역] - 해당 예약 건 선택 - 동승운전자 [추가하기] - 동승운전자의 기아 비즈 아이디(이메일 주소) 입력 - 추가 완료</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">*개인 프로필 차량 이용 시 동승운전자는 면허 정보가 등록된 기아 비즈 정회원에 한해 최대 1명만 등록 가능합니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">*기아 비즈 앱의 스마트키 기능은 예약자만 이용 가능합니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">*동승운전자 등록을 하지 않고 운행을 하다 적발 시 명의도용 건으로 간주되며, 아이디 영구 이용 정지 및 필요 시 법적 조치가 진행됩니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">*동승운전자로 등록되어있어도 예약 당사자 없이 단독 운행 시 차량손해면책제도 적용이 불가합니다.반드시 예약자와 함께 운행하시기 바랍니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">*구독권 구매 회원의 경우, 매 이용 건별로 동승운전자를 다르게 지정할 수 있습니다.</span></span></p>"
      },
      {
          id: 61,
          categoryName: "예약/결제",
          subCategoryName: "동승운전자",
        question: "동승운전자는 꼭 등록해야만 하나요?",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">예약자 본인 외 다른 사람이 운전할 필요가 없는 경우 동승운전자 등록을 하지 않으셔도 됩니다.</span></span></p>"
      },
      {
          id: 62,
          categoryName: "차량문의",
          subCategoryName: "차량",
        question: "운행 할 차량의 옵션을 미리 확인하고 싶어요.",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">대여 예약 차량 선택 시 해당 차량의 상세정보 보기 (차량 사진에서 돋보기) 버튼을 클릭하면 운행 차량의 색상과 옵션 등 상세정보를 확인할 수 있습니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">예약 후에는 기아 비즈 앱 - 왼쪽 상단 메뉴 - [예약 및 이용내역] - 해당 건 선택 - 차량 정보에서 상세정보 보기 버튼 클릭 시 상세정보를 확인할 수 있습니다.</span></span></p>"
      },
      {
          id: 63,
          categoryName: "차량문의",
          subCategoryName: "차량",
        question: "기아 비즈 차량에는 후방 카메라가 있나요?",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">현재 운행되고 있는 모든 기아 비즈 차량에는 후방카메라가 장착되어 있으니 이용에 참고 부탁드립니다.</span></span></p>"
      },
      {
          id: 64,
          categoryName: "차량문의",
          subCategoryName: "차량",
        question: "기아 비즈 차량에는 하이패스 단말기가 장착되어 있나요?",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">현재 운행되고 있는 모든 기아 비즈 차량에는 하이패스 단말기가 장착되어 있습니다.</span></span></p><p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">하이패스 구간을 이용하신 경우 반납 이후 주행요금과 함께 하이패스 통행료가 청구되오니 이용에 참고해 주세요.</span></span></p>"
      },
      {
          id: 65,
          categoryName: "차량문의",
          subCategoryName: "차량",
        question: "차량별 이용 방법을 확인하고 싶어요.",
        answer: "<p><span style=\"color:hsl(0, 0%, 0%);font-size:&#39;13pt&#39;;\"><span style=\"word-break:keep-all;\">각 차량의 차량별 이용 방법 안내 메뉴에서 차량별 이용 방법, 충전 방법 등을 확인할 수 있습니다.</span></span></p>"
      },
      {
          id: 66,
          categoryName: "차량문의",
          subCategoryName: "차량",
        question: "블루투스는 어떻게 연결하나요?",
        answer: "<p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">아래의 방법으로 블루투스를 연결할 수 있습니다.</span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">  ① 우선 차량 시동을 걸어주세요.</span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">  ② 스마트폰 설정 메뉴에서 블루투스 기능을 켜주세요.</span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">  ③ 블루투스 검색 결과에서 이용하시는 기아 비즈 차종을 선택 후 연결해주세요.</span></p>"
      },
      {
          id: 67,
          categoryName: "차량문의",
          subCategoryName: "차량",
        question: "기아 비즈 차량 이용은 어떻게 하나요?",
        answer: "<p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">기아 비즈 앱을 통해 스마트폰 하나로 대여 및 차량 제어, 반납까지 가능합니다.</span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">기아 비즈 회원가입 후 운전 면허증과 결제 카드 정보를 정상 등록 후 차량을 예약했다면 아래 방법으로 이용하시면 됩니다.</span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">   ① 예약한 시간에 맞춰 K존 방문</span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">      *예약한 차량이 보이지 않는다면 기아 비즈 앱 스마트키의 [비상등/경적] 버튼을 활용하세요.</span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">  ② 차량에 이상이 없는지 확인 후 기아 비즈 앱 스마트키 화면에서 차량 점검 사진 및 상태 체크</span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">  ③ 스마트키의 [문 열기] 버튼으로 차량 문 열기</span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">  ④ 차량 탑승 후 운행 시작</span></p>"
      },
      {
          id: 68,
          categoryName: "차량문의",
          subCategoryName: "차량",
        question: "K존의 위치는 어떻게 알 수 있나요?",
        answer: "<p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">대여하고자 하는 K존의 상세 위치는 K존 안내에서 확인할 수 있습니다. </span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\"> ▶ K존 위치 확인 : 기아 비즈 앱 - 메인 화면 지도 - 해당 K존 맵마커선택 - K존 이름 옆의 i 모양버튼을 터치 - K존 안내 확인</span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\"> *K존의 위치를 더 자세히 알고 싶다면 K존 안내 화면 하단의 [K존 위치를 더 자세히 알고 싶으세요?] 버튼을 눌러주세요. 상세한 K존의 위치를 확인할 수 있습니다.</span></p>"
      },
      {
          id: 69,
          categoryName: "차량문의",
          subCategoryName: "차량",
        question: "K존에서 예약한 차량의 위치는 어떻게 알 수 있나요?",
        answer: "<p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">차량 이용 시작 10분 전부터 스마트키가 활성화됩니다. 스마트키의 비상등 및 경적 기능을 활용하여 차량을 찾을 수 있습니다.</span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">기아 비즈 앱 하단의 [스마트키] 탭을 위로 끌어올린 후, [비상등/경적] 버튼을 누릅니다.</span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">만약 위의 방법으로도 예약한 차량을 찾지 못할 경우 기아 비즈 고객센터에 문의해주세요.</span></p>"
      },
      {
          id: 70,
          categoryName: "차량문의",
          subCategoryName: "차량",
        question: "K존에 예약한 차량이 보이지 않아요.",
        answer: "<p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">차량 이용 시작 10분 전부터 스마트키가 활성화됩니다. 스마트키의 비상등 및 경적 기능을 활용하여 차량을 찾을 수 있습니다. </span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">기아 비즈 앱 하단의 [스마트키] 탭을 위로 끌어올린 후, [비상등/경적] 버튼을 누릅니다. </span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">만약 위의 방법으로도 예약한 차량을 찾지 못할 경우 기아 비즈 고객센터에 문의해주세요.</span></p>"
      },
      {
          id: 71,
          categoryName: "차량문의",
          subCategoryName: "차량",
        question: "차량 문은 어떻게 열 수 있나요?",
        answer: "<p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">기아 비즈는 별도의 자동차 키 없이 기아 비즈 앱의 스마트키로 차량 문을 열거나 닫고 비상등과 경적을 사용할 수 있습니다.</span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">스마트키는 차량 이용 시작 10분 전부터 활성화됩니다.</span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">차량 이용 전 기아 비즈 앱 하단의 [스마트키] 탭에서 차량 점검을 완료한 이후 스마트키를 사용할 수 있습니다.</span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">*블루투스 연결 활성화 시 차량 문을 더욱 빠르게 제어할 수 있습니다.</span></p>"
      },
      {
          id: 72,
          categoryName: "차량문의",
          subCategoryName: "차량",
        question: "차량 문이 열리지 않아요.",
        answer: "<p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">차량 문이 열리지 않는 경우 아래 내용을 확인해주세요.</span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">  ① 스마트폰 블루투스 연결이 되어 있는지 확인 후 연결이 되어 있지 않을 경우 블루투스 연결 활성화</span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">  ② 기아 비즈 앱 메인 화면 지도의 좌측 상단에서 [현재 위치] 버튼을 탭한 후 스마트키에서 차량 문 열기 시도</span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">  ③ 안드로이드 스마트폰의 경우 스마트폰 [설정] - [위치] - [Google 위치 정확도] - [위치 정확도 개선] 활성화 한 후 스마트키에서 차량 문 열기 시도</span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">  위의 방법으로도 차량 문이 열리지 않는 경우 기아 비즈 고객센터에 문의해주세요. 바로 도움을 드리겠습니다.</span></p>"
      },
      {
          id: 73,
          categoryName: "차량문의",
          subCategoryName: "차량",
        question: "운행 전 차량 파손이 있는 경우 어떻게 해야 하나요?",
        answer: "<p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">기아 비즈 차량 이용 전 반드시 외관 및 내부를 점검하셔야 하며, 개인용 이용 시에는 기존 파손에 대한 부분으로 불이익을 받지 않기 위해 운행 전 차량 사진 등록을 권장하며, 사진 촬영이 어려울 경우에도 차량 외관 및 내부의 이상 여부를 확인 후 확인 버튼을 눌러 이상이 없음에 동의하시기 바랍니다.</span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">운행 전 차량 파손 및 차량 기능에 문제가 있는 경우, 사후 불이익이 없도록 사진을 촬영하여 접수 후 차량을 이용해 주시면 됩니다.</span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">*기아 비즈는 비대면 공유 서비스로, 차량 파손에 대한 책임소지 파악을 위해 운행 전 차량 사진 등록을 권장하고 있습니다.</span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">(차량에 파손이 있으나 차량사진 미접수 시, 다음 이용고객의 신고로 인하여 차량에 대한 수리비용 발생할 경우 고객님께 수리비가 청구될 수 있습니다.)</span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">▶ 차량 사진 등록 방법 : 기아 비즈 앱 - [스마트키] - [차량점검] - 차량 사진 등록  </span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">차량 이용이 불가할 정도의 외관 파손 및 차량 기능에 문제가 있는 경우, 고객센터에 연락해주시기 바랍니다.</span></p>"
      },
      {
          id: 74,
          categoryName: "차량문의",
          subCategoryName: "차량",
        question: "운행 전 차량 실내가 더러운 경우 어떻게 해야 하나요?",
        answer: "<p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">기아 비즈는 비대면 공유 서비스로, 차량 오염/파손에 대한 책임소지 파악을 위해 운행 전 차량 사진 등록을 권장하며, 사진 촬영이 어려울 경우에도 차량 외관 및 내부의 이상 여부를 확인 후 확인 버튼을 눌러 이상이 없음에 동의하시기 바랍니다. </span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">기존 오염/파손에 대한 부분으로 불이익을 받지 않기 위해 운행 전 차량 실내 사진을 꼭 등록해주세요.</span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">▶ 차량 사진 등록 방법 : 기아 비즈 앱 - [스마트키] - [차량점검] - 차량 내부 점검에서 이상이 있는 항목 선택/입력 및 필요 시 내부 사진 촬영 후 업로드</span></p><p><span style=\"font-size: '13pt'; color: rgba(106, 122, 135, 1); word-break: keep-all;\">차량 이용이 불가할 정도로 실내가 더럽다면, 기아 비즈 고객센터에 연락해주시기 바랍니다.</span></p>"
      }
    ]
  }
};

export const handlers = [
  // FAQ 목록 API (새로운 형식)
  http.get('/api/faqs', ({ request }) => {
    const url = new URL(request.url);
    const tab = url.searchParams.get('tab') as 'CONSULT' | 'USAGE';
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const offset = parseInt(url.searchParams.get('offset') || '0');
    
    const data = tab === 'CONSULT' ? newFaqData.CONSULT : newFaqData.USAGE;
    const items = data.items.slice(offset, offset + limit);
    
    return HttpResponse.json({
      pageInfo: {
        totalRecord: data.totalRecord,
        currentPage: Math.floor(offset / limit) + 1,
        totalPage: Math.ceil(data.totalRecord / limit),
        limit
      },
      items
    });
  }),

  // FAQ 상세 API
  http.get('/api/faqs/:id', ({ params }) => {
    const id = Number(params.id);
    const faq = [...newFaqData.CONSULT.items, ...newFaqData.USAGE.items].find(item => item.id === id);
    return HttpResponse.json(faq);
  }),

  // 카테고리 API
  http.get('/api/category', async ({ request }) => {
    const url = new URL(request.url);
    const tab = url.searchParams.get('tab') || 'CONSULT';
    if (tab === 'CONSULT') {
      return HttpResponse.json(consultFilterOptions);
    } else if (tab === 'USAGE') {
      return HttpResponse.json(usageFilterOptions);
    } else {
      return HttpResponse.json(tab === 'CONSULT' ? consultFilterOptions : usageFilterOptions);
    }
  })
]; 