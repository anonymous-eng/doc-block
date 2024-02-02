import web3 from "./web3";
import PatientData from "./build/PatientData.json";

const instance = new web3.eth.Contract(
    PatientData.abi,
    "0x1Ba12558eC05772AE8b98047a6218455d530E1Ff"
);

export default instance;

/*this code is used to create an instance of a smart contract by importing the configured web3 instance and the contract's ABI from 
separate files. The contract instance is then created using the specified ABI and contract address, and it's exported to be used in 
other parts of your application. This setup enables you to interact with the smart contract's functions and data using the instance.*/