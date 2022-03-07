import React from "react";
import Loader from "react-loader-spinner";
import Sidebar from "./Sidebar";
import validation from "../validation";

class EditGroup extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div className="edit-group">
        <Sidebar
          onChangeGroupInSidebar={this.props.onChangeGroupInSidebar}
          groupInSidebar={this.props.groupInSidebar}
          groupsInSidebar={this.props.groupsInSidebar}
          fetchGroupsInSidebar={this.props.fetchGroupsInSidebar}
        />
        {this.props.groupInSidebar !== null ? (
          <div className="edit-group-content">
            <p className="edit-group-title">
              発行元 {this.props.groupNameOfTitle}の更新
            </p>
            <p className="edit-group-description">
              証明書の発行には発行元となる団体（企業、教育機関、NPO法人など）の登録が必要です。
            </p>
            <div className="edit-group-form">
              <p className="edit-group-form-title">団体名</p>
              <input
                type="text"
                className="edit-group-form-name"
                onChange={this.props.onChangeGroupName}
                value={this.props.groupInSidebar.name}
              />
              { this.props.groupNameValidation.status === "valid" ? (
                <p className="validation">{ this.props.groupInSidebar.name.length + " / " + validation.groupName }</p>
              ) : (
                <p className="validation-error">{ this.props.groupInSidebar.name.length + " / " + validation.groupName }</p>
              )}
              <p className="edit-group-form-title">住所</p>
              <input
                type="text"
                className="edit-group-form-address"
                onChange={this.props.onChangeGroupAddress}
                value={this.props.groupInSidebar.residence}
              />
              { this.props.groupAddressValidation.status === "valid" ? (
                <p className="validation">{ this.props.groupInSidebar.residence.length + " / " + validation.groupAddress }</p>
              ) : (
                <p className="validation-error">{ this.props.groupInSidebar.residence.length + " / " + validation.groupAddress }</p>
              )}
              <p className="edit-group-form-title">電話番号</p>
              <input
                type="text"
                className="edit-group-form-phone"
                onChange={this.props.onChangeGroupPhone}
                value={this.props.groupInSidebar.phone}
              />
              { this.props.groupPhoneValidation.status === "valid" ? (
                <p className="validation">{ this.props.groupInSidebar.phone.length + " / " + validation.groupPhone }</p>
              ) : (
                <p className="validation-error">{ validation.onlyNumbers(this.props.groupInSidebar.phone) ? this.props.groupInSidebar.phone.length + " / " + validation.groupPhone : "半角英数字のみで、ハイフンは使えません"}</p>
              )}
              <div className="register-button" onClick={this.props.updateGroup}>
                更新
              </div>
            </div>
          </div>
        ) : (
          <div className="edit-group-content">
            <Loader type="Puff" color="#00BFFF" height={100} width={100} />
          </div>
        )}
      </div>
    );
  }
}

export default EditGroup;
