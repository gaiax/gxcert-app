import { getGxCert } from "../gxcert-client";
import torusClient from "../torus";
import history from "../history";
import QRCode from "qrcode";
import config from "../config";

import { fetchCertificatesInIssuer } from "./fetch";
const onChangeGroupInSidebar = (evt) => async (dispatch, getState) => {
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
};
const onChangeTitle = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_TITLE",
    payload: evt.target.value,
  });
};
const onChangeDescription = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_DESCRIPTION",
    payload: evt.target.value,
  });
};
const onChangeImage = (evt) => async (dispatch, getState) => {
  const file = evt.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    dispatch({
      type: "ON_CHANGE_IMAGE",
      payload: reader.result,
    });
  };
  reader.readAsArrayBuffer(file);
};
const onChangeGroup = (evt) => async (dispatch, getState) => {
  if (evt.target.value === "new") {
    history.push("/group/new");
    return;
  }
  dispatch({
    type: "ON_CHANGE_GROUP",
    payload: parseInt(evt.target.value),
  });
};

const onChangeToInIssue = (evt) => async (dispatch) => {
  dispatch({
    type: "ON_CHANGE_TO_IN_ISSUE",
    payload: evt.target.value,
  });
};

const onChangeGroupNameInEdit = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_GROUP_NAME_IN_EDIT",
    payload: evt.target.value,
  });
};
const onChangeGroupAddressInEdit = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_GROUP_ADDRESS_IN_EDIT",
    payload: evt.target.value,
  });
};
const onChangeGroupPhoneInEdit = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_GROUP_PHONE_IN_EDIT",
    payload: evt.target.value,
  });
};

const onChangeGroupName = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_GROUP_NAME",
    payload: evt.target.value,
  });
};

const onChangeGroupAddress = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_GROUP_ADDRESS",
    payload: evt.target.value,
  });
};
const onChangeGroupPhone = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_GROUP_PHONE",
    payload: evt.target.value,
  });
};

const onChangeProfileName = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_PROFILE_NAME",
    payload: evt.target.value,
  });
};

const onChangeProfileEmail = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_PROFILE_EMAIL",
    payload: evt.target.value,
  });
};

const onChangeProfileImage = (evt) => async (dispatch, getState) => {
  const file = evt.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    dispatch({
      type: "ON_CHANGE_PROFILE_IMAGE",
      payload: reader.result,
    });
  };
  reader.readAsArrayBuffer(file);
};
const onChangeProfileNameInEdit = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_PROFILE_NAME_IN_EDIT",
    payload: evt.target.value,
  });
};

const onChangeProfileEmailInEdit = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_PROFILE_EMAIL_IN_EDIT",
    payload: evt.target.value,
  });
};

const onChangeProfileImageInEdit = (evt) => async (dispatch, getState) => {
  const file = evt.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    dispatch({
      type: "ON_CHANGE_PROFILE_IMAGE_IN_EDIT",
      payload: reader.result,
    });
  };
  reader.readAsArrayBuffer(file);
};

const onChangeGroupMemberToInvite = (evt) => async (dispatch, getState) => {
  dispatch({
    type: "ON_CHANGE_GROUP_MEMBER_TO_INVITE",
    payload: evt.target.value,
  });
};
const onChangeToList = (values) => async (dispatch) => {
  dispatch({
    type: "ON_CHANGE_TO_LIST",
    payload: values,
  });
};

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
  onChangeToList,
};
