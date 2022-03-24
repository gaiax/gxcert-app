import React from "react";
import { Link } from "react-router-dom";

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="footer-message">
          発行元の登録、証明書の発行には、ブロックチェーンへの書き込み手数料がかかります。
          <br />
          書き込み手数料は<Link to="/donate" className="donate-link">寄付</Link>によって賄われています。ご理解・ご協力賜りますようよろしくお願い申し上げます。
        </div>
        <div className="footer-app">
          Copyright © Gaiax Co.Ltd. All Rights Reserved.
        </div>
      </footer>
    );
  }
}

export default Footer;
