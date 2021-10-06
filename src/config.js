
let config;
if (process.env.DOTENV === "development") {
  config = {
    web3Host: "https://matic-mumbai.chainstacklabs.com",
    contractAddress: "0x759Fdf53c6820ADDf7BEaE7440707E94A6d2A5A9",
    gxApi: "https://asia-northeast1-gxcert-21233.cloudfunctions.net/gxcert",
    host: "http://localhost:3000/#",
    network: {
      host: "https://matic-mumbai.chainstacklabs.com",
      chainId: 80001,
      networkName: "Matic Mumbai"
    },
  };
} else if (process.env.DOTENV === "staging") {
  config = {
    web3Host: "https://matic-mumbai.chainstacklabs.com",
    contractAddress: "0x759Fdf53c6820ADDf7BEaE7440707E94A6d2A5A9",
    gxApi: "https://asia-northeast1-gxcert-21233.cloudfunctions.net/gxcert",
    host: "http://gaiax.github.io/gxcert-test/#",
    network: {
      host: "https://matic-mumbai.chainstacklabs.com",
      chainId: 80001,
      networkName: "Matic Mumbai"
    },
  };
} else if (process.env.DOTENV === "production") {
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
      networkName: "matic-mainnet"
    },
  }
}


export default config;
