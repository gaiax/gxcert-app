import React from "react";
import { createImageUrlFromUint8Array, ipfsUrl } from "../util/ipfs";

class NewProfile extends React.Component {
  render() {
    let image = "";
    if (this.props.image) {
      image = ipfsUrl(this.props.image);
    }
    return (
      <div className="new-profile">
        <div className="new-profile-content">
          <p className="new-profile-title">
            ユーザー登録
          </p>
          <div className="new-profile-form">
            <div className="new-profile-form-image">
              <label for="new-profile-form-image-file">
                <img src={image} className="new-profile-form-image" />
              </label>
              <input id="new-profile-form-image-file" type="file" onChange={this.props.onChangeProfileImage} />
            </div>
            <p className="new-profile-form-title">氏名</p>
            <input type="text" className="new-profile-form-name" onChange={this.props.onChangeProfileName} placeholder="John Doe" />
            <div className="register-button" onClick={this.props.registerProfile} >
              登録
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewProfile;
