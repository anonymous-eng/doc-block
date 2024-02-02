const Web3 = require("web3");
const ganache = require("ganache-cli");
const PatientData = require("../build/PatientData.json");
const assert = require("assert");

const web3 = new Web3(ganache.provider());

let accounts;
let patientData;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  patientData = await new web3.eth.Contract(PatientData.abi)
    .deploy({ data: PatientData.evm.bytecode.object })
    .send({ from: accounts[0], gas: "1400000" });
});

describe("PatientData", () => {
  it("should add a patient", async () => {
    await patientData.methods.addPatient("Jagrat", 30).send({ from: accounts[1], gas: "1000000" });
    const patient = await patientData.methods.patients(accounts[1]).call();
    assert.equal(patient.name, "Jagrat");
    assert.equal(patient.age, 30);
  });

  it("should authorize a doctor", async () => {
    await patientData.methods.authorizeDoctor(accounts[2]).send({ from: accounts[1], gas: "1000000" });
    const isAuthorized = await patientData.methods.authorizedDoctors(accounts[1], accounts[2]).call();
    assert(isAuthorized);
  });

  it("should revoke a doctor's authorization", async () => {
    await patientData.methods.revokeDoctorAuthorization(accounts[2]).send({ from: accounts[1], gas: "1000000" });
    const isnotAuthorized = await patientData.methods.authorizedDoctors(accounts[1], accounts[2]).call();
    assert(!isnotAuthorized);
  });

  it("should add a record", async () => {
    await patientData.methods.authorizeDoctor(accounts[2]).send({ from: accounts[1], gas: "1000000", });
    await patientData.methods.addRecord(accounts[1], "QmX1zaa15GZPu8PFdQnc7qrQAxuyn1hsWx35RckZRmwgBS").send({ from: accounts[2], gas: "1000000" });
    const records = await patientData.methods.getRecords(accounts[1]).call({ from: accounts[2] });
    assert.equal(records.length, 1);
    assert.equal(records[0].IPFS_Hash, "QmX1zaa15GZPu8PFdQnc7qrQAxuyn1hsWx35RckZRmwgBS");
  });

  it("should not allow an unauthorized doctor to add a record", async () => {
    try {
      await patientData.methods.addRecord(patientAddress, "Flu", "Rest and fluids").send({ from: accounts[3], gas: "1000000" });
    } catch (error) {
      assert(error);
    }
  });

  it("should not allow any other person or an unauthorized doctor to view records", async () => {
    try {
      await patientData.methods.getRecords(accounts[1]).call({ from: accounts[3], gas: "1000000" });
    } catch (error) {
      assert(error);
    }
  });
});
