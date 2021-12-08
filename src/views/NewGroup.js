import React from "react";

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
            <p className="new-group-form-title">発行元名</p>
            <input
              type="text"
              className="new-group-form-name"
              onChange={this.props.onChangeGroupName}
            />
            <p className="new-group-form-title">発行元住所</p>
            <input
              type="text"
              className="new-group-form-address"
              onChange={this.props.onChangeGroupAddress}
            />
            <p className="new-group-form-title">発行元電話番号</p>
            <input
              type="text"
              className="new-group-form-phone"
              onChange={this.props.onChangeGroupPhone}
            />

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
