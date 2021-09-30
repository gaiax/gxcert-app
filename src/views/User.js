import React from "react";
import Loader from "react-loader-spinner";

class User extends React.Component {
  componentDidMount() {
    const address = this.props.match.params.address;
    this.props.fetchProfile(address);
  }
  render() {
    return (
      <div className="user">
        { this.props.profile ? (
          <div className="user-content">
            <img src={this.props.profile.imageUrl} className="show-profile-image" alt="プロフィール" />
            <p className="user-title">{this.props.profile.name}</p>
          </div>
        ) : <Loader type="Puff" color="#00BFFF" height={100} width={100} /> }
      </div>
    )
  }
}

export default User;
