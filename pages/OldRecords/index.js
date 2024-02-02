import RecordCard from "@/components/RecordCard";
import React, { useState } from "react";
import web3 from "../../ethereum/web3";
import Patient from "../../ethereum/Patient";
import Navbar from "@/components/Navbar";

const OldRecords = () => {
  const [address, setAddress] = useState("");
  const [records, setRecords] = useState([]);
  const [patientInfo, setPatientInfo] = useState({});

  const getRecords = async (e) => {
    e.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();
      const patientInfo = await Patient.methods
        .patients(address)
        .call({ from: accounts[0] });
      console.log(patientInfo);
      setPatientInfo (patientInfo);
      
      
      const oldrecords = await Patient.methods
        .getRecords(address)
        .call({ from: accounts[0] });
      console.log(oldrecords);
      setRecords(oldrecords);
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };

  /*const recordDate = (timestamp) => {
    // const date = new Date(timestamp.toLocaleString() * 1000);
    // return date.toLocaleString();

    try {
      const date = new Date(timestamp * 1000);
      return date.toDateString();
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };*/
 

  return (
    <main>
    <Navbar/>
      <div className="h-screen ">
        <div className="h-2/3 text-3xl font-bold flex flex-col justify-center items-center">
          <h1 className="p-8">View old Records</h1>
          <div>
            <form onSubmit={getRecords}>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Enter Address
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-base font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-100 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Check
                </span>
              </button>
            </form>
          </div>
        </div>

        <div className="container mx-auto">
          <div className="flex-col mx-10">

          {patientInfo?.name && (
            <div className="flex gap-10">
              <h1 className="text-2xl font-bold">Name: {patientInfo?.name}</h1>
              <h1 className="text-2xl font-bold">Age: {patientInfo?.age.toLocaleString()}</h1>
            </div>
          )}
            
            
            {records?.map((record, index) => (
            

              <RecordCard
                key={index}
                id={index}
                date={record.date}
                IPFS_Hash={record.IPFS_Hash}
              />
              
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default OldRecords;
