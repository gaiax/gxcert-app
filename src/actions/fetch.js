import { getGxCert } from "../gxcert-client";
import torusClient from "../torus";
import history from "../history";
import QRCode from "qrcode";
import config from "../config";
import { openModal, closeModal } from "./modal";
const fetchCertificateInIssue = (certId) => async (dispatch) => {
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch (err) {
    console.error(err);
    return;
  }
  let certificate;
  try {
    certificate = await gxCert.getCert(certId, dispatch, [
      {
        type: "certificate",
        refresh: false,
      },
    ]);
  } catch (err) {
    console.error(err);
    return;
  }
  dispatch({
    type: "FETCHED_CERTIFICATE_IN_ISSUE",
    payload: certificate,
  });
};

const fetchCertificate = (userCertId) => async (dispatch, getState) => {
  dispatch({
    type: "FETCHED_CERTIFICATE",
    payload: null,
  });
  dispatch({
    type: "LOADING_IN_SHOW",
    payload: true,
  });
  let gxCert;
  try {
    gxCert = await getGxCert(false);
  } catch (err) {
    console.error(err);
    dispatch({
      type: "LOADING_IN_SHOW",
      payload: false,
    });
    return;
  }
  let userCert;
  try {
    userCert = await gxCert.getUserCert(
      userCertId,
      dispatch,
      [
        {
          type: "userCert",
          refresh: false,
        },
        {
          type: "certificate",
          refresh: false,
        },
        {
          type: "group",
          refresh: false,
        },
      ],
      1
    );
  } catch (err) {
    console.error(err);
    dispatch({
      type: "LOADING_IN_SHOW",
      payload: false,
    });
    return;
  }
  dispatch({
    type: "LOADING_IN_SHOW",
    payload: false,
  });
  dispatch({
    type: "FETCHED_CERTIFICATE",
    payload: userCert,
  });
  QRCode.toDataURL(
    config.host + "/certs/" + userCert.userCertId,
    (err, url) => {
      userCert.qr = url;
      dispatch({
        type: "FETCHED_CERTIFICATE",
        payload: userCert,
      });
    }
  );
};

const fetchCertificates = () => async (dispatch, getState) => {
  console.log("fetch");
  dispatch({
    type: "FETCHED_USER_CERTIFICATES",
    payload: null,
  });
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch (err) {
    console.error(err);
    dispatch({
      type: "FETCHED_USER_CERTIFICATES",
      payload: [],
    });
    return;
  }
  let address;
  address = await gxCert.clients[0].address;
  if (address === "" || !address) {
    history.push("/top");
    return;
  }
  let userCerts;
  try {
    userCerts = await gxCert.getReceivedUserCerts(address, dispatch, [
      {
        type: "userCert",
        refresh: true,
      },
      {
        type: "certificate",
        refresh: false,
      },
      {
        type: "group",
        refresh: false,
      },
      {
        type: "profile",
        refresh: false,
      },
    ]);
  } catch (err) {
    console.error(err);
    dispatch({
      type: "FETCHED_USER_CERTIFICATES",
      payload: [],
    });
    return;
  }
  dispatch({
    type: "FETCHED_USER_CERTIFICATES",
    payload: userCerts,
  });
};

const fetchGroupsInSidebar = () => async (dispatch, getState) => {
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch (err) {
    console.error(err);
    return;
  }
  const address = gxCert.address();
  let groups;
  try {
    groups = await gxCert.getGroups(address, dispatch, [
      {
        type: "groupId",
        refresh: true,
      },
      {
        type: "group",
        refresh: true,
      },
      {
        type: "profile",
        refresh: false,
      },
    ]);
  } catch (err) {
    console.error(err);
    return;
  }
  dispatch({
    type: "FETCHED_GROUPS_IN_SIDEBAR",
    payload: groups,
  });
};

const fetchGroupInShow = (groupId) => async (dispatch, getState) => {
  dispatch({
    type: "FETCHED_GROUP_IN_SHOW",
    payload: null,
  });
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch (err) {
    console.error(err);
    return;
  }
  let group;
  try {
    group = await gxCert.getGroup(
      groupId,
      dispatch,
      [
        {
          type: "group",
          refresh: true,
        },
      ],
      1
    );
  } catch (err) {
    console.error(err);
    return;
  }
  dispatch({
    type: "FETCHED_GROUP_IN_SHOW",
    payload: group,
  });
};
const fetchProfile = () => async (dispatch, getState) => {
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch (err) {
    console.error(err);
    return;
  }
  let profile;
  try {
    profile = await gxCert.getProfile(gxCert.address(), dispatch, [
      {
        type: "profile",
        refresh: true,
      },
    ]);
  } catch (err) {
    console.error(err);
    return;
  }
  dispatch({
    type: "FETCHED_PROFILE_IN_EDIT",
    payload: profile,
  });
};
const fetchProfileInShow = (address) => async (dispatch, getState) => {
  dispatch({
    type: "FETCHED_PROFILE_IN_SHOW",
    payload: null,
  });
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch (err) {
    console.error(err);
    return;
  }
  let profile;
  try {
    profile = await gxCert.getProfile(
      address,
      dispatch,
      [
        {
          type: "profile",
          refresh: true,
        },
      ],
      1
    );
  } catch (err) {
    console.error(err);
    return;
  }
  dispatch({
    type: "FETCHED_PROFILE_IN_SHOW",
    payload: profile,
  });
};

const fetchCertificatesInIssuer = () => async (dispatch, getState) => {
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch (err) {
    console.error(err);
    return;
  }
  const state = getState().state;
  let certificates = [];
  const group = state.groupInSidebar;
  if (!group) {
    return;
  }
  const groupId = group.groupId;
  try {
    certificates = await gxCert.getGroupCerts(groupId, dispatch, [
      {
        type: "certificate",
        refresh: true,
      },
      {
        type: "userCert",
        refresh: true,
      },
      {
        type: "profile",
        refresh: false,
      },
    ]);
  } catch (err) {
    console.error(err);
    openModal("証明書を取得できませんでした")(dispatch, getState);
    return;
  }
  dispatch({
    type: "FETCHED_CERTIFICATES_IN_ISSUER",
    payload: certificates,
  });
};

export {
  fetchProfile,
  fetchProfileInShow,
  fetchCertificate,
  fetchCertificateInIssue,
  fetchCertificates,
  fetchGroupsInSidebar,
  fetchGroupInShow,
  fetchCertificatesInIssuer,
};
