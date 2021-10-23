const web3 = require('web3');
const SimpleContract = require('./build/contracts/SimpleContract.json');

const init = async () => {
    const web3 = new Web3('http://localhost:8545');

    const id = await web3.eth.net.getID();
    const deployedNetwork = SimpleContract.networks[id];
    const contract = new web3.eth.Contract(SimpleContract.abi,deployedNetwork.address);

    const addresses = await web3.eth.getAccounts();

    const receipt = await contract.methods.emitEvent('hey').send({
        from: addresses[0]
    });

    console.log(receipt.events);
}

init();
