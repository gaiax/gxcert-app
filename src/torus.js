import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";
import config from "./config";

class TorusClient {
  constructor() {
    this.torus = new Torus();
    this.progress = false;
  }
  async init() {
    if (this.torus.isInitialized || this.progress) {
      return;
    }
    this.progress = true;
    try {
      await this.torus.init({
        buildEnv: "production",
        enableLogging: true,
        network: config.network,
        showTorusButton: true,
        loginConfig: {
          "google": {
            showOnModal: true, // whether to show or not
            mainOption: true, // big button
            showOnDesktop: true, // desktop only
            showOnMobile: true, // mobile only
          },
          "torus-auth0-twitter": {
            showOnModal: true,
            mainOption: false,
            showOnDesktop: true,
            showOnMobile: true,
          },
          "facebook": {
            showOnModal: false,
            mainOption: false,
            showOnDesktop: false,
            showOnMobile: false,
          },
          "discord": {
            showOnModal: false,
            mainOption: false,
            showOnDesktop: false,
            showOnMobile: false,
          },
          "torus-auth0-email-passwordless": {
            showOnModal: false,
            mainOption: false,
            showOnDesktop: false,
            showOnMobile: false,
          }
        }
      });
    } catch(err) {
      if (err.message !== "Already initialized") {
        this.progress = false;
        throw err;
      }
    }
    this.progress = false;
  }
  async login() {
    if (this.progress) {
      return;
    }
    this.progress = true;
    if (!this.torus.isLoggedIn) {
      try {
      await this.torus.login();
      } catch(err) {
        this.progress = false;
        throw err;
      }
    }
    this.web3 = new Web3(this.torus.provider);
    this.progress = false;
    return this.web3;
  }
  async getPublicAddressByGoogle(gmail) {
    return await this.torus.getPublicAddress({
      verifier: "google",
      verifierId: gmail,
    });
  }
}

const torusClient = new TorusClient();
export default torusClient;
