import React from "react";
import validation from "../validation";

class NewGroup extends React.Component {
  render() {
    return (
      <div className="new-group">
        <div className="new-group-content">
          <p className="new-group-title">発行元の登録</p>
          <p className="new-group-description">
            証明書の発行には発行元となる団体（企業、教育機関、NPO法人など）の登録が必要です。
          </p>
          <div className="new-group-form">
            <p className="new-group-form-title">団体名</p>
            <input
              type="text"
              className="new-group-form-name"
              onChange={this.props.onChangeGroupName}
              value={this.props.groupName}
            />
            { this.props.groupNameValidation.status === "valid" ? (
              <p className="validation">{ this.props.groupName.length + " / " + validation.groupName }</p>
            ) : (
              <p className="validation-error">{ this.props.groupName.length + " / " + validation.groupName }</p>
            )}
            <p className="new-group-form-title">住所</p>
            <input
              type="text"
              className="new-group-form-address"
              onChange={this.props.onChangeGroupAddress}
              value={this.props.groupAddress}
            />
            { this.props.groupAddressValidation.status === "valid" ? (
              <p className="validation">{ this.props.groupAddress.length + " / " + validation.groupAddress }</p>
            ) : (
              <p className="validation-error">{ this.props.groupAddress.length + " / " + validation.groupAddress }</p>
            )}
            <p className="new-group-form-title">電話番号</p>
            <input
              type="text"
              className="new-group-form-phone"
              onChange={this.props.onChangeGroupPhone}
              value={this.props.groupPhone}
            />
            { this.props.groupPhoneValidation.status === "valid" ? (
              <p className="validation">{ this.props.groupPhone.length + " / " + validation.groupPhone }</p>
            ) : (
              <p className="validation-error">{ validation.onlyNumbers(this.props.groupPhone) ? this.props.groupPhone.length + " / " + validation.groupPhone : "半角英数字のみで、ハイフンは使えません" }</p>
            )}

            <div className="register-button" onClick={this.props.registerGroup}>
              登録
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewGroup;
