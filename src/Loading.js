import React from "react";
import "./Loading.css";
import Loader from "react-loader-spinner";

class Loading extends React.Component {
  render() {
    return (
      <div className="loading-overlay">
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          className="loading-loader"
        />
        <p className="loading-message">
          ブロックチェーンへの書き込み中です。数分お待ちください。
        </p>
      </div>
    );
  }
}

export default Loading;
