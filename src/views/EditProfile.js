import React from "react";
import placeholder from "../images/User-1@2x.png";
import { ipfsUrl } from "../util/ipfs";

class EditProfile extends React.Component {
  componentDidMount() {
    this.props.fetchProfile();
  }
  render() {
    let image = null;
    let initialImageUrl = placeholder;
    if (this.props.profile !== null) {
      image = this.props.profile.icon;
    }
    return (
      <div className="edit-profile">
        <div className="edit-profile-content">
          <p className="edit-profile-title">
            プロフィール編集
          </p>
          <div className="edit-profile-form">
            <div className="edit-profile-form-image">
              <label for="edit-profile-form-image-file">
                <img src={!image ? initialImageUrl : ipfsUrl(image)} className="edit-profile-form-image" />
              </label>
              <input id="edit-profile-form-image-file" type="file" onChange={this.props.onChangeProfileImage} />
            </div>
            <p className="edit-profile-form-title">Name</p>
            <input type="text" className="edit-profile-form-name" onChange={this.props.onChangeProfileName} defaultValue={this.props.profile !== null ? this.props.profile.name : ""} />
            <div className="register-button" onClick={this.props.updateProfile} >
              更新
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfile;
