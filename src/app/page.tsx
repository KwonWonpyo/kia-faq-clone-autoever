export default function Home() {
  return (
    <div className="container">
      <div className="content">
        <h1>
          자주 묻는 질문 <em>궁금하신 내용을 빠르게 찾아보세요.</em>
        </h1>
        <i className="sticky-checker" />
        <ul className="tabs">
          <li className="active">
            <a>
              <span>서비스 도입</span>
            </a>
          </li>
          <li>
            <a>
              <span>서비스 이용</span>
            </a>
          </li>
        </ul>
        <form>
          <div className="search">
            <div className="input-wrap">
              <input type="text" placeholder="찾으시는 내용을 입력해 주세요" value="" readOnly />
              <button type="button" className="clear" data-ui-click="input-clear">
                다시입력
              </button>
              <button type="button" className="submit">
                검색
              </button>
            </div>
          </div>
        </form>
        <div className="filter">
          <label>
            <input type="radio" name="filter" defaultChecked />
            <i>전체</i>
          </label>
          <label>
            <input type="radio" name="filter" />
            <i>서비스 상품</i>
          </label>
          <label>
            <input type="radio" name="filter" />
            <i>도입 상담</i>
          </label>
          <label>
            <input type="radio" name="filter" />
            <i>계약</i>
          </label>
        </div>
        <ul className="faq-list">
          <li data-ui-item="true">
            <h4 className="a">
              <button type="button" data-ui-click="dropdown-toggle">
                <em>서비스 상품</em>
                <strong>기아 비즈에서는 어떤 상품을 이용할 수 있나요?</strong>
              </button>
            </h4>
            <div className="q" data-ui-target="true">
              <div className="inner">
                <p>
                  소속 회사가 기아 비즈 이용 계약이 되어있다면,
                  <br />
                  업무 시간에는 이용 건별 별도 결제 없이 편리하게 업무용 차량을 이용할 수 있고(대여 요금은 소속 회사에서
                  부담),
                  <br />
                  비업무 시간에는 출퇴근 및 주말 여가옹으로 차량을 이용 (대여 요금은 개인이 부담) 할 수 있습니다.
                </p>
                <p>&nbsp;</p>
                <p>
                  자세한 상품 안내는 메뉴 &gt; 하단의 &apos;이용가이드&apos; &gt; 상품 안내 탭을 통해 확인하실 수
                  있습니다.
                  <br />
                  &nbsp;
                </p>
                <p>&nbsp;</p>
              </div>
            </div>
          </li>
          <li data-ui-item="true">
            <h4 className="a">
              <button type="button" data-ui-click="dropdown-toggle">
                <em>서비스 상품</em>
                <strong>기아 비즈 비즈니스용 상품 이용 시 무엇이 좋은가요?</strong>
              </button>
            </h4>
            <div className="q" data-ui-target="true">
              <div className="inner">
                <p>기아 비즈의 &apos;비즈니스 상품&apos; 이용 시, 기존 차량 이용 대비 아래와 같은 장점이 있습니다.</p>
                <p>
                  - 차량 보유 및 유지관리비 부담 없이, 우리 회사의 차량 이용 패턴에 딱 맞는 상품으로 계약 후 업무용 차량
                  운영 가능
                </p>
                <p>- App 하나로 편하게 예약하고, 스마트키로 제어하는 비대면 간편 대여</p>
                <p>- 회사가 등록한 결제 수단으로 자동 결제 및 간편한 증빙 가능</p>
                <p>
                  * 재직 중인 회사의 기아 비즈 차량 이용과 관련한 자세한 내용은 사내 기아 비즈 담당자에게 문의하시기
                  바랍니다.
                </p>
              </div>
            </div>
          </li>
          <li data-ui-item="true">
            <h4 className="a">
              <button type="button" data-ui-click="dropdown-toggle">
                <em>도입 상담</em>
                <strong>비즈니스 상품 도입 기간은 얼마나 걸리나요?</strong>
              </button>
            </h4>
            <div className="q" data-ui-target="true">
              <div className="inner">
                <p>
                  <span style={{ fontSize: '13pt', color: 'rgba(106, 122, 135, 1)', wordBreak: 'keep-all' }}>
                    기아 비즈 도입 상담을 신청하신 경우, 빠른 시일 내에 기재해주신 연락처로 연락드릴 예정입니다.
                  </span>
                </p>
                <p>
                  <span style={{ fontSize: '13pt', color: 'rgba(106, 122, 135, 1)', wordBreak: 'keep-all' }}>
                    담당자와의 1:1 상담 후 최대한 원하시는 시기에 맞춰 서비스가 도입될 수 있도록 도와드리고 있으나,
                    도입하시는 상품에 따라 소요되는 기간은 다소 상이할 수 있습니다.
                  </span>
                </p>
              </div>
            </div>
          </li>
          <li data-ui-item="true">
            <h4 className="a">
              <button type="button" data-ui-click="dropdown-toggle">
                <em>계약</em>
                <strong>비즈니스 상품 도입 절차가 어떻게 되나요?</strong>
              </button>
            </h4>
            <div className="q" data-ui-target="true">
              <div className="inner">
                <p>기아 비즈 &apos;비즈니스 상품&apos; 도입 절차는 아래와 같습니다.</p>
                <p>① 상담 문의 등록 후 1:1 맞춤 상담 진행</p>
                <p>② 서비스 도입 상품 및 세부 조건 협의 후 계약 진행</p>
                <p>③ 관리자 Web 계정 생성 후 회사 정보 설정</p>
                <p>④ 임직원 회원가입 진행</p>
                <p>⑤ 전용 K존에서 차량 대여 및 이용</p>
              </div>
            </div>
          </li>
        </ul>
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
          <a className="btn-xxlg btn-tertiary" href="/Counsel">
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
