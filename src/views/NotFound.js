import React from "react";

class NotFound extends React.Component {
  render() {
    return (
      <div className="not-found">
        <div className="not-found-content">
          <p className="not-found-message">404 Not Found</p>
          <p className="not-found-message-sub">This url is invalid.</p>
        </div>
      </div>
    );
  }
}

export default NotFound;
