import React from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";

const modalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(127,127,127,0.5)",
  },
  content: {
    position: "absolute",
    top: "20vh",
    width: "240px",
    height: "240px",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#FFFFFF",
    borderRadius: "6px",
    padding: "2.5rem",
  },
};

class GxModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Modal isOpen={this.props.isOpen} style={modalStyle}>
        <span className="close-modal" onClick={this.props.closeModal}>
          <FaTimes />
        </span>
        <br />

        {this.props.message ? (
          <p className="modal-message">{this.props.message}</p>
        ) : (
          ""
        )}
        {this.props.link && this.props.linkText ? (
          <a target="_blank" className="modal-message" href={this.props.link}>
            {this.props.linkText}
          </a>
        ) : (
          ""
        )}
      </Modal>
    );
  }
}

export default GxModal;
