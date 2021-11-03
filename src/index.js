import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { connect, Provider } from "react-redux";
import { withRouter, HashRouter as Router } from "react-router-dom";
import store from "./store";
import history from "./history";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import actions from "./actions";

const options = {
  position: "bottom right",
  timeout: 5000,
  offset: "30px",
  transition: "fade",
}
//import CertClient from "./client"

function mapStateToProps(state, props) {
  return state;
}

function mapDispatchToProps(dispatch, props) {
  return {
    onChangeTitle: (evt) => {
      dispatch(actions.onChangeTitle(evt));
    },
    onChangeDescription: (evt) => {
      dispatch(actions.onChangeDescription(evt));
    },
    onChangeImage: (evt) => {
      dispatch(actions.onChangeImage(evt));
    },
    onChangeGroupName: (evt) => {
      dispatch(actions.onChangeGroupName(evt));
    },
    onChangeGroupAddress: (evt) => {
      dispatch(actions.onChangeGroupAddress(evt));
    },
    onChangeGroupPhone: (evt) => {
      dispatch(actions.onChangeGroupPhone(evt));
    },
    onChangeGroupNameInEdit: (evt) => {
      dispatch(actions.onChangeGroupNameInEdit(evt));
    },
    onChangeGroupAddressInEdit: (evt) => {
      dispatch(actions.onChangeGroupAddressInEdit(evt));
    },
    onChangeGroupPhoneInEdit: (evt) => {
      dispatch(actions.onChangeGroupPhoneInEdit(evt));
    },
    onChangeProfileName: (evt) => {
      dispatch(actions.onChangeProfileName(evt));
    },
    onChangeProfileEmail: (evt) => {
      dispatch(actions.onChangeProfileEmail(evt));
    },
    onChangeProfileImage: (evt) => {
      dispatch(actions.onChangeProfileImage(evt));
    },
    onChangeProfileNameInEdit: (evt) => {
      dispatch(actions.onChangeProfileNameInEdit(evt));
    },
    onChangeProfileEmailInEdit: (evt) => {
      dispatch(actions.onChangeProfileEmailInEdit(evt));
    },
    onChangeProfileImageInEdit: (evt) => {
      dispatch(actions.onChangeProfileImageInEdit(evt));
    },
    onChangeGroup: (evt) => {
      dispatch(actions.onChangeGroup(evt));
    },
    onChangeToInIssue: (evt) => {
      dispatch(actions.onChangeToInIssue(evt));
    },
    onChangeGroupMemberToInvite: (evt) => {
      dispatch(actions.onChangeGroupMemberToInvite(evt));
    },
    onChangeGroupInSidebar: (evt) => {
      dispatch(actions.onChangeGroupInSidebar(evt));
    },
    sign: () => {
      dispatch(actions.sign());
    },
    fetchCertificate: (cid) => {
      dispatch(actions.fetchCertificate(cid));
    },
    fetchCertificates: () => {
      dispatch(actions.fetchCertificates());
    },
    fetchGroupInShow: (groupId) => {
      dispatch(actions.fetchGroupInShow(groupId));
    },
    fetchCertificatesInIssuer: () => {
      dispatch(actions.fetchCertificatesInIssuer());
    },
    fetchCertificateInIssue: (certId) => {
      dispatch(actions.fetchCertificateInIssue(certId));
    },
    fetchGroupsInSidebar: () => {
      dispatch(actions.fetchGroupsInSidebar());
    },
    fetchProfileInShow: (address) => {
      dispatch(actions.fetchProfileInShow(address));
    },
    fetchProfile: () => {
      dispatch(actions.fetchProfile());
    },
    signIn: () => {
      dispatch(actions.signIn());
    },
    registerGroup: () => {
      dispatch(actions.registerGroup());
    },
    updateGroup: () => {
      dispatch(actions.updateGroup());
    },
    updateProfile: () => {
      dispatch(actions.updateProfile());
    },
    registerProfile: () => {
      dispatch(actions.registerProfile());
    },
    inviteMember: () => {
      dispatch(actions.inviteMember());
    },
    issue: (certId) => {
      dispatch(actions.issue(certId));
    },
    disableGroupMember: (groupId, address) => {
      dispatch(actions.disableGroupMember(groupId, address));
    },
    invalidateUserCert: (userCertId) => {
      dispatch(actions.invalidateUserCert(userCertId));
    },
    signOut: () => {
      dispatch(actions.signOut());
    },
    addTo: () => {
      dispatch(actions.addTo());
    },
    removeUserInIssue: (address) => {
      dispatch(actions.removeUserInIssue(address));
    },
    openModal: (message, link) => {
      dispatch(actions.openModal(message, link));
    },
    closeModal: () => {
      dispatch(actions.closeModal());
    },
  }
}

const RxApp = connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

ReactDOM.render(
  <Provider store={store}>
      <Router history={history}>
        <AlertProvider template={AlertTemplate} {...options}>
          <RxApp />
        </AlertProvider>
      </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
