import initialState from "./initialState";
import validation from "./validation";

export default function Reducer(state = initialState, action) {
  const groupInSidebar = state.groupInSidebar;
  const profileInEdit = state.profileInEdit;
  let status = "valid";
  switch (action.type) {
    case "ON_CHANGE_TITLE":
      if (
        action.payload.length > validation.certificateTitle
        ||
        action.payload.length === 0
      ) {
        status = "invalid";
      }
      return Object.assign({}, state, {
        title: action.payload,
        titleValidation: {
          status,
          message: action.payload.length + " / " + validation.certificateTitle,
        }
      });
    case "ON_CHANGE_DESCRIPTION":
      if (
        action.payload.length > validation.certificateDescription
        ||
        action.payload.length === 0
      ) {
        status = "invalid";
      }
      return Object.assign({}, state, {
        description: action.payload,
        descriptionValidation: {
          status,
          message: action.payload.length + " / " + validation.certificateDescription,
        }
      });
    case "ON_CHANGE_IMAGE":
      return Object.assign({}, state, {
        image: action.payload,
      });
    case "ON_CHANGE_GROUP":
      return Object.assign({}, state, {
        groupId: action.payload,
      });
    case "ON_CHANGE_GROUP_NAME":
      if (
        action.payload.length > validation.groupName
        ||
        action.payload.length === 0
      ) {
        status = "invalid";
      }
      return Object.assign({}, state, {
        groupName: action.payload,
        groupNameValidation: {
          status,
          message: action.payload.length + " / " + validation.groupName,
        }
      });
    case "ON_CHANGE_GROUP_ADDRESS":
      if (
        action.payload.length > validation.groupAddress
        ||
        action.payload.length === 0
      ) {
        status = "invalid";
      }
      return Object.assign({}, state, {
        groupAddress: action.payload,
        groupAddressValidation: {
          status,
          message: action.payload.length + " / " + validation.groupAddress,
        }
      });
    case "ON_CHANGE_GROUP_IN_SIDEBAR":
      return Object.assign({}, state, {
        groupInSidebar: action.payload,
        groupNameInEdit: action.payload.name,
        groupAddressInEdit: action.payload.residence,
        groupPhoneInEdit: action.payload.phone,
      });
    case "ON_CHANGE_GROUP_PHONE":
      if (
        action.payload.length > validation.groupPhone
        ||
        action.payload.length === 0
      ) {
        status = "invalid";
      }
      if (!validation.onlyNumbers(action.payload)) {
        status = "invalid";
      }
      return Object.assign({}, state, {
        groupPhone: action.payload,
        groupPhoneValidation: {
          status,
          message: action.payload.length + " / " + validation.groupPhone,
        }
      });
    case "ON_CHANGE_GROUP_MEMBER_TO_INVITE":
      return Object.assign({}, state, {
        groupMemberToInvite: action.payload,
      });
    case "ON_CHANGE_GROUP_ID_IN_EDIT":
      return Object.assign({}, state, {
        groupIdInEdit: action.payload,
      });
    case "ON_CHANGE_GROUP_NAME_IN_EDIT":
      if (
        action.payload.length > validation.groupName
        ||
        action.payload.length === 0
      ) {
        status = "invalid";
      }
      groupInSidebar.name = action.payload;

      return Object.assign({}, state, {
        groupInSidebar,
        groupNameValidationInEdit: {
          status,
          message: action.payload.length + " / " + validation.groupName,
        }
      });
    case "ON_CHANGE_GROUP_ADDRESS_IN_EDIT":
      if (
        action.payload.length > validation.groupAddress
        ||
        action.payload.length === 0
      ) {
        status = "invalid";
      }
      groupInSidebar.residence = action.payload;
      return Object.assign({}, state, {
        groupInSidebar,
        groupAddressValidationInEdit: {
          status,
          message: action.payload.length + " / " + validation.groupAddress,
        }
      });
    case "ON_CHANGE_GROUP_PHONE_IN_EDIT":
      if (
        action.payload.length > validation.groupPhone
        ||
        action.payload.length === 0
      ) {
        status = "invalid";
      }
      if (!validation.onlyNumbers(action.payload)) {
        status = "invalid";
      }
      groupInSidebar.phone = action.payload;
      return Object.assign({}, state, {
        groupInSidebar,
        groupPhoneValidationInEdit: {
          status,
          message: action.payload.length + " / " + validation.groupPhone,
        }
      });
    case "ON_CHANGE_PROFILE_NAME":
      if (
        action.payload.length > validation.profileName
        ||
        action.payload.length === 0
      ) {
        status = "invalid";
      }
      return Object.assign({}, state, {
        profileName: action.payload,
        profileNameValidation: {
          status,
          message: action.payload.length + " / " + validation.profileName,
        }
      });
    case "ON_CHANGE_PROFILE_IMAGE":
      return Object.assign({}, state, {
        profileImage: action.payload,
      });
    case "ON_CHANGE_PROFILE_NAME_IN_EDIT":
      if (
        action.payload.length > validation.profileName
        ||
        action.payload.length === 0
      ) {
        status = "invalid";
      }
      profileInEdit.name = action.payload;
      return Object.assign({}, state, {
        profileInEdit,
        profileNameValidationInEdit: {
          status,
          message: action.payload.length + " / " + validation.profileName,
        }
      });
    case "ON_CHANGE_PROFILE_IMAGE_IN_EDIT":
      profileInEdit.icon = action.payload;
      return Object.assign({}, state, {
        profileInEdit,
      });
    case "ON_CHANGE_TO_IN_ISSUE":
      return Object.assign({}, state, {
        toInIssue: action.payload,
      });
    case "LOGGED_IN":
      return Object.assign({}, state, {
        from: action.payload,
      });
    case "FETCHED_USER_CERTIFICATE":
      return Object.assign({}, state, {
        userCert: action.payload,
      });
    case "LOADING_IN_SHOW":
      return Object.assign({}, state, {
        isLoadingInShow: action.payload,
      });
    case "FETCHED_CERTIFICATE_IN_ISSUE":
      return Object.assign({}, state, {
        certificateInIssue: action.payload,
      });
    case "FETCHED_USER_CERTIFICATES":
      return Object.assign({}, state, {
        userCerts: action.payload,
      });
    case "FETCHED_CERTIFICATE_IMAGE":
      return Object.assign({}, state, {
        certificateImage: action.payload,
      });
    case "FETCHED_GROUPS_IN_SIDEBAR":
      return Object.assign({}, state, {
        groupsInSidebar: action.payload,
      });
    case "FETCHED_GROUP_IN_EDIT":
      return Object.assign({}, state, {
        groupInEdit: action.payload,
      });
    case "FETCHED_CERTIFICATES_IN_ISSUER":
      return Object.assign({}, state, {
        certificatesInIssuer: action.payload,
      });
    case "FETCHED_PROFILE_IN_EDIT":
      return Object.assign({}, state, {
        profileInEdit: action.payload,
      });
    case "FETCHED_PROFILE_IN_SHOW":
      return Object.assign({}, state, {
        profileInShow: action.payload,
      });
    case "FETCHED_GROUP_IN_SHOW":
      return Object.assign({}, state, {
        groupInShow: action.payload,
      });
    case "LOADING":
      return Object.assign({}, state, {
        isLoading: action.payload,
      });
    case "ON_CHANGE_TO_LIST":
      return Object.assign({}, state, {
        toList: action.payload,
      });
    case "ADD_TO":
      return Object.assign({}, state, {
        usersToIssue: action.payload,
      });
    case "MY_PROFILE":
      return Object.assign({}, state, {
        myProfile: action.payload,
      });
    case "SET_TO_COUNT_IN_ISSUE":
      return Object.assign({}, state, {
        toCountInIssue: action.payload,
      });
    case "UPDATE_PROFILE_CACHE":
      return Object.assign({}, state, {
        profileCache: action.payload,
      });
    case "UPDATE_USER_CERT_CACHE":
      return Object.assign({}, state, {
        userCertCache: action.payload,
      });
    case "UPDATE_RECEIVED_USER_CERT_CACHE":
      return Object.assign({}, state, {
        receivedUserCertCache: action.payload,
      });
    case "UPDATE_ISSUED_USER_CERT_CACHE":
      return Object.assign({}, state, {
        issuedUserCertCache: action.payload,
      });
    case "UPDATE_IMAGE_CACHE":
      return Object.assign({}, state, {
        imageCache: action.payload,
      });
    case "UPDATE_GROUP_CERT_CACHE":
      return Object.assign({}, state, {
        groupCertCache: action.payload,
      });
    case "UPDATE_GROUP_CACHE":
      return Object.assign({}, state, {
        groupCache: action.payload,
      });
    case "MODAL":
      return Object.assign({}, state, {
        modalMessage: action.payload,
      });
    case "MODAL_LINK":
      return Object.assign({}, state, {
        modalLink: action.payload.link,
        modalLinkText: action.payload.text,
      });
    case "SIGN_OUT":
      return initialState;
    default:
      return state;
  }
}
