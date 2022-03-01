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
