require("dotenv").config();
let config;
console.log(process.env);
const env = process.env;
if (env.REACT_APP_DOTENV === "development") {
  config = {
    web3Host: "https://matic-mumbai.chainstacklabs.com",
    contractAddress: "0xADc01B9Ca2ffb9073d44FFC9BBa7224719B0C874",
    gxApi: "http://127.0.0.1:5001/gxcert-test/asia-northeast1/gxcert",
    host: "http://localhost:3000/#",
    network: {
      host: "https://matic-mumbai.chainstacklabs.com",
      chainId: 80001,
      networkName: "Matic Mumbai",
    },
    ipfs: {
      host: "ipfs.gaiax-blockchain.com",
      port: 5001,
      protocol: "https",
    },
    ipfsGateway: "https://ipfs.gaiax-blockchain.com/ipfs"
  };
} else if (env.REACT_APP_DOTENV === "staging") {
  config = {
    web3Host: "https://matic-mumbai.chainstacklabs.com",
    contractAddress: "0xADc01B9Ca2ffb9073d44FFC9BBa7224719B0C874",
    gxApi: "https://asia-northeast1-gxcert-test.cloudfunctions.net/gxcert",
    host: "http://gaiax.github.io/gxcert-test/#",
    network: {
      host: "https://matic-mumbai.chainstacklabs.com",
      chainId: 80001,
      networkName: "Matic Mumbai",
    },
    ipfs: {
      host: "ipfs.gaiax-blockchain.com",
      port: 5001,
      protocol: "https",
    },
    ipfsGateway: "https://ipfs.gaiax-blockchain.com/ipfs"
  };
} else if (env.REACT_APP_DOTENV === "production") {
  //TODO: Change here
  config = {
    web3Host: "https://polygon-rpc.com",
    contractAddress: "0x9bD662955C260B719840e1Cd20f5Ef4B3a978d5b",
    gxApi: "https://asia-northeast1-gxcert-test.cloudfunctions.net/gxcertMain",
    host: "https://gaiax.github.io/gxcert-app/#",
    network: {
      host: "https://polygon-rpc.com",
      chainId: 137,
      networkId: 137,
      networkName: "matic-mainnet",
    },
    ipfs: {
      host: "ipfs.gaiax-blockchain.com",
      port: 5001,
      protocol: "https",
    },
    ipfsGateway: "https://ipfs.gaiax-blockchain.com/ipfs"
  }
}

export default config;
