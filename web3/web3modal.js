// Packages
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;

// Web3modal instance
let web3Modal

// Chosen wallet provider given by the dialog window
let web3, provider;

const init = () => {
    // refrence to account and connect button element
    const accountContainer = document.querySelector("#account-container");
    const connectBtn = document.querySelector("#walletConnect");
    if (window.web3 && window.web3.currentProvider.selectedAddress){
        const theAddress = window.web3.currentProvider.selectedAddress;
        document.querySelector("#address").innerHTML = `${theAddress.substr(0, 5)}...${theAddress.substr(theAddress.length-5, theAddress.length)}`;
        connectBtn.style.display = "none"
        accountContainer.style.display = "flex"
    }else{
        // display button
        connectBtn.style.display = "block"
    }

    const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
                97: 'https://data-seed-prebsc-2-s2.binance.org:8545/',
            }
          }
        }
    };

    web3Modal = new Web3Modal({
        cacheProvider: false, // optional
        providerOptions, // required
        disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
    });
}

const fetctAccount = async () => {

    // create a Web3 instance for the wallet
    web3 = new Web3(provider);

    // get the address of the connected account
    const [address] = await web3.eth.getAccounts();

    // get the balance of the account
    const balanceInWei = await web3.eth.getBalance(address);
    const balance = parseFloat(web3.utils.fromWei(balanceInWei, "ether")).toFixed(4);

    return {
        address, balance
    }
}


const updateUI = () => {

}

const connectWallet = async () => {
    try {
        provider = await web3Modal.connect();
       const connectedAccount =  await fetctAccount();
       const connectBtn = document.querySelector("#walletConnect");
       const accountContainer = document.querySelector("#account-container");
       connectBtn.style.display = "none"

       const theAddress = connectedAccount.address
        document.querySelector("#address").innerHTML = `${theAddress.substr(0, 5)}...${theAddress.substr(theAddress.length-5, theAddress.length)}`;
        accountContainer.style.display = "flex"

    } catch(e) {
        console.log("Could not get a wallet connection", e);
        return;
    }

    // subscribe to wallet events here

    // for accounts change
    provider.on("accountsChanged", (accounts) => {
        fetctAccount();
    });

    // for chainId change
    provider.on("chainChanged", (chainId) => {
        fetctAccount();
    });

    updateUI();

}

const disconnectWallet = async () =>  {

  
    // TODO: Which providers have close method?
    if(provider.close) {
      await provider.close();
  
      // If the cached provider is not cleared,
      // WalletConnect will default to the existing session
      // and does not allow to re-scan the QR code with a new wallet.
      // Depending on your use case you may want or want not his behavir.
      await web3Modal.clearCachedProvider();
      provider = null;
    }

       const connectBtn = document.querySelector("#walletConnect");
       const accountContainer = document.querySelector("#account-container");
       connectBtn.style.display = "block"
        accountContainer.style.display = "none"
  
  }

// when the page loads
window.addEventListener('load', async () => {
    init();
    document.querySelector("#walletConnect").addEventListener("click", connectWallet);
  });