import React from "react"; 
import placeholder from "../images/person.svg";
import { createImageUrlFromUint8Array, ipfsUrl } from "../util/ipfs";
import photo from "../images/photo.svg";
import validation from "../validation";

class NewProfile extends React.Component {
  render() {
    let image = placeholder;
    if (this.props.image) {
      image = ipfsUrl(this.props.image);
    }
    return (
      <div className="new-profile">
        <div className="new-profile-content">
          <p className="new-profile-title">ユーザー登録</p>
          <div className="new-profile-form">
            <div className="new-profile-form-image">
              <label for="new-profile-form-image-file">
                <img src={image} className="new-profile-form-image" />
                <img src={photo} className="camera-mark" />
              </label>
              <input
                id="new-profile-form-image-file"
                type="file"
                accept="image/*"
                onChange={this.props.onChangeProfileImage}
              />
            </div>
            <p className="new-profile-form-title">氏名</p>
            <input
              type="text"
              className="new-profile-form-name"
              onChange={this.props.onChangeProfileName}
              placeholder="John Doe"
              value={this.props.profileName}
            />
            { this.props.profileNameValidation.status === "valid" ? (
              <p className="validation">{ this.props.profileName.length + " / " + validation.profileName }</p>
            ) : (
              <p className="validation-error">{ this.props.profileName.length + " / " + validation.profileName }</p>
            )}
            <div
              className="register-button"
              onClick={this.props.registerProfile}
            >
              登録
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewProfile;
