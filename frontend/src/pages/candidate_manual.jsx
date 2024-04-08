import React, { useState } from "react";
import Card from '../components/card'
import { Link } from "react-router-dom";

export default function(){
    


    return(
        <Card>
   
   <div className="mb-4 flex justify-center">
          <label  className="-mt-30 mr-6 ml-14  block text-base font-medium text-[#07074D]">Job Name</label>
          <input
          type="text"
            id="specificNumber"
            name="specificNumber"
            className="ml-20 mr-4 shadow appearance-none border rounded w-17 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          </div>

        <div className="mb-4 flex justify-center">
          <label  className="mt-3 mr-4 ml-16 block text-base font-medium text-[#07074D]">Skill Requirements</label>
          <input
          type="text"
            id="specificNumber"
            name="specificNumber"
            className="ml-14 mr-4 shadow appearance-none border rounded w-17 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          </div>


        <div className="mb-4 flex justify-center">
          <label  className="mt-3 mr-5 ml-10 block text-base font-medium text-[#07074D]">Budget allotted</label>
          <input
          type="text"
            id="specificNumber"
            name="specificNumber"
            className="ml-14 shadow appearance-none border rounded w-17 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          </div>
           
        <div className="mb-4 flex justify-center">
          <label  className="mt-3 ml-10 block text-base font-medium text-[#07074D]">Max Worker Required</label>
          <input
          type="text"
            id="specificNumber"
            name="specificNumber"
            className="ml-9 shadow appearance-none border rounded w-17 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          </div>

        <div className="mb-4 flex justify-center">
          <label  className="mt-3 ml-10 block text-base font-medium text-[#07074D]">Min Worker Required</label>
          <input
          type="text"
            id="specificNumber"
            name="specificNumber"
            className="ml-9 shadow appearance-none border rounded w-17 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          </div>


          
          <div className="mb-4">
                 <label className="mt-3 ml-10 mr-8 block text-base font-medium text-[#07074D]">Mode</label>
          <select
            id="mode"
            name="mode"
            className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
        <div className="mt-4"></div>
            <option value="online" className="text-green-500">Online</option>
            <option value="offline" className="text-red-500">Offline</option>
          </select>
          </div>
      

            <div class="flex-wrap pt-8">
                    <div class="mb-4">
                      <label
                        for="date"
                        class="mb-3 block text-base font-medium text-[#07074D]"
                      >
                       Advertisement Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        class=" rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                </div>

                <div class="flex-wrap pt-4">
                    <div class="mb-5">
                      <label
                        for="date"
                        class="mb-3 block text-base font-medium text-[#07074D]"
                      >
                       Deadline Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        class=" rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                </div>

                <div className="">
        <button className="btn btn-primary rounded-md mr-10 mt-10">Save</button>
        <button className="btn btn-primary rounded-md ml-10 mt-10">Clear Description</button>
        </div>
                </Card>




    )
}