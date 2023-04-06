export const DOC_SIGN_CONTRACT_ADDRESS = "0x23562dbCE213E26883d3A60939398A6D92d63613"

export const abi =  [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "partipicant",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "docNo",
          "type": "uint256"
        }
      ],
      "name": "DocumenSigned",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "addToWhitelist",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "documents",
      "outputs": [
        {
          "internalType": "bool",
          "name": "exist",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "docNo",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_docNo",
          "type": "uint256"
        }
      ],
      "name": "getDocument",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "docNo",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "signAddresses",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getWhitelist",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_docNo",
          "type": "uint256"
        }
      ],
      "name": "signDocument",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];