import { getGxCert } from "./gxcert-client";
import { getImageOnIpfs, createImageUrlFromUint8Array } from "./util/ipfs";
import torusClient from "./torus";
import history from "./history";
import QRCode from "qrcode";
import config from "./config";


function doNTimes(callback, n, ms) {
  for (let i = 0; i < n; i++) {
    setTimeout(callback, i * ms);
  }
}
async function getImageOnIpfsOrCache(cid, dispatch, getState) {
  const state = getState().state;
  let imageCache = state.imageCache;
  if (cid in imageCache) {
    return imageCache[cid];
  }
  const imageUrl = await getImageOnIpfs(cid);
  imageCache = getState().state.imageCache;
  imageCache[cid] = imageUrl;
  dispatch({
    type: "UPDATE_IMAGE_CACHE",
    payload: imageCache,
  });
  return imageUrl;


}

async function getUserCert(userCertId, dispatch, getState) {

}

function wait() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 6000);
  });
}
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
const onChangeGroup = (evt) => async (dispatch, getState) => {
  if (evt.target.value === "new") {
    history.push("/group/new");
    return;
  }
  dispatch({
    type: "ON_CHANGE_GROUP",
    payload: parseInt(evt.target.value),
  });
}

const onChangeToInIssue = (evt) => async (dispatch) => {
  dispatch({
    type: "ON_CHANGE_TO_IN_ISSUE",
    payload: evt.target.value,
  });
}

const onChangeGroupIdInEdit = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_GROUP_ID_IN_EDIT",
    payload: evt.target.value,
  });
}
const onChangeGroupNameInEdit = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_GROUP_NAME_IN_EDIT",
    payload: evt.target.value,
  });
}
const onChangeGroupAddressInEdit = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_GROUP_ADDRESS_IN_EDIT",
    payload: evt.target.value,
  });
}
const onChangeGroupPhoneInEdit = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_GROUP_PHONE_IN_EDIT",
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

const onChangeProfileName = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_PROFILE_NAME",
    payload: evt.target.value,
  });
}

const onChangeProfileEmail = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_PROFILE_EMAIL",
    payload: evt.target.value,
  });
}

const onChangeProfileImage = (evt) => async (dispatch, getState) => {
  const file = evt.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    dispatch({
      type: "ON_CHANGE_PROFILE_IMAGE",
      payload: reader.result,
    });
  }
  reader.readAsArrayBuffer(file);
}
const onChangeProfileNameInEdit = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_PROFILE_NAME_IN_EDIT",
    payload: evt.target.value,
  });
}

const onChangeProfileEmailInEdit = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_PROFILE_EMAIL_IN_EDIT",
    payload: evt.target.value,
  });
}

const onChangeProfileImageInEdit = (evt) => async (dispatch, getState) => {
  const file = evt.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    dispatch({
      type: "ON_CHANGE_PROFILE_IMAGE_IN_EDIT",
      payload: reader.result,
    });
  }
  reader.readAsArrayBuffer(file);
}

const onChangeGroupMemberToInvite = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_GROUP_MEMBER_TO_INVITE",
    payload: evt.target.value,
  });
}

const fetchCertificateInIssue = (certId) => async (dispatch) => {
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch(err) {
    console.error(err);
    return;
  }
  let certificate;
  try {
    certificate = await gxCert.getCert(
      certId, 
      dispatch, 
      [
        {
          type: "certificateImage",
          refresh: false,
        }
      ], 
      1
    );
  } catch(err) {
    console.error(err);
    return;
  }
  dispatch({
    type: "FETCHED_CERTIFICATE_IN_ISSUE",
    payload: certificate,
  });
}

