import {useContext, useRef, useState} from 'react'
import {LayoutContext} from '@/contexts/LayoutContext'
import BxInputField, {INPUT_FILTER} from '@/components/common/BxInputField'
import BxButton from '@/components/common/BxButton'
import BxProductionItem, {DESIGN_PROD_TYPE} from '@/components/ui/BxProductionItem'
import BxProductionWrapping, {WRAPPING_TYPE} from '@/components/ui/BxProductionWrapping'
import {displayProdList} from '@/mock'
import BxCheckbox, {BxCheckboxGroup} from '@/components/common/BxCheckbox'
// import BxCheckboxGroup from '@/components/common/BxCheckboxGroup'
import BxToast from '@/components/common/BxToast'
import BxDialog, {STR_BUTTON_TYPE} from '@/components/common/BxDialog'
import BxSwiper from '@/components/common/BxSwiper'
import BxRadio, {BxRadioGroup} from '@/components/common/BxRadio'

const Main = (props) => {
  const {addDialog} = useContext(LayoutContext)

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
  const inputRadioboxRef = useRef(null)
  const [isToastOpen, setToastOpen] = useState(false)
  const [isToastOpen2, setToastOpen2] = useState(false)
  function onClickAdd(item) {
    console.log(item)
    inputRef.current.focus()
    inputCheckboxRef.current.focus()
    inputRadioboxRef.current.focus()
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
  const [currentValue, setCurrentValue] = useState({codeId: 1, codeName: '라디오1'})
  function ggggsetTest() {
    setstsetaset([
      {codeId: 1, codeName: '라디오1'},
      {codeId: 4, codeName: '라디오4'},
      {codeId: 3, codeName: '라디오3'}
    ])
  }

  const [testChekce, setTestChekce] = useState(false)
  function ggggsetTest2() {
    setTestChekce(!testChekce)
  }

  function onChange(e) {
    setTestChekce(!testChekce)
  }

  function onChangeGroup(e) {
    console.log(e)
  }
  function onChange2(item) {
    console.log('item-----------', item)
    setTestValue(item.code)
  }
  function onChange22(item) {
    console.log('item-----------', item)
  }
  function onChange23(item) {
    setTestValue3(item)
  }
  function onChange3(item) {
    console.log('item-----------', item.target.checked)
  }
  function clickwnS() {
    setTestValue('12')
  }
  function clic123kwnS() {
    settestxwwww('sdf')
  }
  function clic121233kwnS() {
    settestxwwww('')
  }

  const [testValue, setTestValue] = useState('1')
  const [testValue2, setTestValue2] = useState('1')
  const [testValue3, setTestValue3] = useState([{code: '321'}, {code: '344x'}])
  const [testxwwww, settestxwwww] = useState('1')
  const refBxCheckboxGroup = useRef(null)
  function refBxCheckboxGroupText() {
    console.log(refBxCheckboxGroup)
    refBxCheckboxGroup.current.focus()
  }

  //라디오테스트
  const [rntestValue, setrntestValue] = useState(true)
  const [r2adioValue, setr2adioValue] = useState('짱1')
  const [rdiTestValue3, setrdiTestValue3] = useState({code: '344x'})
  function rdionChange(e) {
    console.log(e.target.value)
    setr2adioValue(e.target.value)
  }

  function refBxRadioGroupText() {
    console.log(refBxCheckboxGroup)
    inputRadioboxRef.current.focus()
  }

  function onChange222(params) {
    setrdiTestValue3(params)
  }

  return (
    <section className="main-section">
      <main className="main">
        <button onClick={refBxRadioGroupText}>Radio Ref 가져오기</button>
        <br />
        <button onClick={() => setrdiTestValue3({code: '321'})}>RadioGroup - changeValue {`[{code: '321'}]`}</button>
        <br />
        <button onClick={() => setrdiTestValue3({code: '344x'})}>RadioGroup - changeValue {`[{code: '344x'}]`}</button>
        <br />
        <button onClick={() => setrdiTestValue3({code: '111304'})}>
          RadioGroup - changeValue {`[{code: '111304'}]`}
        </button>
        <br />
        <br />
        <BxRadio name="dx1" checked={r2adioValue === '짱1'} value="짱1" onChange={rdionChange}>
          asdfasdf4
        </BxRadio>
        <BxRadio name="dx1" checked={r2adioValue === '짱2'} value="짱2" ref={inputRadioboxRef} onChange={rdionChange}>
          asdfasdf5
        </BxRadio>
        <BxRadio name="dx1" checked={r2adioValue === '짱3'} value="짱3" onChange={rdionChange}>
          asdfasdf5
        </BxRadio>
        <BxRadio name="dx2">asdfasdf5</BxRadio>
        <BxRadio name="dx2">asdfasdf5</BxRadio>
        {JSON.stringify(r2adioValue)}

        <BxRadioGroup
          value={rdiTestValue3}
          items={[{code: '321'}, {code: '344x'}, {code: '111304'}]}
          codeId="code"
          useIcon={true}
          onChange={onChange222}
          returnObject={true}
        >
          {(item) => <span>{item.code}</span>}
        </BxRadioGroup>
        {JSON.stringify(rdiTestValue3)}
        <br />
        {/* <BxRadioGroup
          value={rdiTestValue3}
          items={[{code: '321'}, {code: '344x'}, {code: '111304'}]}
          onChange={onChange222}
        >
          {(item) => item['codeName']}
        </BxRadioGroup> */}
        <br />
        <button onClick={refBxCheckboxGroupText}>Checkbox Ref 가져오기</button>
        <br />
        <button onClick={() => setTestValue3([{code: '321'}])}>CheckboxGroup - changeValue {`[{code: '321'}]`}</button>
        <br />
        <button onClick={() => setTestValue3([{code: '321'}, {code: '111304'}])}>
          CheckboxGroup - changeValue {`[{code: '321'}, {code: '111304'}]`}
        </button>
        <br />
        <button onClick={() => setTestValue3([{code: '111304'}])}>
          CheckboxGroup - changeValue {`[{code: '111304'}]`}
        </button>
        <br />
        <BxCheckboxGroup
          value={testValue3}
          items={[{code: '321'}, {code: '344x'}, {code: '111304'}]}
          onChange={onChange23}
        >
          123
        </BxCheckboxGroup>
        <BxCheckboxGroup
          value={testValue3}
          items={[{code: '321'}, {code: '344x'}, {code: '111304'}]}
          onChange={onChange23}
        >
          <div>asdf</div>
          <div>asdf</div>
          <div>asdf</div>
        </BxCheckboxGroup>
        <BxCheckboxGroup
          value={testValue3}
          items={[{code: '321'}, {code: '344x'}, {code: '111304'}]}
          onChange={onChange23}
          ref={refBxCheckboxGroup}
        >
          {(item) => <span className="wxcv">{`asdfasdfasdf${item.code}`}</span>}
        </BxCheckboxGroup>
        {JSON.stringify(testValue3)}
        <br />
        <BxCheckbox ref={inputCheckboxRef} value={'sdf'} checked={testxwwww === 'sdf'} onChange={onChange3}>
          tes12312321t
        </BxCheckbox>
        <div className="p-main-prod-area">
          <button
            onClick={() =>
              addDialog({
                title: 'title',
                message: 'messagemessagemessage',
                buttonType: 'ALERT',
                callback: (params) => {
                  console.log(STR_BUTTON_TYPE.CONFIRM)

                  if (params === STR_BUTTON_TYPE.CONFIRM) {
                    addDialog({
                      message: '성공'
                    })
                  }
                }
              })
            }
          >
            Context.Provider -- addDialog
          </button>
          <button onClick={props.globalFunction}>globa12lFunction</button>
          <br />
          <br />
          <button
            onClick={() =>
              addDialog({
                message: '성공'
              })
            }
          >
            이거 누르면 값변함
          </button>
          <br />
          <button onClick={ggggsetTest2}>이거 누르면 값변함2</button>
          <br />
          {/* <BxRadio onChange={onChange} checked={testChekce} value="swmnxq" name="swmnxq13">
            asdfasdf4
          </BxRadio>
          <BxRadio onChange={onChange} checked={!testChekce} value="swmnxq2" name="swmnxq13">
            asdfasdf5
          </BxRadio>

          <BxRadio.Group value={currentValue} items={teststset} onChange={onChange222}>
            {(item) => item['codeName']}
          </BxRadio.Group> */}

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
          {/* <BxCheckbox.Group
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
            {(item) => <span>{`${item.codeName} 123123123`}</span>}
          </BxCheckbox.Group> */}
          <BxCheckbox>test</BxCheckbox>
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
