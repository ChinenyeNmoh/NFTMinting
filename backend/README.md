## NFT Minting Platform API Documentation
This platform allows users to mint NFTs by connecting their wallets using MetaMask or any Ethereum-compatible wallet. The minting process is executed on the Sepolia testnet, and the smart contract manages the NFT minting and transactions. Additionally, users can manage their minted NFTs through a clean UI,and  interact with metadata stored via the backend API.
## Getting Started

### Getting an Authorization key
To interact with the NFT API, ensure the following:
- Node.js (Express.js) environment.
- MongoDB for data storage.
- Necessary models, routes, and controllers are already set up in the project.

**Post** /create

- request body
```
{
  "name": "John Doe",
  "description": "",
  "LogoUrl": ""
}

```
