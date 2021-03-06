import React from "react";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import { dateToString } from "../util/date";
import { ipfsUrl } from "../util/ipfs";

class Certificates extends React.Component {
  componentDidMount() {
    this.props.fetchCertificates();
  }
  render() {
    return (
      <div className="certificates">
        <div className="certificates-content">
          <p className="certificates-title">取得証明書</p>
          <div className="certificates-list">
            {this.props.userCerts !== null && this.props.userCerts.length !== 0
              && this.props.userCerts.map((userCert, index) => {
                  if (!userCert.certificate) {
                    return <p></p>;
                  }
                  return (
                    <Link to={"/certs/" + userCert.userCertId}>
                      <div className="certificates-list-cell">
                        <img
                          src={ipfsUrl(userCert.certificate.image)}
                          className="certificates-list-cell-icon"
                        />
                        <div className="certificates-list-cell-detail">
                          <p className="certificates-list-cell-title">
                            {userCert.certificate.title}
                          </p>
                          <p className="certificates-list-cell-date">
                            {dateToString(
                              new Date(parseInt(userCert.timestamp) * 1000)
                            )}
                          </p>
                          <p className="certificates-list-cell-by">
                            {userCert.certificate.group.name}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            {this.props.userCerts !== null &&
            this.props.userCerts.length === 0 && (
              <p>証明書がありません</p>
            )}
            {this.props.userCerts === null && (
              <Loader type="Puff" color="#00BFFF" height={100} width={100} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Certificates;
