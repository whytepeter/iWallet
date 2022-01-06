// Moralis Function

(async function(){
  const serverUrl = "https://yftnrervntrn.usemoralis.com:2053/server"
  const appId = "uyxKuUcXuKhHHNnhH9ZN1WHpuwB4MwBbhEf2aEbV"
  await Moralis.start({serverUrl, appId})
})()

const get_provider = () => {
  if ("solana" in window) {
    const provider = window.solana;
    if (provider.isPhantom) {
      return provider;
    }
  }
  window.open("https://phantom.app/", "_blank");
};

async function login(){
  //Phantom Wallet
  Moralis.authenticate({type:'sol'}).then(function(user) {
    console.log(user.get('solAddress'))
    console.log(user)
    phantom_balance();
  })

  //Metamask
  // Moralis.authenticate()
}

async function logout(){
  await Moralis.User.logOut().then(()=>{
    console.log('Logout')
  })
}


async function transferNative(){
  const address = document.getElementById('address').value
  const amount = document.getElementById('amount').value
  const balance = await Moralis.Web3API.account.getNativeBalance()
  console.log(balance)
  console.log({address,amount});
    // sending 0.5 ETH
  const options = {
    type: "native", 
    amount: Moralis.Units.ETH(amount), 
    receiver: address
  }

  let result = await Moralis.transfer(options)
  console.log(result);
}

async function transferNative(){
  const address = document.getElementById('address').value
  const amount = document.getElementById('amount').value

    await Moralis.enableWeb3()
  console.log({address,amount});
    // sending 0.5 ETH
  const options = {
    type: "native", 
    amount: Moralis.Units.ETH(amount), 
    receiver: address
  }

  let result = await Moralis.transfer(options)
  console.log(result);
}


async function transferErc20(){
  
  const address = document.getElementById('erc20-address').value
  const amount = document.getElementById('erc20-amount').value
  const contract = document.getElementById('erc20-contract').value
  const decimals = document.getElementById('erc20-decimals').value
  
  await Moralis.enableWeb3()
  console.log({address,amount,contract, decimals,});
  // sending 0.5 tokens with 18 decimals
  const options = {
    type: "erc20", 
    amount: Moralis.Units.Token(amount, decimals), 
    receiver: address,
    contractAddress: contract
  }
  
  let result = await Moralis.transfer(options)
  console.log(result);
  
}
    
// async function getBal(){
//   // await Moralis.start()
//   let currentUser = Moralis.User.current();
//   console.log(currentUser)
//   const options = { chain: 'bsc', address: "n7fL151H7gKRk3PCrsyT9tU9UuJg44Trms58LocMyMs", to_block: "10253391" }
//   const balances = await Moralis.Web3API.account.getTokenBalances(options);
//   console.log(options)
//   console.log(balances)

// }


document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logout;

//Function click listeners
document.getElementById("transfer-native").onclick = transferNative;
document.getElementById("transfer-erc20").onclick = transferErc20;

document.getElementById("get-bal").onclick = getBal;


// Old Bootstrap code
(function () {
  'use strict'

  feather.replace({ 'aria-hidden': 'true' })

  // Graphs
  var ctx = document.getElementById('myChart')
  // eslint-disable-next-line no-unused-vars

})()

// get wallet provider, phantom


// get balance from connected Phantom wallet
async function phantom_balance() {
  // alt window.solana
  const phantom = get_provider();
  console.log("Wallet Connected: " + phantom.isConnected);
  if (phantom.isConnected !== false) {

    const wallet = phantom.publicKey;
    const wallet_b58 = phantom.publicKey.toString();

    // connect to the cluster
    console.log("Connecting Cluster");
    var connection = new solanaWeb3.Connection(
      solanaWeb3.clusterApiUrl('devnet'),
      'confirmed',
    );

    // remember, do not use base 58 encoded key with getBalance();
    console.log("Getting Balance: " + wallet_b58);
    let _balance = await connection.getBalance(wallet)
      .then(function(data) {
        console.log("Wallet Balance: " + data);
        return data;
      })
      .catch(function(error) {
        console.log(error);
        return error;
      });

  }
}

var balance = phantom_balance();

console.log(balance);
