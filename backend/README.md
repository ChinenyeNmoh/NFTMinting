## NFT Minting Platform API Documentation
This platform allows users to mint NFTs by connecting their wallets using MetaMask or any Ethereum-compatible wallet. The minting process is executed on the Sepolia testnet, and the smart contract manages the NFT minting and transactions. Additionally, users can manage their minted NFTs through a clean UI,and  interact with metadata stored via the backend API.
## Getting Started

### Getting an Authorization key
To interact with the NFT API, ensure the following:
- Node.js (Express.js) environment.
- MongoDB for data storage.
- Necessary models, routes, and controllers are already set up in the project.

**Post** /create
This endpoint allows users to mint a new NFT by providing necessary details such as name, description, and LogoUrl.
- request body
```
{
  "name": "John Doe",
  "description": "",
  "LogoUrl": ""
}

```
- Request Headers:
Authorization: Your API key to authenticate the request.

- Response:

201: NFT minted successfully
```
{
  "message": "NFT minted successfully",
  "nft": {
    "nftId": "unique-nft-id",
    "name": "NFT Name",
    "description": "Description of the NFT",
    "LogoUrl": "https://link-to-nft-logo",
    "userWalletAddress": "0x1234567890abcdef1234567890abcdef12345678"
  }
  
}
```

400: Missing required fields (e.g., name, description, LogoUrl)
401: Unauthorized - Invalid or missing Authorization key
500: Internal Server Error



2. Get NFT by ID
Endpoint: GET /api/nfts/:id
Description: Retrieve details of a specific NFT by its unique nftId.
- Parameters:
id (path parameter): The unique ID of the NFT to retrieve.

- `Response:
200: NFT retrieved successfully


```
{
  "message": "NFT retrieved successfully",
  "nft": {
    "nftId": "unique-nft-id",
    "name": "NFT Name",
    "description": "Description of the NFT",
    "LogoUrl": "https://link-to-nft-logo"
  }
}
```
404: NFT not found
500: Internal Server Error


3. Get NFTs by Wallet Address
- Endpoint: GET /api/nfts/get/:address

Description: Retrieve all NFTs associated with a specific user's wallet address.
- Parameters:
address (path parameter): The wallet address of the user to retrieve NFTs for.
Response:
200: NFTs retrieved successfully

```
{
  "message": "NFTs retrieved successfully",
  "nfts": [
    {
      "nftId": "unique-nft-id",
      "name": "NFT Name",
      "description": "Description of the NFT",
      "LogoUrl": "https://link-to-nft-logo"
    }
  ]
}
```
404: No NFTs found for the provided address
500: Internal Server Error


## Controller Functions
- createNFT(req, res)
Handles minting a new NFT. This function validates the input, creates a new NFT record in the database, and returns a response confirming successful minting or an error if something goes wrong.

- getNFTById(req, res)
Fetches the details of an NFT by its unique nftId provided in the request parameters. It returns the NFT's metadata like name, description, and LogoUrl.

- getNFTByAddress(req, res)
Fetches all NFTs associated with a specific user’s wallet address. It returns a list of NFTs if any are found, or a message indicating no NFTs have been minted for the given address.


Conclusion
The NFT Minting Platform API provides endpoints for minting, retrieving, and managing NFTs on the Sepolia testnet. By connecting your wallet and interacting with the API, users can mint their NFTs and retrieve them using unique identifiers or wallet addresses. The backend ensures data storage and metadata management for a seamless NFT experience.








