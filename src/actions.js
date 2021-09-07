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

const fetchCertificateInIssue = (certId) => async (dispatch) => {
  let gxCert;
  try {
    gxCert = await getGxCertWithoutLogin();
  } catch(err) {
    console.error(err);
    return;
  }
  let certificate;
  try {
    certificate = await gxCert.getCert(certId);
  } catch(err) {
    console.error(err);
    return;
  }
  dispatch({
    type: "FETCHED_CERTIFICATE_IN_ISSUE",
    payload: certificate,
  });
}

const fetchCertificate = (userCertId) => async (dispatch) => {
  dispatch({
    type: "FETCHED_CERTIFICATE",
    payload: null,
  });
  let gxCert;
  try {
    gxCert = await getGxCertWithoutLogin();
  } catch(err) {
    console.error(err);
    return;
  }
  let userCert;
  try {
    userCert = await gxCert.getUserCert(userCertId);
  } catch(err) {
    console.error(err);
    return;
  }
  dispatch({
    type: "FETCHED_CERTIFICATE",
    payload: userCert,
  });
  const imageCid = userCert.certificate.image;
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
  try {
    const group = await gxCert.getGroup(userCert.certificate.groupId);
    userCert.certificate.group = group;
    dispatch({
      type: "FETCHED_CERTIFICATE",
      payload: userCert,
    });
  } catch(err) {
    console.error(err);
    return;
  }
  try {
    const profile = await gxCert.getProfile(userCert.to);
    userCert.to = profile.name;
    dispatch({
      type: "FETCHED_CERTIFICATE",
      payload: userCert,
    });
  } catch(err) {
    console.error(err);
    return;
  }
}

const fetchCertificates = () => async (dispatch, getState) => {
  dispatch({
    type: "FETCHED_CERTIFICATES",
    payload: [],
  });
  const state = getState().state;
  const address = state.from;
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
  let userCerts;
  try {
    userCerts = await gxCert.getReceivedUserCerts(address);
  } catch(err) {
    console.error(err);
    return;
  }
  for (let i = 0; i < userCerts.length; i++) {
    getImageOnIpfs(userCerts[i].certificate.image).then(imageUrl => {
      userCerts[i].certificate.imageUrl = imageUrl;
      dispatch({
        type: "FETCHED_CERTIFICATES",
        payload: userCerts,
      });
    });
  }
  dispatch({
    type: "FETCHED_CERTIFICATES",
    payload: userCerts,
  });
}

const fetchGroups = () => async (dispatch, getState) => {
  let gxCert;
  try {
    gxCert = getGxCert();
  } catch(err) {
    console.error(err);
    return;
  }
  const state = getState().state;
  const address = state.from;
  let groups;
  try {
    groups = await gxCert.getGroups(address);
  } catch(err) {
    console.error(err);
    return;
  }
  dispatch({
    type: "FETCHED_GROUPS",
    payload: groups,
  });
}

const signIn = () => async (dispatch) => {
  const gxCert = await getGxCert();
  if (!gxCert.address) {
    console.log("Failed to login.");
    return;
  }
  console.log(gxCert.address);
  dispatch({
    type: "LOGGED_IN",
    payload: gxCert.address,
  });
  let profile;
  try {
    profile = await gxCert.getProfile(gxCert.address);
  } catch(err) {
    console.error(err);
    history.push("/profile/new");
    return;
  }

  history.push("/");
}

