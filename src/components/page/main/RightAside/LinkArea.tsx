const LinkArea = ({
  isShow = true,
  items = [
    {
      link: 'pogg',
      imgSrc: '/hago/images/common/logo.png',
      className: 'hago',
      codeName: '유독 소개'
    },
    {
      link: 'pogg',
      imgSrc: '/hago/images/common/hago-customer-service.png',
      className: 'service',
      codeName: '고객센터'
    },
    {
      link: 'index',
      imgSrc: '/hago/images/common/lgu-ci.png',
      className: 'uplus-logo',
      codeName: '유플러스닷컴'
    }
  ]
}) => {
  return (
    <>
      {(isShow && (
        <div className="contetns bottom-contents">
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <LinkAreaItem link={item.link} imgSrc={item.imgSrc} className={item.className}>
                  {item.codeName}
                </LinkAreaItem>
              </li>
            ))}
          </ul>
        </div>
      )) ||
        null}
    </>
  )
}

const LinkAreaItem = (props) => {
  function move(name) {}
  return (
    <a onClick={() => move(props.link)}>
      <div className="content-wrap">
        <div className={`contents-logo ${props.className}`}>
          <img src={props.imgSrc} alt="" />
        </div>
        <div>{props.children}</div>
      </div>
    </a>
  )
}

export default LinkArea
