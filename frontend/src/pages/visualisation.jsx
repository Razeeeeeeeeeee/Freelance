import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, redirect } from "react-router-dom";
import axios from "axios";
import Graph from "../components/BarChart";
import Table from "../components/table";
import { AppContext } from "../components/utils/StateContext";
import { AnimatePresence, easeIn, easeInOut, motion } from "framer-motion";
import transition from "../components/utils/transition";

const Visualisation =  ()=> {
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

  const [alert, setAlert] = useState(null);
  const [data, setdata] = useState([]);
  const [datafetch, setdatafetch] = useState(false);
  const [graph1, setgraph1] = useState([
    ["A", "B", "C", "D"],
    [10, 23, 20, 34],
  ]);
 const [graph2, setgraph2] = useState([]);

  const myRef = useRef(null)
  //const [Algotype, setAlgotype] = useState("skill");
  //const [Algo, setAlgo] = useState("random");

  const { Algo, Algotype } = useContext(AppContext);
  const [showmatched, setshowmatched] = useState(false);

  const simulate1 = (event) => {
    event.preventDefault();
    try {
      axios
        .post("http://localhost:8000/api/run_simulation/", { method: Algo })
        .then((response) => {
          const resp = JSON.parse(response.data);
          console.log(resp);
          setgraph1(resp.happiness_employee);
          setgraph2(resp.happiness_employer);
          setdata(resp.results);
          setdatafetch(true);
        })
        .catch((err) => {
          if (err.response && err.response.data.alert) {
            setAlert(err.response.data.alert);
            setTimeout(() => {
              setAlert(null);
            }, 3000);
          } else {
            setAlert({
              type: "error",
              message: "An unexpected error occurred",
            });
            setTimeout(() => {
              setAlert(null);
            }, 3000);
          }
        })
        setTimeout(() => {
          myRef.current.scrollIntoView({ behavior: 'smooth' });;
        }, 2000)
        
    } catch (error) {
      if (error.response) {
        // get response with a status code not in range 2xx
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // no response
        console.log("error", error.request);
      } else {
        // Something wrong in setting up the request
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  return (
    <div className="h-screen pt-32">
      <div className="flex flex-col pt-32 justify-center px-0 pb-20">
        <div className="grid grid-flow-col grid-cols-12">
          <motion.div layout layoutRoot className="sm:border-solid sm:border-2 rounded-md py-20 px-0 drop-shadow-lg grid col-span-6 col-start-4">
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
              <div>
              <motion.div 
              initial = {{opacity:0}}
              animate = {{opacity:1}}
              transition={{duration:2}}
              className="flex justify-center pb-3">
                <div className="w-3/4" ref = {myRef}>
                  <h3 className="font-bold pb-5 text-1xl underline">
                    Employer Happiness
                  </h3>{" "}
                  <Graph data={graph1} id="employer_chart"/>
                </div>{" "} 
              </motion.div>
              <motion.div 
              initial = {{opacity:0}}
              animate = {{opacity:1}}
              transition={{duration:2}}
              className="flex justify-center pb-3">

              <div className="w-3/4">
                  <h3 className="font-bold pb-5 text-1xl underline">
                    Employee Happiness
                  </h3>{" "}
                  <Graph data={graph2} id="employee_chart" />
                </div>{" "}
              </motion.div>
              </div>

            ) : (
              <div></div>
            )}<AnimatePresence>
            {datafetch ? (
              <motion.div
              initial = {{opacity:0}}
              animate = {{opacity:1}}
              transition={{duration:2}}
              >
                <div className="p-3 font-bold pb-5 text-1xl underline">
                  {" "}
                  Results{" "}
                </div>
                <div className="flex justify-center">
                  <div className="w-3/4">
                    <Table data={data}></Table>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div></div>
            )}</AnimatePresence>
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.25,
              ease: easeInOut,
            }}
            exit={{ opacity: 0 }}
            role="alert"
            className="alert alert-error fixed bottom-2 w-1/4 left-2 right-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{alert.message}</span>
          </motion.div>
        )}{" "}
      </AnimatePresence>
    </div>
  );
}


export default Visualisation;
