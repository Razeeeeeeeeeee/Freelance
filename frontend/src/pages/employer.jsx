import React, { useState } from "react";
import Card from "../components/card";
import { Link } from "react-router-dom";
import axios from "axios";
import transition from "../components/utils/transition";

const Employer=()=> {
  const [file, setFile] = useState();
  const [name, setName] = useState("");

  function handleFileChange(event) {
    setFile(event.target.files[0]);
    setName(event.target.files[0].name);
    console.log(name);
    console.log(file);
  }

  const handlesubmit = async (event) => {
    event.preventDefault();
    let formdata = new FormData();

    formdata.append("file", file);
    formdata.append("name", name);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/employee_upload/",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log(response);
      alert("File upload successful");
    } catch (error) {
      if (error.response) {
        // get response with a status code not in range 2xx
        alert("Error uploading file");
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        // no response
        console.error(error.request);
      } else {
        // Something wrong in setting up the request
        console.error("Error", error.message);
      }
      console.log(error.config);
    }
  };

  return (
    <>
      <Card>
        <div className="font-bold text-3xl">Job Description</div>
        <div className="flex justify-center items-baseline pt-16 pr-10 pl-10 align-baseline px-20">
          <div className="p-0 m-0 pr-10 ">
            Upload an excel file containing the job details
            <div className="dropdown dropdown-end">
              <div
                tabIndex="0"
                role="button"
                className="btn btn-circle btn-ghost btn-xs text-info"
              >
                <svg
                  tabIndex="0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 stroke-current outline-none"
                >
                  <path
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div
                tabIndex="0"
                className="card compact dropdown-content bg-base-100 rounded-box z-[1] w-64 shadow"
              >
                <div className="card-body">
                  <h2 className="card-title">Format for the excel file</h2>
                  <p className="text-left">
                    The excel file should contain the following columns
                  </p>
                  <ul className="text-left font-medium list-disc pl-3">
                    <li>job name</li>
                    <li>requirements</li>
                    <li>budget</li>
                    <li>max workers</li>
                    <li>min workers</li>
                    <li>mode</li>
                    <li>available from</li>
                    <li>available till</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <button
            className="btn btn-ghost m-5 px-3 py-2 rounded-lg"
            form="file_upload"
            onClick={handlesubmit}
          >
            Submit
          </button>
        </div>
        <form id="file_upload">
          <div className="flex justify-center mt-0 p-0">
            <input
              className="flex file-input w-full max-w-xs rounded-lg text-xs "
              id="employer_file"
              accept=".xls, .xlsx"
              type="file"
              onChange={(evnt) => {
                handleFileChange(evnt);
              }}
            ></input>
          </div>
        </form>
        <div className="pt-10 font-light text-gray-400 text-sm">
          If you want to enter the details manually,{" "}
          <Link className="underline text-zinc-900 " to="/employer_form">
            Click here!
          </Link>{" "}
        </div>
      </Card>
    </>
  );
}

export default Employer;