const preSaleAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_beneficiary",
				"type": "address"
			}
		],
		"name": "buyTokens",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_rate",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "_wallet",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "purchaser",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "beneficiary",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "TokenPurchase",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "index",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "LottoWinnings",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_addressToQuery",
				"type": "address"
			}
		],
		"name": "queryERC20Balance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ticketRate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "wallet",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "weiRaised",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const preSaleAddress = "0x2A54bb3D1EfBa5664DfbF042Ed52beba3a751074";
var amount = document.getElementById("bnbAmount");
var modallink = document.getElementById("myModal");

async function buyToken() {
    if(web3 !== undefined){
		console.log("clicked");
		let bnbval = $("#bnbvalue").val();
        let bnb = web3.utils.toWei(bnbval);
        let userAddress = accounts[0];
        console.log("sending Transaction");
        await preSaleContract.methods.buyTokens(userAddress).send({value: bnb,from: accounts[0]}).then(function(result){
			
		});
		modallink.style.display = "none";

    }else{
        console.log("something went wrong");
    }
}

window.onload = async () => {
    if(window.ethereum){
        try {
            web3 = new Web3(window.ethereum);
            accounts = await ethereum.enable();
			preSaleContract = new web3.eth.Contract(preSaleAbi,preSaleAddress);
            console.log("Web3 connected 1")
        }catch(e) {
            //console.log(e)
        }
    }else if (window.web3) {
        web3 = new Web3(web3.currentProvider);
        accounts = await web3.eth.getAccounts();
		preSaleContract = new web3.eth.Contract(preSaleAbi,preSaleAddress);
        console.log("Web3 connected 2");

    }
    else{
        
    }
};

async function connectWallet() {
	console.log("clicked");
    if(window.ethereum){
        try {
            web3 = new Web3(window.ethereum);
            accounts = await ethereum.enable();
			preSaleContract = new web3.eth.Contract(preSaleAbi,preSaleAddress);
            console.log("Web3 connected")
        }catch(e) {
            console.log(e)
        }
    }else if (window.web3) {
        web3 = new Web3(web3.currentProvider);
        accounts = await web3.eth.getAccounts();
		preSaleContract = new web3.eth.Contract(preSaleAbi,preSaleAddress);
        console.log("Web3 connected")
		

    }
    else{
        
    }
    if (window.web3.currentProvider.selectedAddress == ""){
        $(".walletConnect").html('Connect Wallet');
		$("#walletaddress").hide();
    }else{
        $(".walletConnect").hide();
		var textlable = document.getElementById("walletaddress");
		textlable.innerText = "Wallet " + accounts[0] + " Connected";
		$("#walletaddress").show();
		
    }
    
}


