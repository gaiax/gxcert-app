
let config;
if (process.env.NODE_ENV === "development") {
  config = {
    web3Host: "https://matic-mumbai.chainstacklabs.com",
    contractAddress: "0xE19F38e0fA7B005E8E62E837B0D79C8558fAd8E0",
    gxApi: "http://localhost:5001/gxcert-21233/asia-northeast1/gxcert",
    host: "http://localhost:3000/#",
  };
} else if (process.env.NODE_ENV === "production") {
  //TODO: Change here
  config = {
    web3Host: "https://matic-mumbai.chainstacklabs.com",
    contractAddress: "0x1ACd77F5AAc3DC24d57F7270b2839B82eFAfc47C",
    gxApi: "https://asia-northeast1-gxcert-21233.cloudfunctions.net/gxcertMain",
    host: "https://gaiax.github.io/gxcert-app/#",
  }
}


export default config;