const fetchGroup = (groupId) => async (dispatch, getState) => {
  dispatch({
    type: "FETCHED_GROUP",
    payload: null,
  });
  let gxCert;
  try {
    gxCert = await getGxCertWithoutLogin();
  } catch(err) {
    console.error(err);
    return;
  }
  let group;
  try {
    group = await gxCert.getGroup(groupId);
  } catch(err) {
    console.error(err);
    return;
  }
  dispatch({
    type: "FETCHED_GROUP",
    payload: group,
  });
  for (let i = 0; i < group.members.length; i++) {
    getImageOnIpfs(group.members[i].icon).then(imageUrl => {
      group.members[i].imageUrl = imageUrl;
      dispatch({
        type: "FETCHED_GROUP",
        payload: group,
      });
    }).catch(err => {

    });
  }
}
const fetchGroupInEdit = (groupId) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_GROUP_ID_IN_EDIT",
    payload: groupId,
  });
  dispatch({
    type: "FETCHED_GROUP_IN_EDIT",
    payload: null,
  });
  let gxCert;
  try {
    gxCert = await getGxCertWithoutLogin();
  } catch(err) {
    console.error(err);
    return;
  }


  const state = getState().state;
  let group;
  try {
    group = await gxCert.getGroup(groupId);
  } catch(err) {
    console.error(err);
    return;
  }
  dispatch({
    type: "FETCHED_GROUP_IN_EDIT",
    payload: group,
  });
}
const fetchProfileInEdit = () => async (dispatch, getState) => {
  dispatch({
    type: "FETCHED_PROFILE_IN_EDIT",
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
    profile = await gxCert.getProfile(gxCert.address);
  } catch(err) {
    console.error(err);
    alert("Failed to fetch profile.");
    return;
  }
  dispatch({
    type: "FETCHED_PROFILE_IN_EDIT",
    payload: profile,
  });
  dispatch({
    type: "ON_CHANGE_PROFILE_NAME_IN_EDIT",
    payload: profile.name,
  });
  dispatch({
    type: "ON_CHANGE_PROFILE_NAME_IN_EDIT",
    payload: profile.email,
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
  const address = gxCert.address;
  let groups;
  try {
    groups = await gxCert.getGroups(address);
  } catch(err) {
    console.error(err);
    alert("Failed to fetch your groups");
    return;
  }
  let certificates = [];
  for (const group of groups) {
    const groupId = group.groupId;
    try {
      certificates = certificates.concat(await gxCert.getGroupCerts(groupId));
    } catch(err) {
      console.error(err);
      continue;
    }
  }
  dispatch({
    type: "FETCHED_CERTIFICATES_IN_ISSUER",
    payload: certificates,
  });
  for (let i = 0; i < certificates.length; i++) {
    getImageOnIpfs(certificates[i].image).then(imageUrl => {
      certificates[i].imageUrl = imageUrl;
      dispatch({
        type: "FETCHED_CERTIFICATES_IN_ISSUER",
        payload: certificates,
      });
    }).catch(err => {
      console.error(err);
    });
  }
}

const sign = () => async (dispatch, getState) => {
  let gxCert;
  try {
    gxCert = await getGxCert();
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
  const certificate = {
    context: {},
    title: state.title,
    description: state.description,
    image: imageCid,
    groupId: state.groupId,
  }
  if (!gxCert.isCertificate(certificate)) {
    alert("Invalid Certificate.");
    return;
  }
  let signed = null;
  try {
    signed = await gxCert.signCertificate(certificate, { address: gxCert.address });
  } catch(err) {
    console.error(err);
    alert("Failed to sign the certificate.");
    return;
  }
  try {
    await gxCert.createCert(signed);
  } catch(err) {
    console.error(err);
    alert("Failed to post the signed certificate.");
    return;
  }

  history.push("/issue");
}

const registerProfile = () => async (dispatch, getState) => {
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch(err) {
    console.error(err);
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
    return;
  }
  let signedProfile;
  try {
    signedProfile = await gxCert.signProfile({
      name,
      email,
      icon,
    }, { 
      address,
    });
  } catch(err) {
    console.error(err);
    alert("Failed to sign profile.");
    return;
  }
  try {
    await gxCert.createProfile(address, signedProfile);
  } catch(err) {
    console.error(err);
    alert("Failed to register profile.");
    return;
  }
  history.push("/");

}
const registerGroup = () => async (dispatch, getState) => {
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch(err) {
    console.error(err);
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
    return;
  }
  history.push("/new");
}
const updateProfile = () => async (dispatch, getState) => {
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch(err) {
    console.error(err);
    return;
  }
  const state = getState().state;
  const name = state.profileNameInEdit;
  const email = state.profileEmailInEdit;
  const icon = state.profileImageInEdit;
  const address = gxCert.address;

  const newProfile = {
    name,
    email,
    icon,
  }

  const signedProfile = await gxCert.signProfileForUpdating(newProfile, { address });
  try {
    await gxCert.updateProfile(signedProfile);
  } catch(err) {
    console.error(err);
    alert("Failed to update your profile.");
    return;
  }
  history.push("/");
}
const updateGroup = () => async (dispatch, getState) => {
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch(err) {
    console.error(err);
    return;
  }
  const state = getState().state;
  const groupId = state.groupIdInEdit;
  const name = state.groupNameInEdit;
  const residence = state.groupAddressInEdit;
  const phone = state.groupPhoneInEdit;
  const group = {
    groupId,
    name,
    residence,
    phone,
  }

  const signedGroup = await gxCert.signGroup(group, { address: gxCert.address });
  try {
    await gxCert.updateGroup(signedGroup);
  } catch(err) {
    console.error(err);
    alert("Failed to update group.");
    return;
  }
  history.push("/");
}
const issue = (certId) => async (dispatch, getState) => {
  let gxCert;
  try {
    gxCert = await getGxCert();
  } catch(err) {
    console.error(err);
    return;
  }
  const state = getState().state;
  const from = state.from;
  const signerAddress = state.from;
  const toEmail = state.toInIssue;
  let to;
  try {
    to = await torusClient.getPublicAddressByGoogle(toEmail);
  } catch(err) {
    console.error(err);
    alert("Failed to get public address of the Google account.");
    return;
  }
  const userCert = {
    certId,
    from,
    to,
  }
  let signed;
  try {
    signed = await gxCert.signUserCertificate(userCert, { address: from });
  } catch(err) {
    console.error(err);
    alert("Failed to sign the certificate.");
    return;
  }
  try {
    await gxCert.createUserCert(signed);
  } catch(err) {
    console.error(err);
    alert("Failed to issue the certificate.");
    return;
  }
  history.push("/");
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
  const groupId = state.group.groupId;
  const email = state.group.emailToInvite;
  let address;
  try {
    address = await torusClient.getPublicAddressByGoogle(email);
  } catch(err) {
    console.error(err);
    alert("Email is not registered.");
    return;
  }
  let signedMember;
  try {
    signedMember = await gxCert.signMemberAddress(address, { address: signerAddress });
  } catch(err) {
    console.error(err);
    alert("Failed to sign for invitation.");
    return;
  }
  try {
    await gxCert.inviteMemberToGroup(groupId, signedMember);
  } catch(err) {
    console.error(err);
    alert("Failed to send invitation.");
    return;
  }
  let group;
  try {
    group = await gxCert.getGroup(groupId);
  } catch(err) {
    console.error(err);
    return;
  }
  dispatch({
    type: "FETCHED_GROUP",
    payload: group,
  });
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
  sign,
  signIn,
  fetchProfileInEdit,
  fetchCertificate,
  fetchCertificateInIssue,
  fetchCertificates,
  fetchGroups,
  fetchGroup,
  fetchGroupInEdit,
  fetchCertificatesInIssuer,
  registerGroup,
  registerProfile,
  inviteMember,
  issue,
  updateGroup,
  updateProfile,

};
