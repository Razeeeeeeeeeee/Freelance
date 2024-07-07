import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Graph from "../components/BarChart";
import Table from "../components/table";
import { AppContext } from "../components/utils/StateContext";

export default function() {
  const simulate = (event) => {
    event.preventDefault();

    try {
      axios
        .get("http://localhost:8000/api/run_simulation/", {
          responseType: "blob",
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Generated_file.xlsx"); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
    } catch (error) {
      if (error.response) {
        // get response with a status code not in range 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // no response
        console.log(error.request);
      } else {
        // Something wrong in setting up the request
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  const [data, setdata] = useState([]);
  const [datafetch, setdatafetch] = useState(false);
  const [graph, setgraph] = useState([
    ["A", "B", "C", "D"],
    [10, 23, 20, 34],
  ]);
  //const [Algotype, setAlgotype] = useState("skill");
  //const [Algo, setAlgo] = useState("random");

  const { Algo, Algotype } = useContext(AppContext)
  const [showmatched, setshowmatched] = useState(false);
  

  const simulate1 = (event) => {
    event.preventDefault();
    try {
      console.log(Algo)
      axios
        .post("http://localhost:8000/api/run_simulation/", { method: Algo })
        .then((response) => {
          const resp = JSON.parse(response.data);
          console.log(resp.results);
          setgraph(resp.happiness);
          setdata(resp.results);
          setdatafetch(true);
        });
    } catch (error) {
      if (error.response) {
        // get response with a status code not in range 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // no response
        console.log(error.request);
      } else {
        // Something wrong in setting up the request
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  function handleradiochange(event) {
    setAlgotype(event.target.value);
  }

  const handleAlgorithmChange = (event) => {
    setAlgo(event.target.value);
  };

  return (
    <>
      <div className="flex flex-col pt-32 justify-center px-0 pb-20">
        <div className="grid grid-flow-col grid-cols-12">
          <div className="sm:border-solid sm:border-2 rounded-md py-10 px-0 drop-shadow-lg grid col-span-6 col-start-4">
            <div className="font-bold pb-10 text-3xl">Results</div>

            <div className="pt-8 pb-10">
              <button
                className="btn btn-primary px-10 rounded-lg"
                onClick={simulate1}
              >
                Generate
              </button>
            </div>

            {datafetch ? (
              <div className="flex justify-center pb-3">
                <div className="w-3/4">
                  <h3 className="font-bold pb-5 text-1xl underline">
                    Bar Graph
                  </h3>{" "}
                  <Graph data={graph} />
                </div>{" "}
              </div>
            ) : (
              <div></div>
            )}
            {datafetch ? (
              <div>
                <div className="p-3 font-bold pb-5 text-1xl underline">
                  {" "}
                  Results{" "}
                </div>
                <div className="flex justify-center">
                  <div className="w-3/4">
                    <Table data={data}></Table>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
