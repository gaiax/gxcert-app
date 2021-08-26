import { getGxCert, getGxCertWithoutLogin } from "./gxcert-client";
import { getImageOnIpfs } from "./util/ipfs";
import torusClient from "./torus";
import history from "./history";

const onChangeTitle = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_TITLE",
    payload: evt.target.value,
  });
}
const onChangeDescription = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_DESCRIPTION",
    payload: evt.target.value,
  });
}
const onChangeUrl = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_URL",
    payload: evt.target.value,
  });
}
const onChangeImage = (evt) => async (dispatch, getState) => {
  const file = evt.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    dispatch({
      type: "ON_CHANGE_IMAGE",
      payload: reader.result,
    });
  }
  reader.readAsArrayBuffer(file);
}
const onChangeFrom = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_FROM",
    payload: evt.target.value,
  });
}
const onChangeTo = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_TO",
    payload: evt.target.value,
  });
}

const onChangeGroupName = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_GROUP_NAME",
    payload: evt.target.value,
  });
}

const onChangeGroupAddress = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_GROUP_ADDRESS",
    payload: evt.target.value,
  });
}
const onChangeGroupPhone = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_GROUP_PHONE",
    payload: evt.target.value,
  });
}

const loggedIn = (address) => async (dispatch) => {
  dispatch({
    type: "LOGGED_IN",
    payload: address
  });
}

const fetchCertificate = (cid) => async (dispatch) => {
  let gxCert;
  try {
    gxCert = await getGxCertWithoutLogin();
  } catch(err) {
    console.error(err);
    return;
  }
  let certificate;
  try {
    certificate = await gxCert.getCertByCid(cid);
  } catch(err) {
    console.error(err);
    return;
  }
  console.log(certificate);
  dispatch({
    type: "FETCHED_CERTIFICATE",
    payload: certificate,
  });
  const imageCid = certificate.image;
  let imageUrl;
  try {
    imageUrl = await getImageOnIpfs(imageCid);
  } catch(err) {
    console.error(err);
    return;
  }
  dispatch({
    type: "FETCHED_CERTIFICATE_IMAGE",
    payload: imageUrl,
  });
}

const fetchCertificates = () => async (dispatch, getState) => {
  const state = getState().state;
  const address = state.from;
  console.log(state);
  if (address === "" || !address) {
    history.push("/top");
    return;
  }
  let gxCert;
  try {
    gxCert = await getGxCertWithoutLogin();
  } catch(err) {
    console.error(err);
    return;
  }
  let certificates;
  try {
    certificates = await gxCert.getReceivedCerts(address);
  } catch(err) {
    console.error(err);
    return;
  }
  for (let i = 0; i < certificates.length; i++) {
    getImageOnIpfs(certificates[i].image).then(imageUrl => {
      certificates[i].imageUrl = imageUrl;
      dispatch({
        type: "FETCHED_CERTIFICATES",
        payload: certificates,
      });
    });
  }
  dispatch({
    type: "FETCHED_CERTIFICATES",
    payload: certificates,
  });
}

const fetchCertificateImage = (cid) => async (dispatch) => {
  let imageUrl;
  try {
    imageUrl = await getImageOnIpfs(cid);
  } catch(err) {
    console.error(err);
    return;
  }
  dispatch({
    type: "FETCHED_CERTIFICATE_IMAGE",
    payload: imageUrl,
  });
}

const signIn = () => async (dispatch) => {
  await torusClient.init();
  const web3 = await torusClient.login();
  const gxCert = getGxCert(web3);
  await gxCert.init();
  const accounts = await gxCert.web3.eth.getAccounts();
  if (accounts.length === 0) {
    console.log("Failed to login.");
    return;
  }
  dispatch({
    type: "LOGGED_IN",
    payload: accounts[0],
  });
  history.push("/new");
}

const sign = () => async (dispatch, getState) => {
  let gxCert;
  try {
    gxCert = getGxCert();
  } catch(err) {
    console.error(err);
    return;
  }
  const state = getState().state;
  const image = state.image;
  if (!image) {
    alert("Image not set.");
    return;
  }
  let imageCid;
  try {
    imageCid = await gxCert.uploadImageToIpfs(image);
  } catch(err) {
    console.error(err);
    alert("Failed to post the image to IPFS.");
    return;
  }
  const accounts = await gxCert.web3.eth.getAccounts();
  let to;
  try {
    to = await torusClient.getPublicAddressByGoogle(state.to);
  } catch(err) {
    console.error(err);
    alert("to google email address is invalid.");
    return;
  }
  if (!to) {
    alert("to google email address is invalid.");
    return;
  }
  const certificate = {
    context: {},
    title: state.title,
    description: state.description,
    from: accounts[0],
    to: to,
    issued_at: (new Date()).getTime(),
    url: state.url,
    image: imageCid,
  }
  if (!gxCert.isCertificate(certificate)) {
    alert("Invalid Certificate.");
    return;
  }
  let signed = null;
  try {
    signed = await gxCert.signCertificate(certificate);
  } catch(err) {
    console.error(err);
    alert("Failed to sign the certificate.");
    return;
  }
  try {
    await gxCert.sendSignedCertificateToGx(signed);
  } catch(err) {
    console.error(err);
    alert("Failed to post the signed certificate.");
    return;
  }

  dispatch({
    type: "SIGN",
    payload: null,
  });
  history.push("/certs");
}
export {
  onChangeTitle,
  onChangeDescription,
  onChangeImage,
  onChangeUrl,
  onChangeFrom,
  onChangeTo,
  onChangeGroupName,
  onChangeGroupAddress,
  onChangeGroupPhone,
  sign,
  signIn,
  loggedIn,
  fetchCertificate,
  fetchCertificates,
  fetchCertificateImage,

};
