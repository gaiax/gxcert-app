import { getGxCert } from "../gxcert-client";
import torusClient from "../torus";
import history from "../history";
import QRCode from "qrcode";
import config from "../config";
import wait from "./wait";

import { openModal, closeModal } from "./modal";

import { fetchGroupsInSidebar, fetchCertificatesInIssuer } from "./fetch";

const openModalOfTransactionHash = (message, link) => async (dispatch, getState) => {
  openModal(message, link)(dispatch, getState);
  setTimeout(() => {
    closeModal()(dispatch, getState);
  }, 10 * 1000);
}

const registerProfile = () => async (dispatch, getState) => {
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
  const state = getState().state;
  const name = state.profileName;
  const address = state.from;

  const icon = state.profileImage;
  const newProfile = {
    name,
    icon,
  };
  let signedProfile;
  try {
    signedProfile = await gxCert.client.signProfile(newProfile, {
      address,
    });
  } catch (err) {
    console.error(err);
    openModal("プロフィールに署名できませんでした")(dispatch, getState);
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  let transactionHash;
  try {
    transactionHash = await gxCert.client.createProfile(address, signedProfile);
  } catch (err) {
    console.error(err);
    if (err.message === "insufficient funds") {
      openModal(
        "書き込み用のMATICが足りません。寄付をすれば書き込みができます。"
      )(dispatch, getState);
    } else {
      openModal("プロフィールを登録できませんでした")(dispatch, getState);
    }
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  openModalOfTransactionHash("書き込みを実行しました", {
    link: "https://polygonscan.com/tx/" + transactionHash,
    text: "TransactionHash: " + transactionHash,
  })(dispatch, getState);
  let profile;
  await (() => {
    return new Promise((resolve, reject) => {
      const timer = setInterval(async () => {
        profile = await gxCert.getProfile(gxCert.address(), dispatch, [
          {
            type: "profile",
            refresh: true,
          },
        ]);
        console.log(profile);
        if (
          profile.name === newProfile.name &&
          profile.icon === newProfile.icon
        ) {
          clearInterval(timer);
          resolve();
        }
      }, 21000);
    });
  })();
  dispatch({
    type: "MY_PROFILE",
    payload: profile,
  });
  dispatch({
    type: "LOADING",
    payload: false,
  });
  history.push("/");
};
const registerGroup = () => async (dispatch, getState) => {
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
  const from = state.from;

  const signedGroup = await gxCert.client.signGroup({
    name: state.groupName,
    residence: state.groupAddress,
    phone: state.groupPhone,
  }, from, {
    address: from,
  });

  let transactionHash;
  try {
    transactionHash = await gxCert.client.createGroup(
      signedGroup
    );
  } catch (err) {
    console.error(err);
    if (err.message === "insufficient funds") {
      openModal(
        "書き込み用のMATICが足りません。寄付をすれば書き込みができます。"
      )(dispatch, getState);
    } else {
      openModal("グループを作成できませんでした")(dispatch, getState);
    }
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  openModalOfTransactionHash("書き込みを実行しました", {
    link: "https://polygonscan.com/tx/" + transactionHash,
    text: "TransactionHash: " + transactionHash,
  })(dispatch, getState);
  const prevLength = state.groupsInSidebar.length;
  let groups;
  await (() => {
    return new Promise((resolve, reject) => {
      const timer = setInterval(async () => {
        try {
          groups = await gxCert.getGroups(gxCert.address(), dispatch, [
            {
              type: "groupId",
              refresh: true,
            },
            {
              type: "group",
              refresh: false,
            },
          ]);
        } catch (err) {
          console.error(err);
          resolve();
          return;
        }
        if (prevLength < groups.length) {
          clearInterval(timer);
          resolve();
        }
      }, 21000);
    });
  })();
  const group = groups[groups.length - 1];
  dispatch({
    type: "ON_CHANGE_GROUP_IN_SIDEBAR",
    payload: group,
  });
  await fetchGroupsInSidebar()(dispatch, getState);
  dispatch({
    type: "LOADING",
    payload: false,
  });
  history.push("/new");
};
const updateProfile = () => async (dispatch, getState) => {
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
  const state = getState().state;
  const name = state.profileNameInEdit !== "" ? state.profileNameInEdit : state.profileInEdit.name;
  const icon = state.profileImageInEdit !== "" ? state.profileImageInEdit : state.profileInEdit.icon;

  const address = gxCert.address();

  const newProfile = {
    name,
    icon,
  };
  let signedProfile;
  try {
    signedProfile = await gxCert.client.signProfileForUpdating(newProfile, {
      address,
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: "LOADING",
      payload: false,
    });
    openModal("プロフィールを更新するには署名を許可する必要があります。")(
      dispatch,
      getState
    );
    return;
  }
  let transactionHash;
  try {
    transactionHash = await gxCert.client.updateProfile(signedProfile);
  } catch (err) {
    console.error(err);
    if (err.message === "insufficient funds") {
      openModal(
        "書き込み用のMATICが足りません。寄付をすれば書き込みができます。"
      )(dispatch, getState);
    } else {
      openModal("プロフィールを更新できませんでした")(dispatch, getState);
    }
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  openModalOfTransactionHash("書き込みを実行しました", {
    link: "https://polygonscan.com/tx/" + transactionHash,
    text: "TransactionHash: " + transactionHash,
  })(dispatch, getState);
  await (() => {
    return new Promise((resolve, reject) => {
      const timer = setInterval(async () => {
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
          resolve();
          return;
        }
        if (
          profile.name === newProfile.name &&
          profile.icon === newProfile.icon
        ) {
          clearInterval(timer);
          resolve();
        }
      }, 21000);
    });
  })();

  dispatch({
    type: "LOADING",
    payload: false,
  });
  history.push("/");
};
const updateGroup = () => async (dispatch, getState) => {
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
  const state = getState().state;
  if (state.groupInSidebar === null) {
    openModal("Please choose group on sidebar.")(dispatch, getState);
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  const groupId = state.groupInSidebar.groupId;
  const name = state.groupNameInEdit;
  const residence = state.groupAddressInEdit;
  const phone = state.groupPhoneInEdit;
  const newGroup = {
    groupId,
    name,
    residence,
    phone,
  };

  let signedGroup;
  try {
    signedGroup = await gxCert.client.signGroupForUpdating(newGroup, {
      address: gxCert.address(),
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: "LOADING",
      payload: false,
    });
    openModal("発行元情報を更新するには、署名を許可する必要があります。")(
      dispatch,
      getState
    );
    return;
  }
  let transactionHash;
  try {
    transactionHash = await gxCert.client.updateGroup(signedGroup);
  } catch (err) {
    console.error(err);
    if (err.message === "insufficient funds") {
      openModal(
        "書き込み用のMATICが足りません。寄付をすれば書き込みができます。"
      )(dispatch, getState);
    } else {
      openModal("グループ情報を更新できませんでした")(dispatch, getState);
    }
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  openModalOfTransactionHash("書き込みを実行しました", {
    link: "https://polygonscan.com/tx/" + transactionHash,
    text: "TransactionHash: " + transactionHash,
  })(dispatch, getState);
  await (() => {
    return new Promise((resolve, reject) => {
      const timer = setInterval(async () => {
        let group;
        try {
          group = await gxCert.getGroup(groupId, dispatch, [
            {
              type: "group",
              refresh: true,
            },
          ]);
        } catch (err) {
          console.error(err);
          resolve();
          return;
        }
        if (
          group.name === newGroup.name &&
          group.residence === newGroup.residence &&
          group.phone === newGroup.phone
        ) {
          clearInterval(timer);
          resolve();
        }
      }, 21000);
    });
  })();

  dispatch({
    type: "LOADING",
    payload: false,
  });
  history.push("/issue");
};
const issue = (certId) => async (dispatch, getState) => {
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
  const users = state.usersToIssue;
  if (users.length === 0) {
    openModal("発行先のユーザーを指定してください")(dispatch, getState);
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  const from = state.from;
  const tos = users.map((user) => {
    return user.address;
  });
  let signed;
  try {
    signed = await gxCert.client.signUserCertificates(certId, from, tos, {
      address: from,
    });
  } catch (err) {
    console.error(err);
    openModal("証明書データに署名できませんでした")(dispatch, getState);
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  let transactionHash;
  try {
    transactionHash = await gxCert.client.createUserCerts(signed);
  } catch (err) {
    console.error(err);
    if (err.message === "insufficient funds") {
      openModal(
        "書き込み用のMATICが足りません。寄付をすれば書き込みができます。"
      )(dispatch, getState);
    } else {
      openModal("証明書を発行できませんでした")(dispatch, getState);
    }
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  openModalOfTransactionHash("書き込みを実行しました", {
    link: "https://polygonscan.com/tx/" + transactionHash,
    text: "TransactionHash: " + transactionHash,
  })(dispatch, getState);
  dispatch({
    type: "ADD_TO",
    payload: [],
  });
  let certIndex = null;
  for (let i = 0; i < state.certificatesInIssuer.length; i++) {
    if (parseInt(state.certificatesInIssuer[i].certId) === certId) {
      certIndex = i;
      continue;
    }
  }
  if (certIndex === null || !state.certificatesInIssuer[certIndex].userCerts) {
    dispatch({
      type: "LOADING",
      payload: false,
    });
    history.push("/issue");
    return;
  }
  const prevLength = state.certificatesInIssuer[certIndex].userCerts.length;
  await (() => {
    return new Promise((resolve, reject) => {
      const timer = setInterval(async () => {
        let userCerts;
        try {
          userCerts = await gxCert.getIssuedUserCerts(certId, dispatch, [
            {
              type: "userCert",
              refresh: true,
            },
          ]);
        } catch (err) {
          console.error(err);
          resolve();
          return;
        }
        if (prevLength < userCerts.length) {
          clearInterval(timer);
          resolve();
        }
      }, 21000);
    });
  })();
  await fetchCertificatesInIssuer()(dispatch, getState);
  dispatch({
    type: "LOADING",
    payload: false,
  });
  history.push("/issue");
};
const inviteMember = () => async (dispatch, getState) => {
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch (err) {
    console.error(err);
    return;
  }
  const state = getState().state;
  const signerAddress = state.from;
  const groupId = state.groupInSidebar.groupId;
  const email = state.groupMemberToInvite;
  let address;
  try {
    address = await torusClient.getPublicAddressByGoogle(email);
  } catch (err) {
    console.error(err);
    openModal("Email is not registered.")(dispatch, getState);
    return;
  }
  let profile;
  try {
    profile = await gxCert.getProfile(address, dispatch, [
      {
        type: "profile",
        refresh: true,
      },
    ]);
  } catch (err) {
    console.error(err);
    openModal("そのユーザーは登録されていません")(dispatch, getState);
    return;
  }
  profile.address = address;
  let group = state.groupInSidebar;
  group.members.push(profile);
  dispatch({
    type: "ON_CHANGE_GROUP_IN_SIDEBAR",
    payload: group,
  });
  let signedMember;
  dispatch({
    type: "LOADING",
    payload: true,
  });
  try {
    signedMember = await gxCert.client.signMemberAddressForInviting(address, {
      address: signerAddress,
    });
  } catch (err) {
    console.error(err);
    group.members.pop();
    dispatch({
      type: "ON_CHANGE_GROUP_IN_SIDEBAR",
      payload: group,
    });
    dispatch({
      type: "LOADING",
      payload: false,
    });
    openModal("グループへの招待に署名できませんでした")(dispatch, getState);
    return;
  }
  let transactionHash;
  try {
    transactionHash = await gxCert.client.inviteMemberToGroup(
      groupId,
      signedMember
    );
  } catch (err) {
    console.error(err);
    if (err.message === "insufficient funds") {
      openModal(
        "書き込み用のMATICが足りません。寄付をすれば書き込みができます。"
      )(dispatch, getState);
    } else {
      openModal("グループへの招待を送信できませんでした")(dispatch, getState);
    }
    group.members.pop();
    dispatch({
      type: "ON_CHANGE_GROUP_IN_SIDEBAR",
      payload: group,
    });
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }

  openModalOfTransactionHash("書き込みを実行しました", {
    link: "https://polygonscan.com/tx/" + transactionHash,
    text: "TransactionHash: " + transactionHash,
  })(dispatch, getState);

  await (() => {
    return new Promise((resolve, reject) => {
      const timer = setInterval(async () => {
        let _group;
        try {
          _group = await gxCert.getGroup(group.groupId, dispatch, [
            {
              type: "group",
              refresh: true,
            },
          ]);
        } catch (err) {
          console.error(err);
          return;
        }
        if (group.members.length <= _group.members.length) {
          clearInterval(timer);
          resolve();
        }
      }, 21000);
    });
  })();
  dispatch({
    type: "LOADING",
    payload: false,
  });
};

const disableGroupMember = (groupId, address) => async (dispatch, getState) => {
  let gxCert;
  const state = getState().state;
  try {
    gxCert = await getGxCert();
  } catch (err) {
    console.error(err);
    return;
  }
  let group = state.groupInSidebar;
  dispatch({
    type: "LOADING",
    payload: true,
  });
  let signedAddress;
  try {
    signedAddress = await gxCert.client.signMemberAddressForDisabling(
      address,
      { address: gxCert.address() }
    );
  } catch(err) {
    console.error(err);
    dispatch({
      type: "LOADING",
      payload: false,
    });
    openModal("グループメンバーの無効化に署名できませんでした")(dispatch, getState);
    return;
  }
  let transactionHash;
  try {
    transactionHash = await gxCert.client.disableGroupMember(groupId, signedAddress);
  } catch (err) {
    console.error(err);
    dispatch({
      type: "LOADING",
      payload: false,
    });
    if (err.message === "insufficient funds") {
      openModal(
        "書き込み用のMATICが足りません。寄付をすれば書き込みができます。"
      )(dispatch, getState);
    } else {
      openModal("グループメンバーの無効化を送信できませんでした")(dispatch, getState);
    }
    return;
  }
  openModalOfTransactionHash("書き込みを実行しました", {
    link: "https://polygonscan.com/tx/" + transactionHash,
    text: "TransactionHash: " + transactionHash,
  })(dispatch, getState);
  await (() => {
    return new Promise((resolve, reject) => {
      const timer = setInterval(async () => {
        let _group;
        try {
          _group = await gxCert.getGroup(group.groupId, dispatch, [
            {
              type: "group",
              refresh: true,
            },
          ]);
        } catch (err) {
          console.error(err);
          return;
        }
        if (group.members.length > _group.members.length) {
          dispatch({
            type: "ON_CHANGE_GROUP_IN_SIDEBAR",
            payload: _group,
          });
          clearInterval(timer);
          resolve();
        }
      }, 21000);
    });
  })();
  dispatch({
    type: "LOADING",
    payload: false,
  });
};

const invalidateUserCert = (userCertId) => async (dispatch, getState) => {
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch (err) {
    console.error(err);
    return;
  }
  dispatch({
    type: "LOADING",
    payload: true,
  });

  let signedUserCert;
  try {
    signedUserCert = await gxCert.client.signUserCertForInvalidation(
      userCertId,
      { address: gxCert.address() }
    );
  } catch(err) {
    console.error(err);
    openModal("署名できませんでした")(dispatch, getState);
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  let transactionHash;
  try {
    transactionHash = await gxCert.client.invalidateUserCert(signedUserCert);
  } catch (err) {
    if (err.message === "insufficient funds") {
      openModal(
        "書き込み用のMATICが足りません。寄付をすれば書き込みができます。"
      )(dispatch, getState);
    } else {
      openModal(
        "証明書を無効化できませんでした。"
      )(dispatch, getState);
    }
    dispatch({
      type: "LOADING",
      payload: false,
    });
    console.error(err);
    return;
  }
  openModalOfTransactionHash("書き込みを実行しました", {
    link: "https://polygonscan.com/tx/" + transactionHash,
    text: "TransactionHash: " + transactionHash,
  })(dispatch, getState);
  await wait();

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
    ]);
  } catch (err) {
    console.error(err);
    //openModal("")(dispatch, getState);
    return;
  }
};

export {
  registerGroup,
  registerProfile,
  inviteMember,
  issue,
  updateGroup,
  updateProfile,
  disableGroupMember,
  invalidateUserCert,
};
