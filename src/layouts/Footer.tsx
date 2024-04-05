import {useRouter} from 'next/router'
import BxButton from '@/components/common/BxButton'

const Footer = () => {
  const router = useRouter()

  function copyText(text) {
    const input = document.createElement('textarea')
    document.body.appendChild(input)
    input.value = text
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
    alert('메일 주소가 복사 되었어요.')
  }

  return (
    <footer className={(router.asPath === '/pogg-cucn' && 'mg-0') || ''}>
      <div className="footer-wrap">
        <div className="footer-contents">
          <ul className="footer-menu disp-f">
            <li>
              <BxButton href="http://p-policy.uplus.co.kr/privacy/info/v1" target="_blank" title="새창열림">
                개인정보처리방침
              </BxButton>
            </li>
            <li>
              <BxButton href="/footer/agreement">이용약관</BxButton>
            </li>
            <li>
              <BxButton href="https://www.lguplus.com/">LG 유플러스 홈페이지 가기</BxButton>
            </li>
          </ul>
          <ul className="footer-info disp-f">
            <li>(주)엘지유플러스 서울특별시 용산구 한강대로 32 대표이사 황현식</li>
            <li>사업자등록번호 220-81-39938</li>
            <li>
              통신판매신고 제 2015-서울용산-00481호
              <BxButton className="under-line" href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=2208139938">
                사업자정보확인
              </BxButton>
            </li>
            {/* 메일 추가 */}
            <li>
              유독 입점/제휴문의
              <a href="mailto:udokpartners@lguplus.co.kr">udokpartners@lguplus.co.kr</a>
              <button className="mail-copy" onClick={() => copyText('udokpartners@lguplus.co.kr')}></button>
            </li>
          </ul>
          <div className="hago-copyright">Copyright ⓒ LG Uplus Corp. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
