import { getGxCert } from "../gxcert-client";
import torusClient from "../torus";
import history from "../history";
import QRCode from "qrcode";
import config from "../config";
import { openModal, closeModal } from "./modal";
const signIn = () => async (dispatch) => {
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch (err) {
    console.error(err);
    openModal("Googleでログインしてください")(dispatch);
    return;
  }
  if (!gxCert.address()) {
    console.log("ログインできませんでした");
    return;
  }
  console.log(gxCert.address());
  dispatch({
    type: "LOGGED_IN",
    payload: gxCert.address(),
  });
  let profile;
  try {
    profile = await gxCert.getProfile(gxCert.address(), dispatch, [
      {
        type: "profile",
        refresh: true,
      },
      {
        type: "profileImage",
        refresh: false,
        wait: false,
        dispatchType: "MY_PROFILE",
      },
    ]);
  } catch (err) {
    console.error(err);
    history.push("/profile/new");
    return;
  }
  dispatch({
    type: "MY_PROFILE",
    payload: profile,
  });

  history.push("/");
};
const signOut = () => async (dispatch) => {
  dispatch({
    type: "SIGN_OUT",
    payload: null,
  });
  history.push("/top");
};

export { signIn, signOut };