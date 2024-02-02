// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

contract PatientData{
    struct Patient {
        string name;
        uint age;
        string ailment;
    }

    struct MedicalRecord {
        string IPFS_Hash;
        uint date;
    }

    mapping(address => Patient) public patients;
    mapping(address => MedicalRecord[]) private  records;
    mapping(address => mapping(address => bool)) public authorizedDoctors;

    function addPatient(string memory _name, uint _age) public {
        patients[msg.sender].name = _name;
        patients[msg.sender].age = _age;
    }
    
    function authorizeDoctor(address _doctorAddress) public {
        authorizedDoctors[msg.sender][_doctorAddress] = true;
    }

    function revokeDoctorAuthorization(address _doctorAddress) public {
        authorizedDoctors[msg.sender][_doctorAddress] = false;
    }

    function addRecord(address _patientAddress, string memory IPFS_Hash) public {
        require(authorizedDoctors[_patientAddress][msg.sender], "Only authorized doctors can add records");
        records[_patientAddress].push(MedicalRecord(IPFS_Hash, block.timestamp));
    }

    function getRecords(address _patientAddress) public view returns (MedicalRecord[] memory) {
        require(msg.sender == _patientAddress || authorizedDoctors[_patientAddress][msg.sender], "Only patient or authorized doctors can view records");
        return records[_patientAddress];
    }
}