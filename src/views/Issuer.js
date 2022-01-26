import React from "react";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import Sidebar from "./Sidebar";
import placeholder from "../images/User-1@2x.png";
import noCertImage from "../images/Video-1@2x.png";
import { ipfsUrl } from "../util/ipfs";

class Issuer extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div className="issuer">
        <Sidebar
          onChangeGroupInSidebar={this.props.onChangeGroupInSidebar}
          groupInSidebar={this.props.groupInSidebar}
          groupsInSidebar={this.props.groupsInSidebar}
          fetchGroupsInSidebar={this.props.fetchGroupsInSidebar}
        />
        <div className="issuer-certificates-wrapper">
          <div className="issuer-certificates">
            <Link to="/new">
              {this.props.groupInSidebar ? (
                <div className="issuer-certificates-new">証明書登録</div>
              ) : (
                ""
              )}
            </Link>
            <br />
            <p className="issuer-certificates-title">登録済証明書</p>
            {this.props.groupInSidebar === null ? (
              <div className="issuer-certificates-select-group">
                左メニューから発行元を選択、または発行元を登録してください。
              </div>
            ) : (
              <div className="issuer-certificates-list">
                {this.props.certificates !== null ? (
                  this.props.certificates.map((certificate) => {
                    return (
                      <div className="issuer-certificates-list-cell">
                        <img src={ipfsUrl(certificate.image)} className="issuer-certificates-list-cell-icon" />
                        <p className="issuer-certificates-list-cell-title">
                          {certificate.title}
                        </p>
                        <Link to={"/issue/" + certificate.certId}>
                          <div className="issuer-certificates-list-cell-issue">
                            発行
                          </div>
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                  />
                )}
              </div>
            )}
          </div>
          {this.props.certificates !== null
            ? this.props.certificates.map((certificate) => {
                return (
                  <div className="issuer-certificate">
                    <p className="issuer-certificate-title">
                      {certificate.title}
                    </p>
                    <div className="issuer-certificate-list">
                      {certificate.userCerts
                        ? certificate.userCerts.map((userCert, index) => {
                            return (
                              <div className="certificates-list-cell">
                                <Link to={"/certs/" + userCert.userCertId}>
                                  <img
                                    src={
                                      userCert.toProfile
                                        ? ipfsUrl(userCert.toProfile.icon)
                                        : placeholder
                                    }
                                    className="issuer-certificate-list-cell-icon"
                                  />
                                </Link>
                                <Link
                                  to={"/certs/" + userCert.userCertId}
                                  className="issuer-certificate-list-cell-detail"
                                >
                                  <p className="issuer-certificate-list-cell-name">
                                    {userCert.toProfile
                                      ? userCert.toProfile.name
                                      : ""}
                                  </p>
                                  <p className="issuer-certificate-list-cell-address">
                                    {userCert.to}
                                  </p>
                                </Link>
                                <div
                                  className="issuer-certificate-list-cell-invalidate"
                                  onClick={() =>
                                    this.props.invalidateUserCert(
                                      userCert.certId,
                                      userCert.userCertId
                                    )
                                  }
                                >
                                  取消
                                </div>
                              </div>
                            );
                          })
                        : ""}
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    );
  }
}

export default Issuer;
