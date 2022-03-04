const initialState = {
  from: "",
  to: "",
  title: "",
  titleValidation: {
    status: "invalid",
    message: "0 / 50"
  },
  description: "",
  descriptionValidation: {
    status: "invalid",
    message: "0 / 200"
  },
  image: null,
  toInIssue: "",
  isLoading: false,
  isLoadingInShow: false,
  groupId: null,
  groupInEdit: null,
  groupName: "",
  groupNameValidation: {
    status: "invalid",
    message: "0 / 50",
  },
  groupMemberToInvite: "",
  groupAddress: "",
  groupAddressValidation: {
    status: "invalid",
    message: "0 / 100",
  },
  groupPhone: "",
  groupPhoneValidation: {
    status: "invalid",
    message: "0 / 11",
  },
  groupIdInEdit: "",
  groupInShow: null,
  groupNameInEdit: "",
  groupNameValidationInEdit: {
    status: "invalid",
    message: "0 / 50",
  },
  groupAddressInEdit: "",
  groupAddressValidationInEdit: {
    status: "invalid",
    message: "0 / 100",
  },
  groupPhoneInEdit: "",
  groupPhoneValidationInEdit: {
    status: "invalid",
    message: "0 / 11",
  },
  groupInIssuer: null,
  groupInSidebar: null,
  groupsInSidebar: [],
  userCert: {},
  certificateImage: "",
  userCerts: [],
  certificatesInIssuer: [],
  certificateInIssue: null,
  profileInEdit: {},
  profileInShow: null,
  profileName: "",
  profileNameValidation: {
    status: "invalid",
    message: "0 / 20",
  },
  profileImage: "",
  profileNameValidationInEdit: {
    status: "invalid",
    message: "0 / 20",
  },
  imageCache: {},
  profileCache: {},
  usersToIssue: [],
  toList: [],
  myProfile: null,
  modalMessage: null,
  modalLink: null,
  modalLinkText: null,
};

export default initialState;
