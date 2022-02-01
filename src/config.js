require("dotenv").config();
let config;
console.log(process.env);
const env = process.env;
if (env.REACT_APP_DOTENV === "development") {
  config = {
    web3Host: "https://matic-mumbai.chainstacklabs.com",
    contractAddress: "0x2C4b3c2c22776d90934fC1A44fDc532bEf087FCF",
    gxApi: "http://127.0.0.1:5001/gxcert-21233/asia-northeast1/gxcert",
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
    contractAddress: "0x2C4b3c2c22776d90934fC1A44fDc532bEf087FCF",
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
    web3Host: "https://rpc-mainnet.maticvigil.com",
    contractAddress: "0x52E8143E76d0612280286db3D7B3b432d8D6798C",
    gxApi: "https://asia-northeast1-gxcert-21233.cloudfunctions.net/gxcertMain",
    host: "https://gaiax.github.io/gxcert-app/#",
    network: {
      host: "https://rpc-mainnet.maticvigil.com",
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
