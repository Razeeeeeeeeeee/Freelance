import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Graph from "../components/BarChart";
import Table from "../components/table";
import AppProvider from "../components/utils/StateProvider";
import { AppContext } from "../components/utils/StateContext";
import transition from "../components/utils/transition";
const SelectAlgo = () => {
  const { Algo, Algotype, setAlgo, setAlgotype } = useContext(AppContext);
  const [showmatched, setshowmatched] = useState(false);

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
            <div className="font-bold pb-10 text-3xl">Select Algorithm</div>

            <div className="font-bold pb-5 text-1xl underline">
              Matching Recommendation
            </div>

            <div className="pb-2 flex justify-center align-baseline">
              <input
                type="radio"
                name="algo_type"
                id="skill"
                value="skill"
                checked={Algotype == "skill"}
                onChange={handleradiochange}
                className="radio"
              />
              <label htmlFor="skill" className="pl-10">
                Skill Based
              </label>
            </div>
            <div className="pb-10 flex justify-center align-baseline">
              <input
                type="radio"
                name="algo_type"
                id="skill-location"
                value="skill-location"
                checked={Algotype == "skill-location"}
                onChange={handleradiochange}
                className="radio ml-24"
              />
              <label htmlFor="skill-location" className="pl-10">
                Skill and Location Based
              </label>
            </div>

            <div className="font-bold pb-5 text-1xl underline">
              Matching Automation
            </div>
            <div className="grid grid-cols-6">
              <div className="col-span-3 col-start-1">
                <div className="pb-3">Skill Based</div>
                <select
                  className="select select-ghost rounded-md"
                  defaultValue={"Skill Based Algorithms"}
                  disabled={Algotype !== "skill"}
                  onChange={handleAlgorithmChange}
                >
                  <option disabled>Skill Based Algorithms</option>
                  <option value="gale-shapely">Gale Shapely</option>
                  <option value = "greedy">MS_SC_Greedy</option>
                  <option value = "gdc"> MS_SC_GDC</option>
                  <option value = "adaptive">MS_SC_Adaptive</option>
                </select>
              </div>

              <div className="col-span-3 col-start-4">
                <div className="pb-3"> Skill and Location Based</div>

                <select
                  className="select select-ghost rounded-md"
                  defaultValue={"Skill and Location Based Algorithms"}
                  disabled={Algotype !== "skill-location"}
                  onChange={handleAlgorithmChange}
                >
                  <option disabled>Skill and Location Based Algorithms</option>
                  <option value="gale-shapely">Gale Shapely</option>
                  <option>Greedo</option>
                </select>
              </div>
            </div>

            <div className="pt-8 pb-10">
              <Link
                to="/visualisation"
                className="btn btn-primary px-10 rounded-lg"
              >
                Next
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectAlgo;
