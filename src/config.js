require("dotenv").config();
let config;
console.log(process.env);
const env = process.env;
if (env.REACT_APP_DOTENV === "development") {
  config = {
    web3Host: "https://matic-mumbai.chainstacklabs.com",
    contractAddress: "0x7799acDa2093Da00a2fB695243122B0c8F66d659",
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
    contractAddress: "0x7799acDa2093Da00a2fB695243122B0c8F66d659",
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
    contractAddress: "0xa882d0f7D3ac1C8e897C30Fa459dd41b36536619",
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
