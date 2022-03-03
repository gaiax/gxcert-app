import React from "react";

import { ipfsUrl } from "../util/ipfs";
import placeholder from "../images/User-1@2x.png";
class ListInput extends React.Component {
  render() {
    const cells = this.props.usersToIssue.map((user) => {
      return (
        <div className="group-members-list-cell">
          <img src={user.icon ? ipfsUrl(user.icon) : placeholder} className="group-members-list-cell-icon" />
          <div className="group-members-list-cell-detail">
            <p className="group-members-list-cell-name">{user.name}</p>
            <p className="group-members-list-cell-address">{user.address}</p>
          </div>
          <div
            className="group-members-list-cell-disable"
            onClick={() => this.props.removeUserInIssue(user.address)}
          >
            削除
          </div>
        </div>
      );
    });

    return (
      <div className="list-input">
        <input
          type="text"
          className="list-input-element"
          placeholder="メールアドレス"
          onChange={this.props.onChangeToInIssue}
        />
        <button className="list-input-add" onClick={this.props.addTo}>
          追加
        </button>
        {cells}
      </div>
    );
  }
}

export default ListInput;
