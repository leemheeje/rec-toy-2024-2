import BxButton from '@/components/common/BxButton'

const EstimatedSubscription = ({isShow = true, ...props}) => {
  return (
    <>
      {(isShow && (
        <div className="contents top-contents">
          <div className="user-noti">
            <div className="inner">
              <h5 className="mb-10">
                조민지님의
                <br />
                N+1월 예상구독료는
              </h5>
              <div className="subs-price">
                <div className="price">18,000 원</div>
                <BxButton className="btn-detail">
                  <span className="is-blind">구독료 자세히 보기</span>
                </BxButton>
                <div className="info-msg">10% 할인 받고 월 1,000원 아끼는 중</div>
              </div>
            </div>
          </div>
          <div className="disabled">현재 구독 중인 상품</div>
        </div>
      )) ||
        null}
    </>
  )
}

export default EstimatedSubscription