const fetchCertificate = (userCertId) => async (dispatch, getState) => {
  dispatch({
    type: "FETCHED_CERTIFICATE",
    payload: null,
  });
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch(err) {
    console.error(err);
    return;
  }
  let userCert;
  try {
    userCert = await gxCert.getUserCert(
      userCertId, 
      dispatch, 
      [
        {
          type: "certificate", 
          refresh: false,
        },
        {
          type: "certificateImage",
          refresh: false,
        }
      ], 
      1
    );
  } catch(err) {
    console.error(err);
    return;
  }
  dispatch({
    type: "FETCHED_CERTIFICATE",
    payload: userCert,
  });
  QRCode.toDataURL(config.host + "/certs/" + userCert.userCertId, (err, url) => {
    userCert.qr = url;
    dispatch({
      type: "FETCHED_CERTIFICATE",
      payload: userCert,
    });
  });
}

const fetchCertificates = () => async (dispatch, getState) => {
  dispatch({
    type: "FETCHED_CERTIFICATES",
    payload: null,
  });
  const state = getState().state;
  const address = state.from;
  if (address === "" || !address) {
    history.push("/top");
    return;
  }
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch(err) {
    console.error(err);
    return;
  }
  let userCerts;
  try {
    userCerts = await gxCert.getReceivedUserCerts(
      address, 
      dispatch, 
      [
        {
          type: "certificate",
          refresh: true,
        },
        {
          type: "certificateImage",
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
        {
          type: "profileImage",
          refresh: false,
        },
      ]
    );
  } catch(err) {
    console.error(err);
    return;
  }
  dispatch({
    type: "FETCHED_CERTIFICATES",
    payload: userCerts,
  });
}

const fetchGroupsInSidebar = () => async (dispatch, getState) => {
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch(err) {
    console.error(err);
    return;
  }
  const address = gxCert.address();
  let groups;
  try {
    groups = await gxCert.getGroups(
      address,
      dispatch,
      [
        {
          type: "group",
          refresh: true,
        }
      ]
    );
  } catch(err) {
    console.error(err);
    return;
  }
  dispatch({
    type: "FETCHED_GROUPS_IN_SIDEBAR",
    payload: groups,
  });

}

const fetchGroupInShow = (groupId) => async (dispatch, getState) => {
  dispatch({
    type: "FETCHED_GROUP_IN_SHOW",
    payload: null,
  });
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch(err) {
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
        }
      ],
      1
    );
  } catch(err) {
    console.error(err);
    return;
  }
  dispatch({
    type: "FETCHED_GROUP_IN_SHOW",
    payload: group,
  });
}

const onChangeGroupInSidebar = (evt) => async (dispatch, getState) => {
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch(err) {
    console.error(err);
    return;
  }
  const state = getState().state;
  const groupIdStr = evt.target.value;
  if (groupIdStr === "new") {
    history.push("/group/new");
    return;
  }
  const groupId = parseInt(groupIdStr);
  const groups = state.groupsInSidebar;
  for (const group of groups) {
    if (group.groupId === groupId) {
      dispatch({
        type: "ON_CHANGE_GROUP_IN_SIDEBAR",
        payload: group,
      });
      dispatch({
        type: "ON_CHANGE_GROUP_NAME_IN_EDIT",
        payload: group.name,
      });
      dispatch({
        type: "ON_CHANGE_GROUP_ADDRESS_IN_EDIT",
        payload: group.residence,
      });
      dispatch({
        type: "ON_CHANGE_GROUP_PHONE_IN_EDIT",
        payload: group.phone,
      });
      continue;
    }
  }
  fetchCertificatesInIssuer()(dispatch, getState);
}

const signIn = () => async (dispatch) => {
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch(err) {
    console.error(err);
    alert("Please log with Google");
    return;
  }
  if (!gxCert.address()) {
    console.log("Failed to login.");
    return;
  }
  console.log(gxCert.address());
  dispatch({
    type: "LOGGED_IN",
    payload: gxCert.address(),
  });
  let profile;
  try {
    profile = await gxCert.getProfile(
      gxCert.address(),
      dispatch,
      [
        {
          type: "profile",
          refresh: true,
        },
        {
          type: "profileImage",
          refresh: false,
        },
      ]
    );
  } catch(err) {
    console.error(err);
    history.push("/profile/new");
    return;
  }
  dispatch({
    type: "MY_PROFILE",
    payload: profile,
  });

  history.push("/");
}

