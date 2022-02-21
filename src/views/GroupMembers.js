import React from "react";
import Loader from "react-loader-spinner";
import Sidebar from "./Sidebar";
import placeholder from "../images/User-1@2x.png";
import { ipfsUrl } from "../util/ipfs";

class GroupMembers extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div className="group-members">
        <Sidebar
          onChangeGroupInSidebar={this.props.onChangeGroupInSidebar}
          groupInSidebar={this.props.groupInSidebar}
          groupsInSidebar={this.props.groupsInSidebar}
          fetchGroupsInSidebar={this.props.fetchGroupsInSidebar}
        />
        <div className="group-members-content">
          {(() => {
            const that = this;
            if (!this.props.groupInSidebar) {
              return (
                <Loader type="Puff" color="#00BFFF" height={100} width={100} />
              );
            }
            return (
              <div>
                <p className="group-members-title">
                  {this.props.groupInSidebar.name}のメンバー
                </p>
                <input
                  type="text"
                  className="group-members-invite"
                  placeholder="Email Address"
                  onChange={this.props.onChangeGroupMemberToInvite}
                />
                <button
                  className="group-members-invite-button"
                  onClick={this.props.inviteMember}
                >
                  招待
                </button>
                <div className="group-members-list">
                  {this.props.groupInSidebar.members.map((member, index) => {
                    return (
                      <div className="group-members-list-cell">
                        <img src={member.icon ? ipfsUrl(member.icon) : placeholder} className="group-members-list-cell-icon" />
                        <div className="group-members-list-cell-detail">
                          <p className="group-members-list-cell-name">
                            {member.name}
                          </p>
                          <p className="group-members-list-cell-address">
                            {member.address}
                          </p>
                        </div>
                        {this.props.groupInSidebar.members.length > 1 &&
                        index !== 0 && this.props.address !== member.address ? (
                          <div
                            className="group-members-list-cell-disable"
                            onClick={() =>
                              that.props.disableGroupMember(
                                that.props.groupInSidebar.groupId,
                                member.address
                              )
                            }
                          >
                            削除
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    );
  }
}

export default GroupMembers;
