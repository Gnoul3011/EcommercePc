function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container ">
          <div className="left">
            <div className="info-left">
              <div className="introduction">
                <div className="introduction-logo">
                  <img src="/img/logoipsum-247.png" alt="" />
                  <img src="/img/Techshop.png" alt="" />
                </div>
                <span className="introduction-text">
                  Lorem ipsum dolor sit amet consectetur. Id lobortis
                  donecturpis lorem massa integer consectetur vulputate. Amet
                  proin magna nulla ut. Platea imperdiet.
                </span>
              </div>

              <ul className="socials-left">
                <li className="icon-left">
                  <img alt="" src="/img/ic_facebbook.png"></img>
                </li>
                <li className="icon-left">
                  <img alt="" src="/img/ic_instagram.png"></img>
                </li>
                <li className="icon-left">
                  <img alt="" src="/img/ic_linkedin.png"></img>
                </li>
                <li className="icon-left">
                  <img alt="" src="/img/ic_twitter.png"></img>
                </li>
              </ul>
            </div>
            <div className="text-left">© 2021. All rights reserved</div>
          </div>
          <div className="right">
            <div className="right-info">
              <div className="right-name">
                <h1>TeachShop</h1>
              </div>
              <div className="right-text">
                <span>About Us</span>
                <span>Contact Us</span>
                <span>FAQ</span>
              </div>
            </div>
            <div className="right-info">
              <div className="right-name">
                <h1>Legal</h1>
              </div>
              <div className="right-text">
                <span>Terms and Condition</span>
                <span>Privacy Policy</span>
              </div>
            </div>
            <div className="right-info">
              <div className="right-name">
                <h1>Contact</h1>
              </div>
              <div className="right-text">
                <span>support@techshop.com</span>
                <span>975/28 Tran Xuan Soan, P. Tan Hung, Q.7, Tp. HCM</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
