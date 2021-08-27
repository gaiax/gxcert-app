import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from 'redux-persist/integration/react'
import { connect, Provider } from "react-redux";
import store, { persistor } from "./store";
import { withRouter, HashRouter as Router } from "react-router-dom";
import history from "./history";
import {
  onChangeTitle,
  onChangeDescription,
  onChangeUrl,
  onChangeFrom,
  onChangeTo,
  onChangeImage,
  onChangeGroupName,
  onChangeGroupAddress,
  onChangeGroupPhone,
  onChangeGroup,
  onChangeProfileName,
  onChangeProfileEmail,
  onChangeProfileImage,
  sign,
  signIn,
  loggedIn,
  fetchCertificate,
  fetchCertificates,
  fetchCertificateImage,
  registerGroup,
  registerProfile,
} from "./actions";
//import CertClient from "./client"

function mapStateToProps(state, props) {
  return state;
}

function mapDispatchToProps(dispatch, props) {
  return {
    onChangeTitle: (evt) => {
      dispatch(onChangeTitle(evt));
    },
    onChangeDescription: (evt) => {
      dispatch(onChangeDescription(evt));
    },
    onChangeUrl: (evt) => {
      dispatch(onChangeUrl(evt));
    },
    onChangeFrom: (evt) => {
      dispatch(onChangeFrom(evt));
    },
    onChangeTo: (evt) => {
      dispatch(onChangeTo(evt));
    },
    onChangeImage: (evt) => {
      dispatch(onChangeImage(evt));
    },
    onChangeGroupName: (evt) => {
      dispatch(onChangeGroupName(evt));
    },
    onChangeGroupAddress: (evt) => {
      dispatch(onChangeGroupAddress(evt));
    },
    onChangeGroupPhone: (evt) => {
      dispatch(onChangeGroupPhone(evt));
    },
    onChangeGroup: (evt) => {
      dispatch(onChangeGroup(evt));
    },
    onChangeProfileName: (evt) => {
      dispatch(onChangeProfileName(evt));
    },
    onChangeProfileEmail: (evt) => {
      dispatch(onChangeProfileEmail(evt));
    },
    onChangeProfileImage: (evt) => {
      dispatch(onChangeProfileImage(evt));
    },
    sign: () => {
      dispatch(sign());
    },
    loggedIn: (address) => {
      dispatch(loggedIn(address));
    },
    fetchCertificate: (cid) => {
      dispatch(fetchCertificate(cid));
    },
    fetchCertificates: () => {
      dispatch(fetchCertificates());
    },
    fetchCertificateImage: (cid) => {
      dispatch(fetchCertificateImage(cid));
    },
    signIn: () => {
      dispatch(signIn());
    },
    registerGroup: () => {
      dispatch(registerGroup());
    },
    registerProfile: () => {
      dispatch(registerProfile());
    }
  }
}

const RxApp = connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <RxApp />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
