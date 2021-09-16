import React from "react";
import ListInput from "./ListInput";
import Sidebar from "./Sidebar";

class Issue extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.certId = parseInt(this.props.match.params.certId);
    this.props.fetchCertificate(this.certId);
  }
  render() {
    return (
      <div className="issue">
        <Sidebar
          onChangeGroupInSidebar={this.props.onChangeGroupInSidebar}
          groupInSidebar={this.props.groupInSidebar}
          groupsInSidebar={this.props.groupsInSidebar}
          fetchGroupsInSidebar={this.props.fetchGroupsInSidebar}
        />
        { !this.props.certificate ? (
          <div className="issue-content">
            <p className="certificate-not-found">Certificate not found.</p> 
          </div>
        ) : (
          <div className="issue-content">
            <p className="issue-title">
              {this.props.certificate.title}の発行
            </p>
            <p className="issue-form-title">発行先メールアドレス</p>
            <div className="issue-form">
              <ListInput 
                usersToIssue={this.props.usersToIssue}
                addTo={this.props.addTo} 
                removeUserInIssue={this.props.removeUserInIssue}
                onChangeToInIssue={this.props.onChangeToInIssue}
              />
              <button className="issue-form-issue" onClick={ () => { this.props.issue(this.certId)}}>発行</button>
            </div>
          </div>
        ) }
      </div>
    );
  }
}

export default Issue;
