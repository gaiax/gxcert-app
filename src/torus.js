import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";
import config from "./config";

class TorusClient {
  constructor() {
    this.torus = new Torus();
  }
  async init() {
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
    /*
    await this.torus.init({
      buildEnv: "production",
      enableLogging: true,
      network: {
        host: "http://localhost:7545",
        chainId: 80001,
        networkName: "localhost:7545"
      },
      showTorusButton: true,
    });
    */
  }
  async login() {
    await this.torus.login();
    this.web3 = new Web3(this.torus.provider);
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
