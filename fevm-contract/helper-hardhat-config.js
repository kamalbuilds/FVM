const { ethers } = require("hardhat")

// developing on hyperspace - filecoin testnet
const networkConfig = {
    3141: {
        name: "hyperspace",
        tokenToBeMinted: 12000,
    },
}

// const developmentChains = ["hardhat", "localhost"]

module.exports = {
    networkConfig,
    // developmentChains,
}
