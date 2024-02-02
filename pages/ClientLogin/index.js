import { useState } from "react";
import Patient from "../../ethereum/Patient";
import web3 from "../../ethereum/web3";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function ClientLogin() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [doctorAddress, setDoctorAddress] = useState("");

  const addPatient = async (e) => {
    e.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();
      const summary = await Patient.methods
        .addPatient(name, age)
        .send({ from: accounts[0] });
      console.log(summary);
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };

  const authorizeDoctor = async (e) => {
    e.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();
      const summary = await Patient.methods
        .authorizeDoctor(doctorAddress)
        .send({ from: accounts[0] });
      console.log(summary);
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };

  const revokeDoctorAuthorization = async (e) => {
    e.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();
      const summary = await Patient.methods
        .revokeDoctorAuthorization(doctorAddress)
        .send({ from: accounts[0] });
      console.log(summary);
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };

  return (
    <div className="h-screen">
      <Navbar />
      <div className="h-1/3 text-5xl flex justify-center items-center">
        <h1>Patient Login</h1>
      </div>
      <div className="flex justify-around items-center  ">
        <div>
          <h1 className="text-lg font-bold p-6">Step 1 Send Us your Request</h1>
          <form onSubmit={addPatient}>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Name
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Age
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-base font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-100 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Submit
              </span>
            </button>
          </form>
        </div>

        <div>
          <h1 className="text-lg font-bold p-6">
            Step 2 Authorize Or Revoke Doctor
          </h1>

          <form>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Enter Doctor's Address
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={doctorAddress}
                onChange={(e) => setDoctorAddress(e.target.value)}
              />
            </div>

            <button
              onClick={authorizeDoctor}
              type="submit"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-base font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-100 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Authorize
              </span>
            </button>
            <button
              onClick={revokeDoctorAuthorization}
              type="submit"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-base font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-100 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Revoke
              </span>
            </button>
          </form>
        </div>

        <div>
          <Link
            href="/OldRecords"
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
          >
            <span className="relative  px-5 py-2.5 transition-all ease-in duration-100 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              View Old Records
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
