import detectEthereumProvider = from '@metamask/detect-provider';
const forwarderOrigin = 'http://localhost:3000';

// Down Bad Contract ABI
const DownBadJSON = JSON.parse(fs.readFileSync(path.join(__dirname, 'build/contracts/DownBad.json')));


const initialize = (provider) => {

  // Check that metamask provider and window.ethereum provider are the same
  if(provider != window.ethereum){
    console.error("Are you using a different wallet?");
  }

  // Get JoinDownBad Button and add function to on click
  const onboardButton = document.getElementById('joinDownBad');
  const getContractButton = document.getElementById('getContract');

  const downBadContract = web3.eth.contract(DownBadJSON.abi).at(downBadContractAddress);

  function joinDownBad(){

    downBadContract.joinDownBad({from : currentAccount, value : currentAccount}, (err, res) => {

      if(err){
        console.error(err);
      }else{
        console.log(res);
      }
    });
  }
};

const chainId = await ethereum.request({method : 'eth_chainId'});
handleChainChanged(chainId);

ethereum.on('chainChanged', handleChainChanged);

function handleChainChanged(_chainId){

  // Reload the page so that chainId will be updated
  window.location.reload();
}

let currentAccount = null;
ethereum.request({ethereum : 'eth_accounts'})
.then(handleAccountsChanged)
.catch((err) => {

  console.error(err);
});

ethereum.on('accountsChanged', handleAccountsChanged);

function handleAccountsChanged(accounts){
  if(accounts.length == 0){
    console.log('Please connect to metamask!');
  }else if(accounts[0] != currentAccount){
    currentAccount = accounts[0];
  }
}

document.getElementById('connectButton', connect);

function connect(){
  ethereum.request({method : 'eth_requestAccounts'})
  .then(handleAccountsChanged)
  .catch((err) => {
    if(err.code === 4001){

      console.log('Please connect to Metamask!');
    } else {
      console.error(err);
    }
  });
}
window.addEventListener('DOMContentLoaded', function(){

  const provider = await detectEthereumProvider();

  if(provider){

    initialize(provider);

  }else{
    console.log('Please install Metamask!');
  }
});
