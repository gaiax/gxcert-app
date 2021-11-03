import { getGxCert } from "../gxcert-client";
import torusClient from "../torus";
import history from "../history";
import QRCode from "qrcode";
import config from "../config";
import * as modal from "./modal";
import * as input from "./input";
import * as request from "./request";
import * as session from "./session";
import * as fetch from "./fetch";
import wait from "./wait";

const sign = () => async (dispatch, getState) => {
  dispatch({
    type: "LOADING",
    payload: true,
  });
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch (err) {
    console.error(err);
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  if (
    !window.confirm(
      "グループの作成、証明書の発行には、ブロックチェーンへの書き込み手数料がかかります。書き込み手数料は寄付によって賄われています。ご理解・ご協力賜りますようよろしくお願い申し上げます。"
    )
  ) {
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  const state = getState().state;
  const certificates = state.certificatesInIssuer;
  if (state.groupInSidebar === null) {
    modal.openModal("Please set group on sidebar.")(dispatch, getState);
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  const image = state.image;
  if (!image) {
    modal.openModal("Image not set.")(dispatch, getState);
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  let imageCid;
  try {
    imageCid = await gxCert.client.uploadImageToIpfs(image);
  } catch (err) {
    console.error(err);
    modal.openModal("画像をIPFSにアップロードできませんでした")(
      dispatch,
      getState
    );
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  const certificate = {
    context: {},
    title: state.title,
    description: state.description,
    image: imageCid,
    groupId: state.groupInSidebar.groupId,
  };
  if (!gxCert.client.isCertificate(certificate)) {
    modal.openModal("Invalid Certificate.")(dispatch, getState);
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  let signed = null;
  try {
    signed = await gxCert.client.signCertificate(certificate, {
      address: gxCert.address(),
    });
  } catch (err) {
    console.error(err);
    modal.openModal("証明書データに署名できませんでした")(dispatch, getState);
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  let transactionHash;
  try {
    transactionHash = await gxCert.client.createCert(signed);
  } catch (err) {
    console.error(err);
    if (err.message === "insufficient funds") {
      modal.openModal(
        "書き込み用のMATICが足りません。寄付をすれば書き込みができます。"
      )(dispatch, getState);
    } else {
      modal.openModal("証明書を書き込むことができませんでした")(
        dispatch,
        getState
      );
    }
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  modal.openModal("書き込みを実行しました", {
    link: "https://polygonscan.com/tx/" + transactionHash,
    text: "TransactionHash: " + transactionHash,
  })(dispatch, getState);
  let prevLength = certificates.length;
  await (() => {
    return new Promise((resolve, reject) => {
      const timer = setInterval(async () => {
        let certificates;
        try {
          certificates = await gxCert.getGroupCerts(
            certificate.groupId,
            dispatch,
            [
              {
                type: "certificate",
                refresh: true,
              },
              {
                type: "certificateImage",
                refresh: false,
                wait: false,
              },
            ]
          );
        } catch (err) {
          console.error(err);
          return;
        }
        if (prevLength < certificates.length) {
          clearInterval(timer);
          resolve();
        }
      }, 21000);
    });
  })();
  await fetch.fetchCertificatesInIssuer()(dispatch, getState);
  dispatch({
    type: "LOADING",
    payload: false,
  });

  history.push("/issue");
};

const addTo = () => async (dispatch, getState) => {
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch (err) {
    console.error(err);
    modal.openModal("発行先の登録に失敗しました")(dispatch, getState);
    return;
  }
  const state = getState().state;
  const email = state.toInIssue;
  let to;
  try {
    to = await torusClient.getPublicAddressByGoogle(email);
  } catch (err) {
    console.error(err);
    modal.openModal("発行先の登録に失敗しました")(dispatch, getState);
    return;
  }
  const usersToIssue = state.usersToIssue;
  for (const user of usersToIssue) {
    if (user.address === to) {
      return;
    }
  }
  let profile;
  try {
    profile = await gxCert.getProfile(to, dispatch, [
      {
        type: "profile",
        refresh: true,
      },
      {
        type: "profileImage",
        refresh: false,
        wait: true,
      },
    ]);
  } catch (err) {
    console.error(err);
    modal.openModal("発行先の登録に失敗しました")(dispatch, getState);
    return;
  }
  profile.address = to;
  usersToIssue.unshift(profile);
  dispatch({
    type: "ADD_TO",
    payload: usersToIssue,
  });
};

const removeUserInIssue = (address) => async (dispatch, getState) => {
  const state = getState().state;
  const users = state.usersToIssue;
  for (let i = 0; i < users.length; i++) {
    if (users[i].address === address) {
      users.splice(i, 1);
      dispatch({
        type: "ADD_TO",
        payload: users,
      });
      return;
    }
  }
};

const thisObjectToExport = {
  addTo,
  sign,
  removeUserInIssue,
};

const actions = {
  ...fetch,
  ...input,
  ...modal,
  ...request,
  ...session,
  ...thisObjectToExport,
};

export default actions;
