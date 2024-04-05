import BxInputField, {INPUT_FILTER} from '@/components/common/BxInputField'
import BxButton from '@/components/common/BxButton'
import BxProductionItem, {DESIGN_PROD_TYPE} from '@/components/ui/BxProductionItem'
import BxProductionWrapping, {WRAPPING_TYPE} from '@/components/ui/BxProductionWrapping'
import {displayProdList} from '@/mock'
import {useEffect, useRef, useState} from 'react'
import BxCheckbox from '@/components/common/BxCheckbox'
import BxCheckboxGroup from '@/components/common/BxCheckboxGroup'
import BxToast from '@/components/common/BxToast'
import BxDialog from '@/components/common/BxDialog'
import BxSwiper from '@/components/common/BxSwiper'
import BxRadio from '@/components/common/BxRadio'

const Main = (props) => {
  const [inputValue, setInputValue] = useState<string>('asdfasdfwㅎㅎㅎㅎ')
  const [valiInputField, setValiInputField] = useState<{
    isError: boolean
    textMessage: string
  }>({
    isError: false,
    textMessage: ''
  })
  const inputRef = useRef<HTMLInputElement>(null)
  const inputCheckboxRef = useRef<HTMLInputElement>(null)
  const [isToastOpen, setToastOpen] = useState(false)
  const [isToastOpen2, setToastOpen2] = useState(false)
  function onClickAdd(item) {
    console.log(item)
    inputRef.current.focus()
    inputCheckboxRef.current.focus()
  }
  function onClickDelete(item) {
    console.log(item)
  }
  function onClick() {
    return false
  }

  console.log('main props -----', props)

  //

  //
  // function onInput(e) {
  //   var _value = e.target.value
  //   setValiInputField({
  //     isError: /[a-z]/g.test(_value),
  //     textMessage: /[a-z]/g.test(_value) ? '옳바르지않은 문자가있습니다.[a-z]' : ''
  //   })
  // }

  const [teststset, setstsetaset] = useState([
    {codeId: 1, codeName: '라디오1'},
    {codeId: 2, codeName: '라디오2'}
  ])
  function ggggsetTest() {
    setstsetaset([
      {codeId: 1, codeName: '라디오1'},
      {codeId: 4, codeName: '라디오4'},
      {codeId: 3, codeName: '라디오3'}
    ])
  }
  function ggggsetTest2() {
    setstsetaset([
      {codeId: 1, codeName: '라디오1'},
      {codeId: 2, codeName: '라디오2'},
      {codeId: 3, codeName: '라디오3'},
      {codeId: 4, codeName: '라디오4'},
      {codeId: 5, codeName: '라디오5'},
      {codeId: 6, codeName: '라디오6'},
      {codeId: 7, codeName: '라디오7'},
      {codeId: 3, codeName: '라디오3'}
    ])
  }

  return (
    <section className="main-section">
      <main className="main">
        <div className="p-main-prod-area">
          <button onClick={props.globalFunction}>globa12lFunction</button>
          <br />
          <br />
          <button onClick={ggggsetTest}>이거 누르면 값변함</button>
          <br />
          <button onClick={ggggsetTest2}>이거 누르면 값변함2</button>
          <br />
          <BxRadio.Group items={teststset}>
            {(item) => <BxRadio name="swmnxq11">{`${item['codeName']}`}</BxRadio>}
          </BxRadio.Group>

          <br />
          <br />
          <br />
          <br />
          <BxSwiper
            items={[
              {
                id: 1,
                text: '테스트 테스트'
              },
              {
                id: 2,
                text: '테스트 테스트'
              },
              {
                id: 3,
                text: '테스트 123123123테스트'
              },
              {
                id: 4,
                text: '테스트 테스트'
              },
              {
                id: 5,
                text: '테스트 테스트'
              }
            ]}
          ></BxSwiper>
          <BxDialog dialogClassName="m-bv-modal c-layer-popup-800 p-account-overview illy-pop">
            <BxDialog.Header>옵션 선택</BxDialog.Header>
            <BxDialog.Body>
              <h3 className="p-h3">
                <b>일리 커피머신 &amp; 커피캡슐 1팩</b>
              </h3>
              <div className="opt-chk-type-area">
                <dl className="price-group desc">
                  <dt>구독 정상가</dt>
                  <dd>1111원</dd>
                </dl>
                <dl className="price-group bnefit">
                  <dt>구독 할인가</dt>
                </dl>
                <div className="text-box">
                  <div className="c-list-type2 bg-gray desc" style={{height: '9000px'}}>
                    <ul className="noti c-888">
                      <li>
                        일리 커피 머신은 24개월 할부로만 이용할 수 있어요. (할부원금 199,000원, 할부이자 연 5.9%,
                        원리금균등상환 방식)
                      </li>
                      <li>
                        할부 기간(24개월) 동안 일리 커피머신 &amp; 커피캡슐 1팩 구독을 유지하셔야 할인된 가격으로 이용할
                        수 있어요.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </BxDialog.Body>
            {/* <BxDialog.Footer name="Headerrrr">여기는 풋터123123영역</BxDialog.Footer> */}
          </BxDialog>

          <BxToast
            isShow={{
              data: isToastOpen,
              setData: setToastOpen
            }}
          >
            테스트토스트
          </BxToast>
          <BxToast
            isShow={{
              data: isToastOpen2,
              setData: setToastOpen2
            }}
          >
            테스트토스트222222
          </BxToast>
          <BxCheckboxGroup
            items={[
              {
                codeId: 1,
                codeName: 'asdf'
              },
              {
                codeId: 2,
                codeName: 'asdf2'
              }
            ]}
          >
            {(item) => <BxCheckbox>{item.codeName}</BxCheckbox>}
          </BxCheckboxGroup>
          <BxCheckbox ref={inputCheckboxRef}>test</BxCheckbox>
          <BxInputField
            ref={inputRef}
            isError={valiInputField.isError}
            textMessage={valiInputField.textMessage}
            placeholder="한글만"
            inputFilter={INPUT_FILTER.KO}
            value={{
              data: inputValue,
              setData: setInputValue
            }}
          />
          {inputValue}
          <BxInputField
            ref={inputRef}
            isError={valiInputField.isError}
            textMessage={valiInputField.textMessage}
            placeholder="영어만"
            inputFilter={INPUT_FILTER.EN}
          />
          {/* 전체상품:S */}
          <BxButton
            onClick={() => setToastOpen(!isToastOpen)}
          >{`isToastOpenisToastOpen ${isToastOpen} isToastOpen`}</BxButton>
          <br />
          <BxButton
            onClick={() => setToastOpen2(!isToastOpen2)}
          >{`isToastOpen2isToastOpen2 ${isToastOpen2} isToastOpen2`}</BxButton>
          <BxProductionItem
            item={displayProdList.sppsFoDtoList[0]}
            useBannerLarge={true}
            designProdType={DESIGN_PROD_TYPE.WIDE}
            onClickAdd={(item) => onClickAdd(item)}
            onClickDelete={(item) => onClickDelete(item)}
          />
          <BxProductionItem
            item={displayProdList.sppsFoDtoList[0]}
            useBannerLarge={true}
            designProdType={DESIGN_PROD_TYPE.DEFAULT_LARGE}
            onClickAdd={(item) => onClickAdd(item)}
            onClickDelete={(item) => onClickDelete(item)}
          />
          <BxProductionItem
            item={displayProdList.sppsFoDtoList[0]}
            useBannerLarge={true}
            designProdType={DESIGN_PROD_TYPE.DEFAULT}
            onClickAdd={(item) => onClickAdd(item)}
            onClickDelete={(item) => onClickDelete(item)}
          />
          <BxProductionItem
            item={displayProdList.sppsFoDtoList[1]}
            useBannerLarge={true}
            designProdType={DESIGN_PROD_TYPE.DEFAULT}
            onClickAdd={(item) => onClickAdd(item)}
            onClickDelete={(item) => onClickDelete(item)}
          />
          <BxProductionWrapping type={WRAPPING_TYPE.DEFAULT} items={displayProdList.sppsFoDtoList}>
            {(item) => (
              <BxProductionItem
                item={item}
                useBannerLarge={true}
                designProdType={DESIGN_PROD_TYPE.DEFAULT}
                onClickAdd={(item) => onClickAdd(item)}
                onClickDelete={(item) => onClickDelete(item)}
              />
            )}
          </BxProductionWrapping>
          {/* 전체상품:E */}
        </div>
      </main>
    </section>
  )
}

export default Main
