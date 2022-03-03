import React from "react";
import { createImageUrlFromUint8Array } from "../util/ipfs";
import { Link } from "react-router-dom";
import placeholder from "../images/Video-1@2x.png";
import Sidebar from "./Sidebar";
import { ipfsUrl } from "../util/ipfs";

class NewCert extends React.Component {
  componentDidMount() {
  }
  render() {
    return (
      <div className="new-cert">
        <Sidebar
          onChangeGroupInSidebar={this.props.onChangeGroupInSidebar}
          groupInSidebar={this.props.groupInSidebar}
          groupsInSidebar={this.props.groupsInSidebar}
          fetchGroupsInSidebar={this.props.fetchGroupsInSidebar}
        />
        <div className="new-cert-content">
          <p className="new-cert-title">
            {this.props.groupInSidebar !== null
              && this.props.groupInSidebar.name + "の"
              }
            証明書の登録
          </p>
          <p className="new-cert-description">
            証明書を登録してください。証明書は複数登録することができ、それぞれの複数のユーザーに対して発行することができます。
          </p>
          <div className="new-cert-form">
            <p className="new-cert-form-title">証明書名</p>
            <input
              type="text"
              className="new-cert-form-name"
              onChange={this.props.onChangeTitle}
              value={this.props.title}
            />
            { this.props.titleValidation.status === "valid" ? (
              <p className="validation">{ this.props.titleValidation.message }</p>
            ) : (
              <p className="validation-error">{ this.props.titleValidation.message }</p>
            )}
            <p className="new-cert-form-title">説明</p>
            <textarea
              className="new-cert-form-description"
              onChange={this.props.onChangeDescription}
              value={this.props.description}
            ></textarea>
            { this.props.descriptionValidation.status === "valid" ? (
              <p className="validation">{ this.props.descriptionValidation.message }</p>
            ) : (
              <p className="validation-error">{ this.props.descriptionValidation.message }</p>
            )}
            <p className="new-cert-form-title">証明書画像</p>
            <img src={this.props.image ? ipfsUrl(this.props.image) : placeholder} className="new-cert-form-image" />
            <div className="new-cert-form-image-file-div">
              <label className="new-cert-form-image-file-label">
                <input
                  type="file"
                  className="new-cert-form-image-file"
                  accept="image/*"
                  onChange={this.props.onChangeImage}
                />
                画像選択
              </label>
            </div>
            <div className="register-button" onClick={() => this.props.sign()}>
              登録
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewCert;
