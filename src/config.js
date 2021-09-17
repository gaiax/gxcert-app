
let config;
if (process.env.NODE_ENV === "development") {
  config = {
    web3Host: "https://matic-mumbai.chainstacklabs.com",
    contractAddress: "0xE19F38e0fA7B005E8E62E837B0D79C8558fAd8E0",
    gxApi: "http://localhost:5001/gxcert-21233/asia-northeast1/gxcertMain",
    host: "http://localhost:3000/#",
  };
} else if (process.env.NODE_ENV === "production") {
  //TODO: Change here
  config = {
    web3Host: "https://rpc-mainnet.maticvigil.com",
    contractAddress: "0xD1cf302e4E7859f1346D8A1BA0e031A8fFc3f13c",
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
