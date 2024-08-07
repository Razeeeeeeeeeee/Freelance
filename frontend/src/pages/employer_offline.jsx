import React, { useState, useEffect } from "react";
import Card from "../components/card";
import { useNavigate } from "react-router-dom";
import transition from "../components/utils/transition";

const Employer_offline = () => {
  const [coordinates, setCoordinates] = useState(null);

  const getlocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="flex flex-col pt-32 justify-center px-0 pb-20">
      <div className="grid grid-flow-col grid-cols-11">
        <div className="sm:border-solid sm:border-2 rounded-md py-10 px-0 drop-shadow-lg grid col-span-5 col-start-4">
          <div className="font-bold pb-10 text-3xl">Job Location</div>

          <div className="">
            <div className="flex ml-20 mr-20 mb-5 justify-between">
              <label className="align-baseline font-medium text-[#07074D]">
                Building No
              </label>
              <input
                type="text"
                id="Building No"
                name="Building No"
                className="border rounded  w-17 px-2 py-1 text-gray-700 align-baseline"
              />
            </div>
          </div>

          <div className="">
            <div className="flex ml-20 mr-20 mb-5 justify-between">
              <label className="align-baseline font-medium text-[#07074D]">
                Street No
              </label>
              <input
                type="text"
                id="street"
                name="street"
                className="border rounded w-17 px-2 py-1 text-gray-700 align-baseline"
              />
            </div>
          </div>

          <div className="">
            <div className="flex ml-20 mr-20 mb-5 justify-between">
              <label className="align-baseline font-medium text-[#07074D]">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="border rounded w-17 px-2 py-1 text-gray-700 align-baseline"
              />
            </div>
          </div>

          <div className="">
            <div className="flex ml-20 mr-20 mb-5 justify-between">
              <label className="align-baseline font-medium text-[#07074D] ">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                className="border rounded w-17 px-2 py-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline align-baseline"
              />
            </div>
          </div>

          <div className="font-semibold pb-10 mt-7 text-2xl">OR</div>

          <div>
            <button
              onClick={getlocation}
              className="btn mb-10 px-3 py-2 rounded-lg font-semibold "
            >
              Pick up current location
            </button>

            {coordinates && (
              <div>
                <div className="">
                  <div className="flex ml-40 mr-20 mb-5 justify-between">
                    <label className="align-baseline font-medium text-[#07074D]">
                      Latitude
                    </label>
                    <input
                      type="decimal"
                      id="country"
                      name="country"
                      value={coordinates.latitude}
                      className="border rounded text-gray-700 pl-2"
                      readOnly
                    />
                  </div>
                </div>

                <div className="">
                  <div className="flex ml-40 mr-20 mb-5 justify-between">
                    <label className="align-baseline font-medium text-[#07074D]">
                      Longitude
                    </label>
                    <input
                      type="decimal"
                      id="country"
                      name="country"
                      value={coordinates.longitude}
                      className="border rounded text-gray-700 pl-2"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            {" "}
            <button className="btn btn-primary rounded-md mr-10 ml-4 mb-11">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employer_offline;