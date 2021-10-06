import React from "react";

class Donation extends React.Component{
  render() {
    return (
      <div className="donation">
        <div className="donation-content">
          <p className="donation-title">寄付について</p>
          <div className="donation-description">
            <p>このGxCertは、<b>皆様からの暗号通貨MATICの寄付をガス代として使用し、皆様の証明書を発行しています。</b></p>
            <p>寄付金不足によって、もし証明書が発行できない場合、<b>MATICを寄付すると利用できます。</b></p>
            <p>Gaiaxはこの寄付されたMATICを、GxCert運営以外の目的で移動、使用しません。</p>
            <p className="donation-address"><b className="donation-address-title">寄付先:</b> 0x21DAA5453e9d5BF9e33CC2406abBa1BC6338a22C</p>
            
          </div>
        </div>
      </div>
    );
  }
}

export default Donation;
