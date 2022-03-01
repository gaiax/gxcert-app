import { getGxCert } from "../gxcert-client";
import history from "../history";
import QRCode from "qrcode";
import config from "../config";
const openModal = (message, link) => async (dispatch, getState) => {
  if (link) {
    dispatch({
      type: "MODAL_LINK",
      payload: link,
    });
  }
  dispatch({
    type: "MODAL",
    payload: message,
  });
};
const closeModal = (message) => async (dispatch, getState) => {
  dispatch({
    type: "MODAL_LINK",
    payload: {
      link: null,
      text: null,
    },
  });
  dispatch({
    type: "MODAL",
    payload: null,
  });
};

export { openModal, closeModal };