const fetchProfileInShow = (address) => async (dispatch, getState) => {
  dispatch({
    type: "FETCHED_PROFILE_IN_SHOW",
    payload: null,
  });
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch(err) {
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
        {
          type: "profileImage",
          refresh: false,
        },
      ],
      1
    );
  } catch(err) {
    console.error(err);
    return;
  }
  dispatch({
    type: "FETCHED_PROFILE_IN_SHOW",
    payload: profile,
  });

}

const fetchCertificatesInIssuer = () => async (dispatch, getState) => {
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch(err) {
    console.error(err);
    return;
  }
  const state = getState().state;
  const address = gxCert.address();
  let certificates = [];
  const group = state.groupInSidebar;
  const groupId = group.groupId;
  try {
    certificates = await gxCert.getGroupCerts(
      groupId,
      dispatch,
      [
        {
          type: "certificate",
          refresh: true,
        },
        {
          type: "certificateImage",
          refresh: false,
        },
        {
          type: "issuedUserCert",
          refresh: true,
        },
        {
          type: "profile",
          refresh: false,
        },
        {
          type: "profileImage",
          refresh: false,
        }
      ]
    );
  } catch(err) {
    console.error(err);
    alert("Failed to fetch certificates.");
    return;
  }
  dispatch({
    type: "FETCHED_CERTIFICATES_IN_ISSUER",
    payload: certificates,
  });
}

