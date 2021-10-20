import React from "react";

class Donation extends React.Component{
  render() {
    return (
      <div className="donation">
        <div className="donation-content">
          <p className="donation-title">寄付について</p>
          <div className="donation-description">
            <p>本サービスでは、暗号通貨MATICを利用し証明書の発行やサービスの維持をしています。サービス運営に必要なMATICは皆様からの寄付で賄われています。</p>
            <p>MATICの不足により証明書が発行できない場合は、MATICを寄付することによって発行することができます。</p>
            <p>また寄付されたMATICは本サービスの運営以外の目的で移動、使用は行いません。</p>
            <p className="donation-address-title">寄付先アドレス</p>
            <p className="donation-address"><b className="donation-address-title">寄付先:</b> 0x21DAA5453e9d5BF9e33CC2406abBa1BC6338a22C</p>
            
          </div>
        </div>
      </div>
    );
  }
}

export default Donation;
