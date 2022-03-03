import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Top from "./views/Top";
import SignIn from "./views/SignIn";
import Certificates from "./views/Certificates";
import Certificate from "./views/Certificate";
import NewCert from "./views/NewCert";
import NewProfile from "./views/NewProfile";
import EditProfile from "./views/EditProfile";
import NewGroup from "./views/NewGroup";
import EditGroup from "./views/EditGroup";
import GroupMembers from "./views/GroupMembers";
import Issuer from "./views/Issuer";
import Issue from "./views/Issue";
import Loading from "./Loading";
import Group from "./views/Group";
import NotFound from "./views/NotFound";
import Donation from "./views/Donation";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { withAlert } from "react-alert";
import GxModal from "./Modal";

class App extends React.Component {
  render() {
    const that = this;
    return (
      <div className="App">
        <Header
          isLoggedIn={
            that.props.state.from !== "" && that.props.state.myProfile !== null
          }
          signOut={that.props.signOut}
        ></Header>
        <Switch>
          <Route
            exact={true}
            path="/"
            render={(routeProps) => {
              if (that.props.state.from === "") {
                return <Top />;
              }
              return (
                <Certificates
                  {...routeProps}
                  userCerts={that.props.state.userCerts}
                  fetchCertificates={that.props.fetchCertificates}
                />
              );
            }}
          />
          <Route
            exact={true}
            path="/donate"
            render={(routeProps) => <Donation alert={that.props.alert} />}
          />
          <Route
            exact={true}
            path="/top"
            render={(routeProps) => {
              window.location.href = "/#/";
              return <Top />;
            }}
          />
          <Route
            exact={true}
            path="/signup"
            render={(routeProps) => (
              <SignIn {...routeProps} signIn={that.props.signIn} />
            )}
          />
          <Route
            exact={true}
            path="/new/"
            render={() => (
              <NewCert
                fetchGroupsInSidebar={that.props.fetchGroupsInSidebar}
                groupsInSidebar={that.props.state.groupsInSidebar}
                groupInSidebar={that.props.state.groupInSidebar}
                titleValidation={that.props.state.titleValidation}
                descriptionValidation={that.props.state.descriptionValidation}
                onChangeGroupInSidebar={that.props.onChangeGroupInSidebar}
                onChangeTitle={that.props.onChangeTitle}
                onChangeDescription={that.props.onChangeDescription}
                onChangeImage={that.props.onChangeImage}
                onChangeGroup={that.props.onChangeGroup}
                sign={that.props.sign}
                from={that.props.state.from}
                title={that.props.state.title}
                description={that.props.state.description}
                image={that.props.state.image}
                groups={that.props.state.groups}
              />
            )}
          />
          <Route
            exact={true}
            path="/issue/"
            render={(routeProps) => (
              <Issuer
                {...routeProps}
                fetchGroupsInSidebar={that.props.fetchGroupsInSidebar}
                groupsInSidebar={that.props.state.groupsInSidebar}
                groupInSidebar={that.props.state.groupInSidebar}
                onChangeGroupInSidebar={that.props.onChangeGroupInSidebar}
                groups={that.props.state.groupsInIssuer}
                certificates={that.props.state.certificatesInIssuer}
                fetchCertificates={that.props.fetchCertificatesInIssuer}
                issue={that.props.issue}
                invalidateUserCert={that.props.invalidateUserCert}
              />
            )}
          />
          <Route
            exact={true}
            path="/issue/:certId"
            render={(routeProps) => (
              <Issue
                {...routeProps}
                fetchGroupsInSidebar={that.props.fetchGroupsInSidebar}
                groupsInSidebar={that.props.state.groupsInSidebar}
                groupInSidebar={that.props.state.groupInSidebar}
                onChangeGroupInSidebar={that.props.onChangeGroupInSidebar}
                certificate={that.props.state.certificateInIssue}
                fetchCertificate={that.props.fetchCertificateInIssue}
                usersToIssue={that.props.state.usersToIssue}
                removeUserInIssue={that.props.removeUserInIssue}
                onChangeToInIssue={that.props.onChangeToInIssue}
                issue={that.props.issue}
                addTo={that.props.addTo}
              />
            )}
          />
          <Route
            exact={true}
            path="/certs/:id"
            render={(routeProps) => (
              <Certificate
                {...routeProps}
                alert={that.props.alert}
                userCert={that.props.state.userCert}
                certificateImage={that.props.state.certificateImage}
                fetchCertificate={that.props.fetchCertificate}
                isLoading={that.props.state.isLoadingInShow}
              />
            )}
          />
          <Route
            exact={true}
            path="/group/new"
            render={(routeProps) => (
              <NewGroup
                {...routeProps}
                registerGroup={that.props.registerGroup}
                onChangeGroupName={that.props.onChangeGroupName}
                onChangeGroupAddress={that.props.onChangeGroupAddress}
                onChangeGroupPhone={that.props.onChangeGroupPhone}
                groupName={that.props.state.groupName}
                groupAddress={that.props.state.groupAddress}
                groupPhone={that.props.state.groupPhone}
                groupNameValidation={that.props.state.groupNameValidation}
                groupAddressValidation={that.props.state.groupAddressValidation}
                groupPhoneValidation={that.props.state.groupPhoneValidation}
              />
            )}
          />
          <Route
            exact={true}
            path="/group/edit"
            render={(routeProps) => (
              <EditGroup
                {...routeProps}
                fetchGroupsInSidebar={that.props.fetchGroupsInSidebar}
                groupsInSidebar={that.props.state.groupsInSidebar}
                groupInSidebar={that.props.state.groupInSidebar}
                onChangeGroupInSidebar={that.props.onChangeGroupInSidebar}
                group={that.props.state.groupInEdit}
                updateGroup={that.props.updateGroup}
                onChangeGroupId={that.props.onChangeGroupIdInEdit}
                onChangeGroupName={that.props.onChangeGroupNameInEdit}
                onChangeGroupAddress={that.props.onChangeGroupAddressInEdit}
                onChangeGroupPhone={that.props.onChangeGroupPhoneInEdit}
                groupNameValidation={that.props.state.groupNameValidationInEdit}
                groupAddressValidation={that.props.state.groupAddressValidationInEdit}
                groupPhoneValidation={that.props.state.groupPhoneValidationInEdit}

              />
            )}
          />
          <Route
            exact={true}
            path="/group"
            render={(routeProps) => (
              <GroupMembers
                {...routeProps}
                fetchGroupsInSidebar={that.props.fetchGroupsInSidebar}
                groupsInSidebar={that.props.state.groupsInSidebar}
                groupInSidebar={that.props.state.groupInSidebar}
                onChangeGroupInSidebar={that.props.onChangeGroupInSidebar}
                group={that.props.state.group}
                address={that.props.state.from}
                fetchGroup={that.props.fetchGroup}
                inviteMember={that.props.inviteMember}
                onChangeGroupMemberToInvite={
                  that.props.onChangeGroupMemberToInvite
                }
                disableGroupMember={that.props.disableGroupMember}
              />
            )}
          />
          <Route
            exact={true}
            path="/group/:groupId"
            render={(routeProps) => (
              <Group
                {...routeProps}
                group={that.props.state.groupInShow}
                fetchGroup={that.props.fetchGroupInShow}
              />
            )}
          />
          <Route
            exact={true}
            path="/profile/new"
            render={(routeProps) => (
              <NewProfile
                {...routeProps}
                image={that.props.state.profileImage}
                registerProfile={that.props.registerProfile}
                onChangeProfileName={that.props.onChangeProfileName}
                onChangeProfileImage={that.props.onChangeProfileImage}
              />
            )}
          />
          <Route
            exact={true}
            path="/profile/edit"
            render={(routeProps) => (
              <EditProfile
                {...routeProps}
                updateProfile={that.props.updateProfile}
                profile={that.props.state.profileInEdit}
                onChangeProfileName={that.props.onChangeProfileNameInEdit}
                onChangeProfileImage={that.props.onChangeProfileImageInEdit}
                fetchProfile={that.props.fetchProfile}
              />
            )}
          />
          <Route component={NotFound} />
        </Switch>
        <Footer />
        {this.props.state.isLoading && !this.props.state.modalMessage && (
          <Loading />
        )}
        {(this.props.state.modalMessage || (this.props.state.modalLinkText && this.props.state.modalLink)) && (
          <GxModal
            isOpen={true}
            message={this.props.state.modalMessage}
            link={this.props.state.modalLink}
            linkText={this.props.state.modalLinkText}
            closeModal={this.props.closeModal}
          />
        )}
        <div></div>
      </div>
    );
  }
}

export default withAlert()(App);
