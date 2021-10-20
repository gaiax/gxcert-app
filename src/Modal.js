import React from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";

const modalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.85)"
  },
  content: {
    position: "absolute",
    top: "20vh",
    width: "240px",
    height: "240px",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#DDD",
    borderRadius: "1rem",
    padding: "2.5rem",
  }
};

class GxModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Modal isOpen={this.props.isOpen} style={modalStyle}>
        <span className="close-modal" onClick={this.props.closeModal} ><FaTimes /></span>
        <br/>

        { this.props.message !== undefined ? <p className="modal-message">{this.props.message}</p> : "" }
      </Modal>
    );
  }
}

export default GxModal;