const sign = () => async (dispatch, getState) => {
  dispatch({
    type: "LOADING",
    payload: true,
  });
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch(err) {
    console.error(err);
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  if (!window.confirm("グループの作成、証明書の発行には、ブロックチェーンへの書き込み手数料がかかります。書き込み手数料は寄付によって賄われています。ご理解・ご協力賜りますようよろしくお願い申し上げます。")) {
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  const state = getState().state;
  const certificates = state.certificatesInIssuer;
  if (state.groupInSidebar === null) {
    alert("Please set group on sidebar.");
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  const image = state.image;
  if (!image) {
    alert("Image not set.");
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  let imageCid;
  try {
    imageCid = await gxCert.uploadImageToIpfs(image);
  } catch(err) {
    console.error(err);
    alert("Failed to post the image to IPFS.");
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
  }
  if (!gxCert.isCertificate(certificate)) {
    alert("Invalid Certificate.");
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  let signed = null;
  try {
    signed = await gxCert.signCertificate(certificate, { address: gxCert.address() });
  } catch(err) {
    console.error(err);
    alert("Failed to sign the certificate.");
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  try {
    await gxCert.createCert(signed);
  } catch(err) {
    console.error(err);
    alert("Failed to post the signed certificate.");
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
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
              }
            ]
          );
        } catch(err) {
          console.error(err);
          return;
        }
        const state = getState().state;
        if (prevLength < certificates.length) {
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
}

const registerProfile = () => async (dispatch, getState) => {
  dispatch({
    type: "LOADING",
    payload: true,
  });
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch(err) {
    console.error(err);
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  const state = getState().state;
  const name = state.profileName;
  const email = state.profileEmail;
  const iconImage = state.profileImage;
  const address = state.from;

  let icon;
  try {
    icon = await gxCert.uploadImageToIpfs(iconImage);
  } catch(err) {
    console.error(err);
    alert("Failed to upload image to IPFS."); 
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  const newProfile = {
    name,
    email,
    icon,
  }
  let signedProfile;
  try {
    signedProfile = await gxCert.signProfile(newProfile, { 
      address,
    });
  } catch(err) {
    console.error(err);
    alert("Failed to sign profile.");
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  try {
    await gxCert.createProfile(address, signedProfile);
  } catch(err) {
    console.error(err);
    alert("Failed to register profile.");
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  let profile;
  await (() => {
    return new Promise((resolve, reject) => {
      const timer = setInterval(async () => {
        profile = await gxCert.getProfile(
          gxCert.address(),
          dispatch,
          [
            {
              type: "profile",
              refresh: true,
            },
            {
              type: "profileImage",
              refresh: false,
            }
          ]
        );
        if (profile.name === newProfile.name && profile.email === newProfile.email && profile.icon === newProfile.icon) {
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

}
const registerGroup = () => async (dispatch, getState) => {
  dispatch({
    type: "LOADING",
    payload: true,
  });
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch(err) {
    console.error(err);
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  if (!window.confirm("グループの作成、証明書の発行には、ブロックチェーンへの書き込み手数料がかかります。書き込み手数料は寄付によって賄われています。ご理解・ご協力賜りますようよろしくお願い申し上げます。")) {
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  const state = getState().state;
  const from = state.from;
  const groupName = state.groupName;
  const groupAddress = state.groupAddress;
  const groupPhone = state.groupPhone;
  try {
    await gxCert.createGroup(groupName, groupAddress, groupPhone, from);
  } catch(err) {
    console.error(err);
    alert("Failed to create group.");
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  const prevLength = state.groupsInSidebar.length;
  let groupIds;
  await (() => {
    return new Promise((resolve, reject) => {
      const timer = setInterval(async () => {
        try {
          groupIds = await gxCert.getGroups(
            gxCert.address(),
            dispatch,
            [
              {
                type: "groupId",
                refresh: true,
              },
              {
                type: "group",
                refresh: false,
              },
            ]
          );
        } catch(err) {
          console.error(err);
          resolve();
          return;
        }
        const state = getState().state;
        if (prevLength < groupIds.length) {
          clearInterval(timer);
          resolve();
        }
      }, 21000);
    });
  })();
  const group = await gxCert.getGroup(
    groupIds[groupIds.length - 1],
    dispatch,
    [
      {
        type: "group",
        refresh: false,
      }
    ]
  );
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
}
const updateProfile = () => async (dispatch, getState) => {
  dispatch({
    type: "LOADING",
    payload: true,
  });
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch(err) {
    console.error(err);
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  const state = getState().state;
  const name = state.profileNameInEdit;
  const email = state.profileEmailInEdit;
  const image = state.profileImageInEdit;
  let icon;
  if (image === "") {
    if (state.profileInEdit !== null) {
      icon = state.profileInEdit.icon;
    } else {
      icon = "";
    }
  } else {
    icon = await gxCert.uploadImageToIpfs(image);
  }

  const address = gxCert.address();

  const newProfile = {
    name,
    email,
    icon,
  }
  console.log(newProfile);
  let signedProfile;
  try {
    signedProfile = await gxCert.signProfileForUpdating(newProfile, { address });
  } catch(err) {
    console.error(err);
    dispatch({
      type: "LOADING",
      payload: false,
    });
    alert("プロフィールを更新するには署名を許可する必要があります。");
    return;
  }
  try {
    await gxCert.updateProfile(signedProfile);
  } catch(err) {
    console.error(err);
    alert("Failed to update your profile.");
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  await (() => {
    return new Promise((resolve, reject) => {
      const timer = setInterval(async () => {
        let profile;
        try {
          profile = await gxCert.getProfile(
            gxCert.address(),
            dispatch,
            [
              {
                type: "profile",
                refresh: true,
              },
              {
                type: "profileImage",
                refresh: false,
              }
            ]
          );
        } catch(err) {
          console.error(err);
          resolve();
          return;
        }
        if (profile.name === newProfile.name && profile.email === newProfile.email && profile.icon === newProfile.icon) {
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
}
const updateGroup = () => async (dispatch, getState) => {
  dispatch({
    type: "LOADING",
    payload: true,
  });
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch(err) {
    console.error(err);
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  const state = getState().state;
  if (state.groupInSidebar === null) {
    alert("Please choose group on sidebar.");
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
  }

  let signedGroup;
  try {
    signedGroup = await gxCert.signGroup(newGroup, { address: gxCert.address() });
  } catch(err) {
    console.error(err);
    dispatch({
      type: "LOADING",
      payload: false,
    });
    alert("発行元情報を更新するには、署名を許可する必要があります。");
    return;
  }
  try {
    await gxCert.updateGroup(signedGroup);
  } catch(err) {
    console.error(err);
    alert("Failed to update group.");
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  await (() => {
    return new Promise((resolve, reject) => {
      const timer = setInterval(async () => {
        let group;
        try {
          group = await gxCert.getGroup(
            groupId,
            dispatch,
            [
              {
                type: "group",
                refresh: true,
              }
            ]
          );
        } catch(err) {
          console.error(err);
          resolve();
          return;
        }
        if (group.name === newGroup.name && group.residence === newGroup.residence && group.phone === newGroup.phone) {
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
}
const issue = (certId) => async (dispatch, getState) => {
  dispatch({
    type: "LOADING",
    payload: true,
  });
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch(err) {
    console.error(err);
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  if (!window.confirm("グループの作成、証明書の発行には、ブロックチェーンへの書き込み手数料がかかります。書き込み手数料は寄付によって賄われています。ご理解・ご協力賜りますようよろしくお願い申し上げます。")) {
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  const state = getState().state;
  const users = state.usersToIssue;
  if (users.length === 0) {
    alert("発行先のユーザーを指定してください");
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  const from = state.from;
  const signerAddress = state.from;
  const tos = users.map(user => {
    return user.address;
  });
  let signed;
  try {
    signed = await gxCert.signUserCertificates(certId, from, tos, { address: from });
  } catch(err) {
    console.error(err);
    alert("Failed to sign the certificate.");
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  console.log(signed);
  try {
    await gxCert.createUserCerts(signed);
  } catch(err) {
    console.error(err);
    alert("Failed to issue the certificate.");
    dispatch({
      type: "LOADING",
      payload: false,
    });
    return;
  }
  dispatch({
    type: "ADD_TO",
    payload: [],
  });
  let certIndex = null;
  console.log(state.certificatesInIssuer);
  for (let i = 0; i < state.certificatesInIssuer.length; i++) {
    if (parseInt(state.certificatesInIssuer[i].id) === certId) {
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
          userCerts = await gxCert.getIssuedUserCerts(
            certId,
            dispatch,
            [
              {
                type: "userCerts",
                refresh: true,
              },
            ]
          );
        } catch(err) {
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
}
const inviteMember = () => async (dispatch, getState) => {
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch(err) {
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
  } catch(err) {
    console.error(err);
    alert("Email is not registered.");
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
        {
          type: "profileImage",
          refresh: false,
        }
      ]
    );
  } catch(err) {
    console.error(err);
    alert("そのユーザーは登録されていません");
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
    signedMember = await gxCert.signMemberAddressForInviting(address, { address: signerAddress });
  } catch(err) {
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
    alert("Failed to sign for invitation.");
    return;
  }
  try {
    await gxCert.inviteMemberToGroup(groupId, signedMember);
  } catch(err) {
    console.error(err);
    alert("Failed to send invitation.");
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
  await (() => {
    return new Promise((resolve, reject) => {
      const timer = setInterval(async () => {
        let _group;
        try {
          _group = await gxCert.getGroup(
            group.groupId,
            dispatch,
            [
              {
                type: "group",
                refresh: true,
              }
            ]
          );
        } catch(err) {
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
}

const disableGroupMember = (groupId, address) => async (dispatch, getState) => {
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch(err) {
    console.error(err);
    return;
  }
  const state = getState().state;
  const signedAddress = await gxCert.signMemberAddressForDisabling(address, { address: gxCert.address() });
  try {
    await gxCert.disableGroupMember(groupId, signedAddress);
  } catch(err) {
    console.error(err);
    return;
  }
}

const invalidateUserCert = (userCertId) => async (dispatch, getState) => {
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch(err) {
    console.error(err);
    return;
  }
  const signedUserCert = await gxCert.signUserCertForInvalidation(userCertId, { address: gxCert.address() });
  console.log(signedUserCert);
  try {
    await gxCert.invalidateUserCert(signedUserCert);
  } catch(err) {
    console.error(err);
    return;
  }
  await wait();

  const state = getState().state;
  const address = gxCert.address();
  let groups;
  try {
    groups = await gxCert.getGroups(
      address,
      dispatch,
      [
        {
          type: "group",
          refresh: true,
        }
      ]
    );
  } catch(err) {
    console.error(err);
    alert("Failed to fetch your groups");
    return;
  }
  let certificates = [];
  for (const group of groups) {
    const groupId = group.groupId;
    try {
      certificates = certificates.concat(
        await gxCert.getGroupCerts(
          groupId,
          dispatch,
          [
            {
              type: "certificate",
              refresh: false,
            },
            {
              type: "certificateImage",
              refresh: false,
            },
            {
              type: "userCert",
              refresh: true,
            },
            {
              type: "profile",
              refresh: false,
            }
          ]
        )
      );
    } catch(err) {
      console.error(err);
      continue;
    }
  }
  dispatch({
    type: "FETCHED_CERTIFICATES_IN_ISSUER",
    payload: certificates,
  });
}

const onChangeToList = (values) => async (dispatch) => {
  dispatch({
    type: "ON_CHANGE_TO_LIST",
    payload: values,
  });
}

const signOut = () => async (dispatch) => {
  dispatch({
    type: "SIGN_OUT",
    payload: null,
  });
  history.push("/top");
}

const addTo = () => async (dispatch, getState) => {
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch(err) {
    console.error(err);
    alert("発行先の登録に失敗しました");
    return;
  }
  const state = getState().state;
  const email = state.toInIssue;
  let to;
  try {
    to = await torusClient.getPublicAddressByGoogle(email);
  } catch(err) {
    console.error(err);
    alert("発行先の登録に失敗しました");
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
    profile = await gxCert.getProfile(
      to,
      dispatch,
      [
        {
          type: "profile",
          refresh: true,
        },
        {
          type: "profileImage",
          refresh: false,
        },
      ],
      1
    );
  } catch(err) {
    console.error(err);
    alert("発行先の登録に失敗しました");
    return;
  }
  profile.address = to;
  usersToIssue.unshift(profile);
  dispatch({
    type: "ADD_TO",
    payload: usersToIssue,
  });
}

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
}
export {
  onChangeTitle,
  onChangeDescription,
  onChangeImage,
  onChangeGroup,
  onChangeGroupName,
  onChangeGroupAddress,
  onChangeGroupPhone,
  onChangeGroupNameInEdit,
  onChangeGroupAddressInEdit,
  onChangeGroupPhoneInEdit,
  onChangeProfileName,
  onChangeProfileEmail,
  onChangeProfileImage,
  onChangeProfileNameInEdit,
  onChangeProfileEmailInEdit,
  onChangeProfileImageInEdit,
  onChangeToInIssue,
  onChangeGroupMemberToInvite,
  onChangeGroupInSidebar,
  sign,
  signIn,
  fetchProfileInShow,
  fetchCertificate,
  fetchCertificateInIssue,
  fetchCertificates,
  fetchGroupsInSidebar,
  fetchGroupInShow,
  fetchCertificatesInIssuer,
  registerGroup,
  registerProfile,
  inviteMember,
  issue,
  updateGroup,
  updateProfile,
  disableGroupMember,
  invalidateUserCert,
  signOut,
  onChangeToList,
  addTo,
  removeUserInIssue,

};
