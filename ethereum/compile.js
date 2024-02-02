const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath); //removes the folder build 

const PatientPath = path.resolve(__dirname, "contracts", "PatientData.sol");
const source = fs.readFileSync(PatientPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "PatientData.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
"PatientData.sol"
];

fs.ensureDirSync(buildPath);

//Now we loop through all the contracts in the output and save them in the Output Folder
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
